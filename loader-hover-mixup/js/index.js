var d = 'horizontal',
  c = 0,
  s = 100,
  m = 200;
setInterval(function() {
  function dim() {
    c += Math.random() * 5;
    if (s - c < Math.random() * 5) s += Math.random() * 15;
    if (s > m) s = m;
    if (c > s) c = s;

    var barSize = (c - 4) + "px",
      bgSize = s + "px",
      bgMargin = (s * -0.5) + "px";
    if (d == "horizontal") {
      bar.style.width = barSize;
      bg.style.width = bgSize;
      bg.style.marginLeft = bgMargin;
    } else if (d == "vertical") {
      bar.style.height = barSize;
      bg.style.height = bgSize;
      bg.style.marginTop = bgMargin;
    }
    return c == s && c == m;
  }

  if (d == "horizontal" && dim()) {
    c = 0;
    s = 100;
    d = "vertical";
  } else if (d == "vertical" && dim()) {
    c = 6;
    s = 100;
    d = "text";
  } else if (d == "text") {
    dim();
    bar.innerHTML = (Math.round(c / m * 99) + Math.round(Math.random() * 9) / 10) + "%";
  }

}, 200);

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
  context.fillStyle = "rgb(0, 0, 0)";
  context.fillRect(0, 0, WIDTH, HEIGHT);
  branches = new Array();
  window.addEventListener('mousemove', onWindowMouseMove, false);
}

function onWindowMouseMove(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function loop() {
  if (branches.length < 500) {
    branches.push(new Branch(mouseX, mouseY));
  }
  context.beginPath();
  context.strokeStyle = "#000";
  for (var i = 0; i < branches.length; i++) {
    var branch = branches[i];
    branch.life++;
    if (branch.life > 100) {
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
  context.fillStyle = "rgba(128, 0, 230, .1)";
  context.fillRect(0, 0, WIDTH, HEIGHT);
}
var Branch = function(x, y) {
  this.life = 0;
  this.x = x;
  this.y = y;
  this.rw = Math.random() * 180;
}
container.init()