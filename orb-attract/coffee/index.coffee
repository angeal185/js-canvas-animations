canvas = document.querySelector('canvas')

initShaders = (gl, vertexShaderId, fragmentShaderId) ->
  vertexEl = document.querySelector(vertexShaderId)
  vertexShader = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource vertexShader, vertexEl.text
  gl.compileShader vertexShader
  fragmentEl = document.querySelector(fragmentShaderId)
  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource fragmentShader, fragmentEl.text
  gl.compileShader fragmentShader
  program = gl.createProgram()
  gl.attachShader program, vertexShader
  gl.attachShader program, fragmentShader
  gl.linkProgram program
  gl.useProgram program
  program

initGraphics = ->
  gl = canvas.getContext('webgl')
  width = canvas.width
  height = canvas.height
  gl.viewport 0, 0, width, height
  canvas.addEventListener 'mousemove', ((e) ->
    mouseX = e.pageX / canvas.width
    mouseY = e.pageY / canvas.height
    return
  ), false
  program = initShaders(gl, '#sv', '#sf')
  buffer = gl.createBuffer()
  gl.bindBuffer gl.ARRAY_BUFFER, buffer
  gl.bufferData gl.ARRAY_BUFFER, new Float32Array([
    -1
    1
    -1
    -1
    1
    -1
    1
    1
  ]), gl.STATIC_DRAW
  vPosition = gl.getAttribLocation(program, 'vPosition')
  gl.vertexAttribPointer vPosition, 2, gl.FLOAT, false, 0, 0
  gl.enableVertexAttribArray vPosition
  ut = gl.getUniformLocation(program, 'time')
  um = gl.getUniformLocation(program, 'mouse')
  resolution = new Float32Array([
    canvas.width
    canvas.height
  ])
  gl.uniform2fv gl.getUniformLocation(program, 'resolution'), resolution
  return

render = ->
  gl.uniform1f ut, (Date.now() - st) / 1000
  gl.uniform2fv um, new Float32Array([
    mouseX
    mouseY
  ])
  gl.drawArrays gl.TRIANGLE_FAN, 0, 4
  requestAnimationFrame render
  return

canvas.width = window.innerWidth
canvas.height = window.innerHeight
ut = undefined
st = Date.now()
um = undefined
mouseX = 0
mouseY = 0
initGraphics()
render()