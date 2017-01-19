window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 40 / 5000);
    };
})();
var canvas = document.getElementsByTagName("canvas")[0];
var ct = canvas.getContext("2d");
var wid = window.innerWidth,
  hei = window.outerHeight;
canvas.width = wid;
canvas.height = hei;
var bparticles = 135;
var ptc = [];
function init() {
  reset_scene();
  for (var i = 0; i < bparticles; i++) {
    var np = new bparticle();
    ptc.push(np);
  }
}
function reset_scene() {
  ct.fillStyle=("#404040");
  ct.fillRect(0, 0, wid, hei);
}
function drawscene() {
  reset_scene();
  for (var i = 0; i < ptc.length; i++) {
    var pt = ptc[i];
    pt.x += pt.sx;
    if (pt.x > wid || pt.x < 0) {
      pt.sx = -pt.sx;
    }
    pt.y += pt.sy;
    if (pt.y > hei || pt.y < 0) {
      pt.sy = -pt.sy;
    }
    pt.draw();
  }
}
function bparticle() {
  this.x = Math.random() * wid;
  this.y = Math.random() * hei;
  this.sx = Math.random() * 2;
  this.sy = Math.random() * 2;
  var min = 10;
  var max = 40;
  this.r = Math.random() * (max - min);
  this.draw = function() {
    ct.fillStyle = "#163765";
    ct.beginPath();
    ct.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ct.fill();
  }
}
function animloop() {
  drawscene();
  requestAnimFrame(animloop);
}
var bt = document.querySelectorAll('.button')[0];
var turbVal = { val: 0.000001 };
var turb = document.querySelectorAll('#filter feTurbulence')[0];
var btTl = new TimelineLite({ paused: true, onUpdate: function() {
  turb.setAttribute('baseFrequency', '0 ' + turbVal.val);
} });
btTl.to(turbVal, 0.2, { val: 0.3 });
btTl.to(turbVal, 0.2, { val: 0.000001 });
bt.addEventListener('click', function() {
  btTl.restart();
  });
init();
animloop();