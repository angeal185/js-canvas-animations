options = 
  startingHue: 110
  clickLimiter: 6
  timerInterval: 18
  showTargets: false
  rocketSpeed: 2.3
  rocketAcceleration: 1.1
  particleFriction: 0.95
  particleGravity: 1
  particleMinCount: 40
  particleMaxCount: 60
  particleMinRadius: 1
  particleMaxRadius: 6
fireworks = []
particles = []
mouse = 
  down: false
  x: 0
  y: 0
currentHue = options.startingHue
clickLimiterTick = 0
timerTick = 0
cntRocketsLaunched = 0

random = (min, max) ->
  Math.random() * (max - min) + min

calculateDistance = (p1x, p1y, p2x, p2y) ->
  xDistance = p1x - p2x
  yDistance = p1y - p2y
  Math.sqrt xDistance ** 2 + yDistance ** 2

Firework = (sx, sy, tx, ty) ->
  @x = @sx = sx
  @y = @sy = sy
  @tx = tx
  @ty = ty
  @distanceToTarget = calculateDistance(sx, sy, tx, ty)
  @distanceTraveled = 0
  @coordinates = []
  @coordinateCount = 4
  while @coordinateCount--
    @coordinates.push [
      @x
      @y
    ]
  @angle = Math.atan2(ty - sy, tx - sx)
  @speed = options.rocketSpeed
  @acceleration = options.rocketAcceleration
  @brightness = random(60, 90)
  @hue = currentHue
  @targetRadius = 1
  @targetDirection = false
  cntRocketsLaunched++
  return

Particle = (x, y) ->
  @x = x
  @y = y
  @coordinates = []
  @coordinateCount = 5
  while @coordinateCount--
    @coordinates.push [
      @x
      @y
    ]
  @angle = random(0, Math.PI * 2)
  @speed = random(1, 10)
  @friction = options.particleFriction
  @gravity = options.particleGravity
  @hue = random(currentHue - 20, currentHue + 20)
  @brightness = random(60, 90)
  @alpha = 1
  @decay = random(0.01, 0.04)
  return

createParticles = (x, y) ->
  particleCount = Math.round(random(options.particleMinCount, options.particleMaxCount))
  while particleCount--
    particles.push new Particle(x, y)
  return

gameLoop = ->
  `var i`
  requestAnimFrame gameLoop
  currentHue += 0.5
  canvasCtx.globalCompositeOperation = 'destination-out'
  canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.5)'
  canvasCtx.fillRect 0, 0, canvasWidth, canvasHeight
  canvasCtx.globalCompositeOperation = 'lighter'
  i = fireworks.length
  while i--
    fireworks[i].draw()
    fireworks[i].update i
  i = particles.length
  while i--
    particles[i].draw()
    particles[i].update i
  if timerTick >= options.timerInterval
    if !mouse.down
      fireworks.push new Firework(canvasWidth / 2, canvasHeight, random(0, canvasWidth), random(0, canvasHeight / 2))
      timerTick = 0
  else
    timerTick++
  if clickLimiterTick >= options.clickLimiter
    if mouse.down
      fireworks.push new Firework(canvasWidth / 2, canvasHeight, mouse.x, mouse.y)
      clickLimiterTick = 0
  else
    clickLimiterTick++
  return

window.requestAnimFrame = do ->
  window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or (cb) ->
    window.setTimeout callback, 1000 / 60
    return
canvas = document.getElementById('kaboom')
canvasCtx = canvas.getContext('2d')
canvasWidth = undefined
if window.innerWidth > 1024
  canvasWidth = window.innerWidth / 1
else
  canvasWidth = window.innerWidth
canvasHeight = window.innerHeight
canvas.width = canvasWidth
canvas.height = canvasHeight

Firework::update = (index) ->
  @coordinates.pop()
  @coordinates.unshift [
    @x
    @y
  ]
  if !@targetDirection
    if @targetRadius < 8
      @targetRadius += 0.15
    else
      @targetDirection = true
  else
    if @targetRadius > 1
      @targetRadius -= 0.15
    else
      @targetDirection = false
  @speed *= @acceleration
  vx = Math.cos(@angle) * @speed
  vy = Math.sin(@angle) * @speed
  @distanceTraveled = calculateDistance(@sx, @sy, @x + vx, @y + vy)
  if @distanceTraveled >= @distanceToTarget
    createParticles @tx, @ty
    fireworks.splice index, 1
  else
    @x += vx
    @y += vy
  return

Firework::draw = ->
  lastCoordinate = @coordinates[@coordinates.length - 1]
  canvasCtx.beginPath()
  canvasCtx.moveTo lastCoordinate[0], lastCoordinate[1]
  canvasCtx.lineTo @x, @y
  canvasCtx.strokeStyle = 'hsl(' + @hue + ',100%,' + @brightness + '%)'
  canvasCtx.stroke()
  if options.showTargets
    canvasCtx.beginPath()
    canvasCtx.arc @tx, @ty, @targetRadius, 0, Math.PI * 1
    canvasCtx.stroke()
  return

Particle::update = (index) ->
  @coordinates.pop()
  @coordinates.unshift [
    @x
    @y
  ]
  @speed *= @friction
  @x += Math.cos(@angle) * @speed
  @y += Math.sin(@angle) * @speed + @gravity
  @alpha -= @decay
  if @alpha <= @decay
    particles.splice index, 1
  return

Particle::draw = ->
  lastCoordinate = @coordinates[@coordinates.length - 1]
  radius = Math.round(random(options.particleMinRadius, options.particleMaxRadius))
  gradient = canvasCtx.createRadialGradient(@x, @y, 0, @x, @y, radius)
  gradient.addColorStop 0.0, 'white'
  gradient.addColorStop 0.1, 'white'
  gradient.addColorStop 0.1, 'hsla(' + @hue + ',100%,' + @brightness + '%,' + @alpha + ')'
  gradient.addColorStop 1.0, 'black'
  canvasCtx.beginPath()
  canvasCtx.fillStyle = gradient
  canvasCtx.arc @x, @y, radius, Math.PI * 2, false
  canvasCtx.fill()
  return

window.addEventListener 'resize', (e) ->
  if window.innerWidth > 1024
    canvas.width = canvasWidth = window.innerWidth / 2
  else
    canvas.width = canvasWidth = window.innerWidth
  canvas.height = canvasHeight = window.innerHeight
  return
canvas.addEventListener 'mousemove', (e) ->
  e.preventDefault()
  mouse.x = e.pageX - (canvas.offsetLeft)
  mouse.y = e.pageY - (canvas.offsetTop)
  return
canvas.addEventListener 'mousedown', (e) ->
  e.preventDefault()
  mouse.down = true
  return
canvas.addEventListener 'mouseup', (e) ->
  e.preventDefault()
  mouse.down = false
  return
window.onload = gameLoop()