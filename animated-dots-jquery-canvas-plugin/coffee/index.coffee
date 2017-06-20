cnv1 = $('<canvas></canvas>')

Initialize = ->
  GenerateDots()
  Update()
  return

Dot = ->
  @active = true
  @diameter = Math.random() * 10
  @x = Math.round(Math.random() * canvas.width)
  @y = Math.round(Math.random() * canvas.height)
  @velocity =
    x: (if Math.random() < 0.5 then -1 else 1) * Math.random() * 0.7
    y: (if Math.random() < 0.5 then -1 else 1) * Math.random() * 0.7
  @alpha = 0.1
  @hex = colors[Math.round(Math.random() * 3)]
  @color = HexToRGBA(@hex, @alpha)
  return

Update = ->
  GenerateDots()
  Dots.forEach (Dot) ->
    Dot.Update()
    return
  Dots = Dots.filter((Dot) ->
    Dot.active
  )
  Render()
  requestAnimationFrame Update
  return

Render = ->
  context.clearRect 0, 0, canvas.width, canvas.height
  Dots.forEach (Dot) ->
    Dot.Draw()
    return
  return

GenerateDots = ->
  if Dots.length < maximum
    i = Dots.length
    while i < maximum
      Dots.push new Dot
      i++
  false

HexToRGBA = (hex, alpha) ->
  red = parseInt(TrimHex(hex).substring(0, 2), 16)
  green = parseInt(TrimHex(hex).substring(2, 4), 16)
  blue = parseInt(TrimHex(hex).substring(4, 6), 16)
  'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')'

TrimHex = (hex) ->
  if hex.charAt(0) == '#' then hex.substring(1, 7) else h

$('body').css 'overflow', 'hidden'
$('body').prepend(cnv1).attr('id', 'canvas').css 'background', '#181818'
canvas = $('canvas')[0]
context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
Dots = []
colors = [
  '#2980B9'
  '#F14155'
  '#27AE60'
  '#FBA026'
]
maximum = 50
Dot.prototype =
  Update: ->
    if @alpha < 0.8
      @alpha += 0.01
      @color = HexToRGBA(@hex, @alpha)
    @x += @velocity.x
    @y += @velocity.y
    if @x > canvas.width + 5 or @x < 0 - 5 or @y > canvas.height + 5 or @y < 0 - 5
      @active = false
    return
  Draw: ->
    context.fillStyle = @color
    context.beginPath()
    context.arc @x, @y, @diameter, 0, Math.PI * 2, false
    context.fill()
    return
$(window).resize ->
  Dots = []
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  return
Initialize()