$(document).ready ->
  dv = $('<div>')
  cnv = $('<canvas>')
  bdy = $('body')
  bdy.eq(0).prepend(dv)
  dv.eq(0).append(cnv)
  bdy.css(
    'background': 'black'
    'overflow': 'hidden')
  dv.eq(0).attr('id', 'div')
  cnv.eq(0).attr('id', 'cnv')
  bdy.hover ->
    bdy.animate { opacity: '0.3' }, 'slow'
    bdy.animate { opacity: '0.1' }, 'slow'
    bdy.animate { opacity: '0.7' }, 'slow'
    bdy.animate { opacity: '0.2' }, 'slow'
    return
  return
$(document).ready(->
  width = undefined
  height = undefined
  largeHeader = undefined
  canvas = undefined
  ctx = undefined
  triangles = undefined
  target = undefined
  animateHeader = true
  colors = [
    '72,35,68'
    '43,81,102'
    '66,152,103'
    '250,178,67'
    '224,33,48'
  ]

  initHeader = ->
    width = window.innerWidth
    height = window.innerHeight
    target =
      x: 0
      y: height
    largeHeader = document.getElementById('div')
    largeHeader.style.height = height + 'px'
    canvas = document.getElementById('cnv')
    canvas.width = width
    canvas.height = height
    ctx = canvas.getContext('2d')
    triangles = []
    x = 0
    while x < 480
      addTriangle x * 10
      x++
    return

  addTriangle = (delay) ->
    setTimeout (->
      t = new Triangle
      triangles.push t
      tweenTriangle t
      return
    ), delay
    return

  initAnimation = ->
    animate()
    return

  tweenTriangle = (tri) ->
    t = Math.random() * 2 * Math.PI
    x = (400 + Math.random() * 100) * Math.cos(t) + width * 0.5 - 40
    y = (200 + Math.random() * 100) * Math.sin(t) + height * 0.5 - 20
    time = 4 + 9 * Math.random()
    TweenLite.to tri.pos, time,
      x: x
      y: y
      ease: Circ.easeOut
      onComplete: ->
        tri.init()
        tweenTriangle tri
        return
    return

  addListeners = ->
    window.addEventListener 'scroll', scrollCheck
    window.addEventListener 'resize', resize
    return

  scrollCheck = ->
    if document.body.scrollTop > height
      animateHeader = false
    else
      animateHeader = true
    return

  resize = ->
    width = window.innerWidth
    height = window.innerHeight
    largeHeader.style.height = height + 'px'
    canvas.width = width
    canvas.height = height
    return

  animate = ->
    if animateHeader
      ctx.clearRect 0, 0, width, height
      for i of triangles
        triangles[i].draw()
    requestAnimationFrame animate
    return

  Triangle = ->
    _this = this

    init = ->
      _this.pos.x = width * 0.5
      _this.pos.y = height * 0.5 - 20
      _this.coords[0].x = -10 + Math.random() * 45
      _this.coords[0].y = -5 + Math.random() * 90
      _this.coords[1].x = -10 + Math.random() * 140
      _this.coords[1].y = -5 + Math.random() * 180
      _this.coords[2].x = -10 + Math.random() * 50
      _this.coords[2].y = -5 + Math.random() * 130
      _this.scale = 0.5 + Math.random() * 0.3
      _this.color = colors[Math.floor(Math.random() * colors.length)]
      setTimeout (->
        _this.alpha = 1
        return
      ), 10
      return

    do ->
      _this.coords = [
        {}
        {}
        {}
      ]
      _this.pos = {}
      init()
      return

    @draw = ->
      if _this.alpha >= 0.005
        _this.alpha -= 0.005
      else
        _this.alpha = 0
      ctx.beginPath()
      ctx.moveTo _this.coords[0].x + _this.pos.x, _this.coords[0].y + _this.pos.y
      ctx.lineTo _this.coords[1].x + _this.pos.x, _this.coords[1].y + _this.pos.y
      ctx.lineTo _this.coords[2].x + _this.pos.x, _this.coords[2].y + _this.pos.y
      ctx.closePath()
      ctx.fillStyle = 'rgba(' + _this.color + ',' + _this.alpha + ')'
      ctx.fill()
      return

    @init = init
    return

  initHeader()
  addListeners()
  initAnimation()
  return
)()