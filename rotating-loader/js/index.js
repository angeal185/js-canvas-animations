var c = document.getElementById("canv");
var $ = c.getContext("2d");
var w = c.width = window.innerWidth / 1.2;
var h = c.height = window.innerHeight / 1.5;

function txt() {
  var t = "Loading".split("").join(String.fromCharCode(0x2004));
  $.font = "3.5em Armata";
  $.fillStyle = 'hsla(7, 95%, 75%, .6)';
  $.fillText(t, (c.width - $.measureText(t).width) * 0.5, c.height * 0.5);
}

function Part(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

var mid = {
  x: w / 2,
  y: h / 2
};

var cam = {
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  zoom: 1.99,
  focus: 350
};

var pts = [];
for (var i = 0; i < 2000; ++i) {
  pts.push(
    new Part(
      Math.random() * w - w / 2,
      Math.random() * h - h / 2,
      Math.random() * w - 200
    )
  );
}

var spA = 0;
var dtr = 1 / 180 * Math.PI;

function draw(e) {
  $.clearRect(0, 0, c.width, c.height);
  $.globalCompositeOperation = "source-over";
  var g = $.createLinearGradient(c.width, c.height, 1, c.width, c.height);
  g.addColorStop(0, 'hsla(0,0%,0%,1)');
  g.addColorStop(0.6, 'hsla(207, 50%, 20%, 0.5)');
  g.addColorStop(1, 'hsla(0,0%,0%,0)');
  $.fillStyle = g;
  $.fillRect(0, 0, c.width, c.height);
  spA++;
  var sp = Math.sin(spA * dtr);
  cam.rotY += 0.5 * sp;
  cam.rotZ -= 0.5 * sp;

  var rotX = cam.rotX * dtr;
  var rotY = cam.rotY * dtr;
  var rotZ = cam.rotZ * dtr;

  for (var i = 0; i < pts.length; ++i) {
    var p = pts[i];
    var ap = rot(p.x, p.y, rotZ);
    var zp = rot(ap.b, p.z, rotX);
    var bp = rot(zp.b, ap.a, rotY);
    var persp = cam.focus / (cam.focus + bp.a) * cam.zoom;
    var px = bp.b * persp + mid.x;
    var py = zp.a * persp + mid.y;
    var wght = persp * 4;
    $.globalCompositeOperation = "lighter";
    if (px < -50 || px > c.width || py < -50 || py > c.height) continue;
    $.fillStyle = 'hsla(02, 95%, 65%, .5)';
    $.beginPath();
    $.arc(px, py, persp, wght, 2 * Math.PI, true);
    $.fill();
    $.closePath();
  }
  window.requestAnimationFrame(draw);
  txt();
}

function rot(a, b, rot) {
  return {
    a: (Math.cos(rot) * a - Math.sin(rot) * b),
    b: (Math.sin(rot) * a + Math.cos(rot) * b)
  };
}
draw();

window.addEventListener('resize', function() {
  c.width = w = window.innerWidth / 1.2;
  c.height = h = window.innerHeight / 1.5;
}, false);