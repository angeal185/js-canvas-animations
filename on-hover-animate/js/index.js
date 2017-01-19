var div1 = $("<div></div>");
$("body").eq(0).append(div1);
$(div1).attr({
  "id": "container",
  "width": "auto",
  "height": "auto"
});

var container, canvas, context;
var WIDTH, HEIGHT;
var branches, mouseX, mouseY;
init();
setInterval(loop, 1000 / 60);
function init() {
  container = document.getElementById('container');
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  var canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  container.appendChild(canvas);
  context = canvas.getContext("2d");
  context.fillStyle = "rgb(1, 1, 1)";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  branches = new Array();
  window.addEventListener('mousemove', onWindowMouseMove, false);
}

function onWindowMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function loop() {
  if (branches.length < 1000) {
    branches.push(new Branch(mouseX, mouseY));
  }
  
  context.beginPath();
  context.strokeStyle = "#CC0000";
  for (var i = 0; i < branches.length; i++) {
    var branch = branches[i];
    branch.life++;
    if (branch.life > 500) {
      branches.shift();
      continue;
    }

    context.moveTo(branch.x, branch.y);
    branch.rw += Math.random() - .5;
    branch.x += Math.cos(branch.rw);
    branch.y += Math.sin(branch.rw);
    context.lineTo(branch.x, branch.y);
  }

  context.stroke();
  context.closePath();
  context.fillStyle = "rgba(52, 2, 252, .1)";
  context.fillRect(0, 0, WIDTH, HEIGHT);
}

var Branch = function(x, y) {

  this.life = 0;
  this.x = x;
  this.y = y;
  this.rw = Math.random() * 360;

}
var colors = new Array(
  [62, 35, 255], [60, 255, 60], [255, 35, 98], [45, 175, 230], [255, 0, 255], [255, 128, 0]);

var step = 0;
var colorIndices = [0, 1, 2, 3];
var gradientSpeed = 0.002;
function updateGradient() {
  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];
  var c1_0 = colors[colorIndices[2]];
  var c1_1 = colors[colorIndices[3]];
  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "#" + ((r1 << 16) | (g1 << 8) | b1).toString(16);

  var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
  var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
  var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
  var color2 = "#" + ((r2 << 16) | (g2 << 8) | b2).toString(16);
  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;

  }
}

setInterval(updateGradient, 10);