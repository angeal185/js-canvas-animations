$(document).ready(function() {

  var dv = $('<div>');
  var cnv = $('<canvas>');
  var bdy = $('body');
  bdy.eq(0).prepend(dv),
  dv.eq(0).append(cnv);

  bdy.css({
      'background': 'black',
      'overflow': 'hidden'
  }),
  dv.eq(0).attr('id', 'div'),
  cnv.eq(0).attr('id', 'cnv');

  bdy.hover(function() {
    bdy.animate({
      opacity: '0.3'
    }, "slow");
    bdy.animate({
      opacity: '0.1'
    }, "slow");
    bdy.animate({
      opacity: '0.7'
    }, "slow");
    bdy.animate({
      opacity: '0.2'
    }, "slow");
  });
});

$(document).ready(function() {
  var width, height, largeHeader, canvas, ctx, triangles, target, animateHeader = true;
  var colors = ['72,35,68', '43,81,102', '66,152,103', '250,178,67', '224,33,48'];
  initHeader();
  addListeners();
  initAnimation();

  function initHeader() {
    width = window.innerWidth;
    height = window.innerHeight;
    target = {
      x: 0,
      y: height
    };

    largeHeader = document.getElementById('div');
    largeHeader.style.height = height + 'px';
    canvas = document.getElementById('cnv');
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');
    triangles = [];
    for (var x = 0; x < 480; x++) {
      addTriangle(x * 10);
    }
  }

  function addTriangle(delay) {
    setTimeout(function() {
      var t = new Triangle();
      triangles.push(t);
      tweenTriangle(t);
    }, delay);
  }

  function initAnimation() {
    animate();
  }

  function tweenTriangle(tri) {
    var t = Math.random() * (2 * Math.PI);
    var x = (400 + Math.random() * 100) * Math.cos(t) + width * 0.5 - 40;
    var y = (200 + Math.random() * 100) * Math.sin(t) + height * 0.5 - 20;
    var time = 4 + 9 * Math.random();

    TweenLite.to(tri.pos, time, {
      x: x,
      y: y,
      ease: Circ.easeOut,
      onComplete: function() {
        tri.init();
        tweenTriangle(tri);
      }
    });
  }

  function addListeners() {
    window.addEventListener('scroll', scrollCheck);
    window.addEventListener('resize', resize);
  }

  function scrollCheck() {
    if (document.body.scrollTop > height) animateHeader = false;
    else animateHeader = true;
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    largeHeader.style.height = height + 'px';
    canvas.width = width;
    canvas.height = height;
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (var i in triangles) {
        triangles[i].draw();
      }
    }
    requestAnimationFrame(animate);
  }

  function Triangle() {
    var _this = this;
    (function() {
      _this.coords = [{}, {}, {}];
      _this.pos = {};
      init();
    })();

    function init() {
      _this.pos.x = width * 0.5;
      _this.pos.y = height * 0.5 - 20;
      _this.coords[0].x = -10 + Math.random() * 45;
      _this.coords[0].y = -5 + Math.random() * 90;
      _this.coords[1].x = -10 + Math.random() * 140;
      _this.coords[1].y = -5 + Math.random() * 180;
      _this.coords[2].x = -10 + Math.random() * 50;
      _this.coords[2].y = -5 + Math.random() * 130;
      _this.scale = 0.5 + Math.random() * 0.3;
      _this.color = colors[Math.floor(Math.random() * colors.length)];
      setTimeout(function() {
        _this.alpha = 1;
      }, 10);
    }
    this.draw = function() {
      if (_this.alpha >= 0.005) _this.alpha -= 0.005;
      else _this.alpha = 0;
      ctx.beginPath();
      ctx.moveTo(_this.coords[0].x + _this.pos.x, _this.coords[0].y + _this.pos.y);
      ctx.lineTo(_this.coords[1].x + _this.pos.x, _this.coords[1].y + _this.pos.y);
      ctx.lineTo(_this.coords[2].x + _this.pos.x, _this.coords[2].y + _this.pos.y);
      ctx.closePath();
      ctx.fillStyle = 'rgba(' + _this.color + ',' + _this.alpha + ')';
      ctx.fill();
    };
    this.init = init;
  }
})();