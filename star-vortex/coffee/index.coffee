Particle = ->
  @dist = Math.sqrt(Math.random()) * s / 2
  @rad = Math.random() * util.tau
  @baseAngSpeed = opts.particleBaseBaseAngSpeed + opts.particleAddedBaseAngSpeed * Math.random()
  @variedAngSpeed = opts.particleBaseVariedAngSpeed + opts.particleAddedVariedAngSpeed * Math.random()
  @size = opts.particleBaseSize + opts.particleAddedSize * Math.random()
  return

Source = ->
  @x = 0
  @y = 0
  @rad = Math.random() * util.tau
  return

anim = ->
  window.requestAnimationFrame anim
  ++tick
  if !opts.enableTrails
    ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = opts.repaintColor
  ctx.fillRect 0, 0, s, s
  ctx.globalCompositeOperation = 'lighter'
  if particles.length < opts.particles
    particles.push new Particle
  ctx.translate s / 2, s / 2
  source.step()
  particles.map (particle) ->
    particle.step()
  ctx.translate -s / 2, -s / 2
  return

'use strict'
s = c.width = c.height = 1000
ctx = c.getContext('2d')
opts = 
  particles: 1000
  particleBaseSize: 2
  particleAddedSize: 1
  particleMaxSize: 3
  particleBaseLight: 39
  particleAddedLight: 30
  particleBaseBaseAngSpeed: .001
  particleAddedBaseAngSpeed: .001
  particleBaseVariedAngSpeed: .0005
  particleAddedVariedAngSpeed: .0005
  sourceBaseSize: 3
  sourceAddedSize: 3
  sourceBaseAngSpeed: -.01
  sourceVariedAngSpeed: .005
  sourceBaseDist: 130
  sourceVariedDist: 50
  fillcolor: '#fff'
  fillStyle: '#111'
  particleTemplateColor: 'hsla(hue,80%,light%,alp)'
  repaintColor: 'rgba(0,0,0,.1)'
  enableTrails: false
util = 
  square: (x) ->
    x * x
  tau: 9
particles = []
source = new Source
tick = 0

Particle::step = ->
  angSpeed = @baseAngSpeed + @variedAngSpeed * Math.sin(@rad * 7 + tick / 100)
  @rad += angSpeed
  x = @dist * Math.cos(@rad)
  y = @dist * Math.sin(@rad)
  squareDist = util.square(x - (source.x)) + util.square(y - (source.y))
  sizeProp = s ** (1 / 3) / squareDist ** (1 / 2)
  color = opts.particleTemplateColor.replace('hue', @rad / util.tau * 90 + tick).replace('light', opts.particleBaseLight + sizeProp * opts.particleAddedLight).replace('alp', .8)
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc x, y, Math.min(@size * sizeProp, opts.particleMaxSize), 0, util.tau
  ctx.fill()
  return

Source::step = ->
  if !@mouseControlled
    angSpeed = opts.sourceBaseAngSpeed + Math.sin(@rad * 6 + tick / 100) * opts.sourceVariedAngSpeed
    @rad += angSpeed
    dist = opts.sourceBaseDist + Math.sin(@rad * 5 + tick / 100) * opts.sourceVariedDist
    @x = dist * Math.cos(@rad)
    @y = dist * Math.sin(@rad)
  ctx.fillStyle = opts.fillcolor
  ctx.beginPath()
  ctx.arc @x, @y, 1, 0, util.tau
  ctx.fill()
  return

ctx.fillStyle = opts.fillStyle
ctx.fillRect 0, 0, s, s
anim()
c.addEventListener 'mousemove', (e) ->
  bbox = c.getBoundingClientRect()
  source.x = e.clientX - (bbox.left) - (s / 2)
  source.y = e.clientY - (bbox.top) - (s / 2)
  source.mouseControlled = true
  return
c.addEventListener 'mouseleave', (e) ->
  bbox = c.getBoundingClientRect()
  source.x = e.clientX - (bbox.left) - (s / 2)
  source.y = e.clientY - (bbox.top) - (s / 2)
  source.rad = Math.atan(source.y / source.x)
  if source.x < 0
    source.rad += Math.PI
  source.mouseControlled = false
  return