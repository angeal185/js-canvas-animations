var dv = $("<div></div>")
var cnv = $("<canvas></canvas>")
$("body").eq(0).prepend(dv);
$("body").css({"margin":"0","background-color":"#181818"});
$("div").eq(0).append(cnv);
$("div").eq(0).attr("id", "canvas-block").css({"margin": "0", "width": "100%", "height":"300px", "border-bottom":"1px solid black","background-color":"#673ab7"});
$("div").eq(0).clone().prependTo("body");
$("div").eq(0).clone().prependTo("body");
$("div").eq(0).clone().prependTo("body");
$("div").eq(0).clone().prependTo("body");
$("div").eq(0).clone().prependTo("body");

$("canvas").eq(0).attr("id", "myCanvas1");
$("canvas").eq(1).attr("id", "myCanvas2");
$("canvas").eq(2).attr("id", "myCanvas3");
$("canvas").eq(3).attr("id", "myCanvas4");
$("canvas").eq(4).attr("id", "myCanvas5");
$("canvas").eq(5).attr("id", "myCanvas6");


function setShapes(r) {
  r.setSpecificArray(2, function() {
    setTimeout(function() {
      r.setSpecificArray(1, function() {
        setTimeout(function() {
          r.setSpecificArray(3, function() {
            setTimeout(function() {
              r.destroytSpecificArrays(), setTimeout(function() {
                setShapes(r)
              }, 1e4)
            }, 5e3)
          })
        }, 5e3)
      })
    }, 5e3)
  })
}
$.fn.canvaDots = function(r) {
  this.options = {}, this.options.speed = 2, this.options.sizeMultiplier = .5, this.options.showDirectionVector = !1, this.options.showConnections = !0, this.options.sizeDependConnections = !1, this.options.magnetPowerDelimiter = 10, this.options.mouseReaction = !0, this.options.randomBounceSides = !0, this.options.fillCircles = !1, this.options.moveDirection = "random", this.options.dotsColor = [255, 255, 255, 1], this.options.linesColor = [255, 255, 255], this.shapeCreated = !1, this.callback;
  var a, t, e = this;
  a = document.getElementById(this.attr("id")), t = a.getContext("2d");
  var y, n, o, i = .4;
  this.attr("width", e.parent().innerWidth()).attr("height", e.parent().innerHeight()), y = this.innerWidth(), n = this.innerHeight();
  var s = [],
    h = 0,
    l = 0,
    x = Math.pow(y * n, i),
    c = function(r, a, t) {
      var e, y = !1,
        t = !!t;
      for (e in a)
        if (t && a[e] === r || !t && a[e] == r) {
          y = !0;
          break
        }
      return y
    },
    p = function() {
      return Math.random() * (2 * e.options.speed) - e.options.speed
    },
    g = function(r, a) {
      for (var t = a + 1; t < m.length; t++) {
        var y = Math.pow(Math.pow(m[t].x - r.x, 2) + Math.pow(m[t].y - r.y, 2), .5);
        o >= y && (e.options.showConnections && D(r.x, r.y, m[t].x, m[t].y, y), m[a].connections++, m[t].connections++)
      }
    },
    D = function(r, a, y, n, i) {
      t.beginPath(), t.moveTo(r, a), t.lineTo(y, n);
      var s = 1 - i / o;
      t.strokeStyle = "rgba(" + e.options.linesColor[0] + ", " + e.options.linesColor[1] + ", " + e.options.linesColor[2] + ", " + s + ")", t.stroke()
    },
    C = function() {
      L();
      for (var r = 0, a = 0, t = !1, i = 0; i < m.length; i++) {
        switch ((e.options.showConnections || e.options.sizeDependConnections) && g(m[i], i), d(m[i]), m[i].connections = 0, e.options.moveDirection) {
          case "up":
            m[i].y += m[i].s_y, m[i].s_x = 0;
            break;
          case "down":
            m[i].y += m[i].s_y, m[i].s_x = 0;
            break;
          case "left":
            m[i].x += m[i].s_x, m[i].s_y = 0;
            break;
          case "right":
            m[i].x += m[i].s_x, m[i].s_y = 0;
            break;
          default:
            m[i].x += m[i].s_x, m[i].y += m[i].s_y
        }
        if (m[i].x >= y) {
          switch (e.options.moveDirection) {
            case "right":
              m[i].x = 0;
              break;
            default:
              m[i].x = y, m[i].s_x *= -1
          }(e.options.randomBounceSides || "random" != e.options.moveDirection) && (m[i].s_x = p(), m[i].s_y = p()), "right" == e.options.moveDirection && (m[i].y = Math.ceil(Math.random() * n))
        }
        if (m[i].x <= 0) {
          switch (e.options.moveDirection) {
            case "left":
              m[i].x = y;
              break;
            default:
              m[i].x = 0, m[i].s_x *= -1
          }(e.options.randomBounceSides || "random" != e.options.moveDirection) && (m[i].s_x = p(), m[i].s_y = p()), "left" == e.options.moveDirection && (m[i].y = Math.ceil(Math.random() * n))
        }
        if (m[i].y >= n) {
          switch (e.options.moveDirection) {
            case "down":
              m[i].y = 0;
              break;
            default:
              m[i].y = n, m[i].s_y *= -1
          }(e.options.randomBounceSides || "random" != e.options.moveDirection) && (m[i].s_y = p(), m[i].s_x = p()), "down" == e.options.moveDirection && (m[i].x = Math.ceil(Math.random() * y))
        }
        if (m[i].y <= 0) {
          switch (e.options.moveDirection) {
            case "up":
              m[i].y = n;
              break;
            default:
              m[i].y = 0, m[i].s_y *= -1
          }(e.options.randomBounceSides || "random" != e.options.moveDirection) && (m[i].s_y = p(), m[i].s_x = p()), "up" == e.options.moveDirection && (m[i].x = Math.ceil(Math.random() * y))
        }
        switch (e.options.randomBounceSides || "random" == e.options.moveDirection || ((m[i].s_y > e.options.speed || 0 == m[i].s_y) && (m[i].s_y = p()), (m[i].s_x > e.options.speed || 0 == m[i].s_x) && (m[i].s_x = p())), e.options.moveDirection) {
          case "up":
            m[i].s_y = -1 * Math.pow(Math.pow(m[i].s_y, 2), .5);
            break;
          case "down":
            m[i].s_y = Math.pow(Math.pow(m[i].s_y, 2), .5);
            break;
          case "left":
            m[i].s_x = -1 * Math.pow(Math.pow(m[i].s_x, 2), .5);
            break;
          case "right":
            m[i].s_x = Math.pow(Math.pow(m[i].s_x, 2), .5)
        }
        if ("random" == e.options.moveDirection) {
          var s = f(m[i], i);
          if (m[i].r_x > -1 && m[i].r_y > -1) {
            if (!s) {
              t = !0;
              var x = m[i].r_x + h - m[i].x,
                c = m[i].r_y + l - m[i].y,
                D = Math.sqrt(Math.pow(x, 2) + Math.pow(c, 2));
              m[i].s_x = x / o, m[i].s_y = c / o, m[i].s_x > e.options.speed && (m[i].s_x = e.options.speed), m[i].s_x < -1 * e.options.speed && (m[i].s_x = -1 * e.options.speed), m[i].s_y > e.options.speed && (m[i].s_y = e.options.speed), m[i].s_y < -1 * e.options.speed && (m[i].s_y = -1 * e.options.speed), 10 > D && r++
            }
            a++
          }
        }
      }
      t && r == a && (this.shapeCreated = !0, "function" == typeof e.callback && (e.callback(r), e.callback = !1))
    },
    f = function(r, a) {
      var t = !1;
      for (var y in w) {
        var n = Math.pow(Math.pow(w[y].x - r.x, 2) + Math.pow(w[y].y - r.y, 2), .5);
        o >= n && (t = !0, r.x < w[y].x ? r.y < w[y].y ? m[a].s_x -= (1 - (w[y].x - r.x) / o) * (1 - (w[y].y - r.y) / o) * e.options.speed / e.options.magnetPowerDelimiter : m[a].s_x -= (1 - (w[y].x - r.x) / o) * (1 - (r.y - w[y].y) / o) * e.options.speed / e.options.magnetPowerDelimiter : r.y < w[y].y ? m[a].s_x += (1 - (r.x - w[y].x) / o) * (1 - (w[y].y - r.y) / o) * e.options.speed / e.options.magnetPowerDelimiter : m[a].s_x += (1 - (r.x - w[y].x) / o) * (1 - (r.y - w[y].y) / o) * e.options.speed / e.options.magnetPowerDelimiter, r.y < w[y].y ? r.x < w[y].x ? m[a].s_y -= (1 - (w[y].y - r.y) / o) * (1 - (w[y].x - r.x) / o) * e.options.speed / e.options.magnetPowerDelimiter : m[a].s_y -= (1 - (w[y].y - r.y) / o) * (1 - (r.x - w[y].x) / o) * e.options.speed / e.options.magnetPowerDelimiter : r.x < w[y].x ? m[a].s_y += (1 - (r.y - w[y].y) / o) * (1 - (w[y].x - r.x) / o) * e.options.speed / e.options.magnetPowerDelimiter : m[a].s_y += (1 - (r.y - w[y].y) / o) * (1 - (r.x - w[y].x) / o) * e.options.speed / e.options.magnetPowerDelimiter)
      }
      return t
    },
    L = function() {
      t.clearRect(0, 0, a.width, a.height)
    },
    d = function(r) {
      t.beginPath(), t.strokeStyle = "rgba(" + e.options.dotsColor[0] + ", " + e.options.dotsColor[1] + ", " + e.options.dotsColor[2] + ", " + e.options.dotsColor[3] + ")";
      var a = 2;
      e.options.sizeDependConnections && (a = r.connections * e.options.sizeMultiplier + 1), t.arc(r.x, r.y, a, 0, 2 * Math.PI), e.options.fillCircles && (t.fillStyle = "rgba(" + e.options.dotsColor[0] + ", " + e.options.dotsColor[1] + ", " + e.options.dotsColor[2] + ", " + e.options.dotsColor[3] + ")", t.fill()), t.stroke(), e.options.showDirectionVector && (t.beginPath(), t.moveTo(r.x, r.y), t.lineTo(r.x + 10 * r.s_x, r.y + 10 * r.s_y), t.strokeStyle = "rgba(" + e.options.linesColor[0] + ", " + e.options.linesColor[1] + ", " + e.options.linesColor[2] + ", 0.25)", t.stroke())
    };
  for (var u in r) this.options[u] = r[u];
  this.options.speed < 0 && (this.options.speed = 0), this.options.sizeMultiplier < 0 && (this.options.sizeMultiplier = 0), "boolean" != typeof this.options.showDirectionVector && (this.options.showDirectionVector = !1), "boolean" != typeof this.options.showConnections && (this.options.showConnections = !0), "boolean" != typeof this.options.sizeDependConnections && (this.options.sizeDependConnections = !1), "boolean" != typeof this.options.mouseReaction && (this.options.mouseReaction = !0), "boolean" != typeof this.options.randomBounceSides && (this.options.randomBounceSides = !0), this.options.magnetPowerDelimiter < 0 && (this.options.magnetPowerDelimiter = 0), c(this.options.moveDirection, ["up", "down", "left", "right", "random"]) || (this.options.moveDirection = "random"), "boolean" != typeof this.options.fillCircles && (this.options.fillCircles = !0), (4 != this.options.dotsColor.length || this.options.dotsColor[0] < 0 || this.options.dotsColor[0] > 255 || this.options.dotsColor[1] < 0 || this.options.dotsColor[1] > 255 || this.options.dotsColor[2] < 0 || this.options.dotsColor[2] > 255 || this.options.dotsColor[3] < 0 || this.options.dotsColor[3] > 1) && (this.options.dotsColor = [255, 255, 255, 1]), (3 != this.options.linesColor.length || this.options.linesColor[0] < 0 || this.options.linesColor[0] > 255 || this.options.linesColor[1] < 0 || this.options.linesColor[1] > 255 || this.options.linesColor[2] < 0 || this.options.linesColor[2] > 255) && (this.options.linesColor = [255, 255, 255]), e = this;
  for (var m = [], v = 0; x > v; v++) m[v] = Array(), m[v].s_x = p(), m[v].s_y = p(), m[v].x = Math.ceil(Math.random() * y), m[v].y = Math.ceil(Math.random() * n), m[v].r_x = -1, m[v].r_y = -1, m[v].connections = 0;
  o = Math.pow(y * n, .7) / m.length;
  var w = [];
  return w[0] = {}, w[0].x = -1e3, w[0].y = -1e3, this.setSpeed = function(r) {
    return parseInt(r) >= 0 ? (this.options.speed = parseInt(r), !0) : !1
  }, this.setSizeDependConnections = function(r) {
    return "boolean" == typeof r ? (this.options.sizeDependConnections = r, e = this, !0) : !1
  }, this.setSizeMultiplier = function(r) {
    return parseFloat(r) >= 0 ? (this.options.sizeMultiplier = parseFloat(r), e = this, !0) : !1
  }, this.setShowDirectionVector = function(r) {
    return "boolean" == typeof r ? (this.options.showDirectionVector = r, e = this, !0) : !1
  }, this.setShowConnections = function(r) {
    return "boolean" == typeof r ? (this.options.showConnections = r, e = this, !0) : !1
  }, this.setMouseReaction = function(r) {
    return "boolean" == typeof r ? (this.options.mouseReaction = r, this.options.mouseReaction || (w[0].x = -1e3, w[0].y = -1e3), e = this, !0) : !1
  }, this.setRandomBounceSides = function(r) {
    return "boolean" == typeof r ? (this.options.randomBounceSides = r, e = this, !0) : !1
  }, this.setMoveDirection = function(r) {
    return c(r, ["up", "down", "left", "right", "random"]) ? (this.options.moveDirection = r, e = this, !0) : !1
  }, this.setFillCircles = function(r) {
    return "boolean" != typeof r ? (this.options.fillCircles = r, !0) : !1
  }, this.setDotsColor = function(r) {
    return 4 == r.length && r[0] >= 0 && r[0] <= 255 && r[1] >= 0 && r[1] <= 255 && r[2] >= 0 && r[2] <= 255 && r[3] >= 0 && r[3] <= 1 ? (this.options.dotsColor = r, e = this, !0) : !1
  }, this.setLinesColor = function(r) {
    return 3 == r.length && r[0] < 0 && r[0] > 255 && r[1] < 0 && r[1] > 255 && r[2] < 0 && r[2] > 255 ? (this.options.linesColor = r, e = this, !0) : !1
  }, this.loadMagnetDots = function(r) {
    w = [], w[0] = {}, w[0].x = -1e3, w[0].y = -1e3;
    for (var a = 1; a <= r.length; a++) w[a] = r[a - 1];
    return !0
  }, this.stopAnimation = function() {
    return clearTimeout(this.timeout), !0
  }, this.startAnimation = function() {
    return this.timeout = setInterval(function() {
      C()
    }, 20), !0
  }, this.loadSpecificArray = function(r, a) {
    s[r] = [];
    for (var t in a) s[r][t] = a[t];
    if (a.length > x) {
      for (var e = Math.ceil(x); e < a.length; e++) m[e] = Array(), m[e].s_x = p(), m[e].s_y = p(), m[e].x = Math.ceil(Math.random() * y), m[e].y = Math.ceil(Math.random() * n), m[e].r_x = -1, m[e].r_y = -1, m[e].connections = 0;
      x = a.length
    }
    return !0
  }, this.setSpecificArray = function(r, a) {
    this.destroytSpecificArrays();
    for (var t in s[r]) m[t].r_x = s[r][t].x, m[t].r_y = s[r][t].y;
    this.callback = a, e = this
  }, this.destroytSpecificArrays = function() {
    this.shapeCreated = !1;
    for (var r in m)(-1 != m[r].r_x || -1 != m[r].r_y) && (m[r].r_x = -1, m[r].r_y = -1, m[r].s_x = p(), m[r].s_y = p())
  }, this.setSpecificArrayOffsetX = function(r) {
    h = Math.ceil(r)
  }, this.setSpecificArrayOffsetY = function(r) {
    l = Math.ceil(r)
  }, this.getStatusShape = function() {
    return this.shapeCreated
  }, $(window).resize(function() {
    e.attr("width", e.parent().innerWidth()).attr("height", e.parent().innerHeight()), y = e.innerWidth(), n = e.innerHeight(), o = Math.pow(y * n, .7) / m.length, e.options.mouseReaction && "random" == e.options.moveDirection && (w[0].x = Math.ceil(y / 2), w[0].y = Math.ceil(n / 2))
  }), this.mousemove(function(r) {
    e.options.mouseReaction && "random" == e.options.moveDirection && (w[0].x = r.offsetX, w[0].y = r.offsetY)
  }), this.startAnimation(), this
};
var arrayC = [];
arrayC[arrayC.length] = {
  x: 0,
  y: 100
}, arrayC[arrayC.length] = {
  x: 1,
  y: 83
}, arrayC[arrayC.length] = {
  x: 5,
  y: 70
}, arrayC[arrayC.length] = {
  x: 6,
  y: 60
}, arrayC[arrayC.length] = {
  x: 13,
  y: 44
}, arrayC[arrayC.length] = {
  x: 25,
  y: 27
}, arrayC[arrayC.length] = {
  x: 35,
  y: 18
}, arrayC[arrayC.length] = {
  x: 59,
  y: 6
}, arrayC[arrayC.length] = {
  x: 100,
  y: 0
}, arrayC[arrayC.length] = {
  x: 135,
  y: 5
}, arrayC[arrayC.length] = {
  x: 160,
  y: 20
}, arrayC[arrayC.length] = {
  x: 170,
  y: 27
}, arrayC[arrayC.length] = {
  x: 180,
  y: 45
}, arrayC[arrayC.length] = {
  x: 185,
  y: 60
}, arrayC[arrayC.length] = {
  x: 160,
  y: 65
}, arrayC[arrayC.length] = {
  x: 135,
  y: 70
}, arrayC[arrayC.length] = {
  x: 128,
  y: 59
}, arrayC[arrayC.length] = {
  x: 117,
  y: 50
}, arrayC[arrayC.length] = {
  x: 99,
  y: 44
}, arrayC[arrayC.length] = {
  x: 80,
  y: 50
}, arrayC[arrayC.length] = {
  x: 70,
  y: 60
}, arrayC[arrayC.length] = {
  x: 65,
  y: 70
}, arrayC[arrayC.length] = {
  x: 61,
  y: 83
}, arrayC[arrayC.length] = {
  x: 60,
  y: 100
}, arrayC[arrayC.length] = {
  x: 61,
  y: 120
}, arrayC[arrayC.length] = {
  x: 66,
  y: 134
}, arrayC[arrayC.length] = {
  x: 79,
  y: 149
}, arrayC[arrayC.length] = {
  x: 99,
  y: 155
}, arrayC[arrayC.length] = {
  x: 117,
  y: 50
}, arrayC[arrayC.length] = {
  x: 125,
  y: 41
}, arrayC[arrayC.length] = {
  x: 130,
  y: 134
}, arrayC[arrayC.length] = {
  x: 136,
  y: 117
}, arrayC[arrayC.length] = {
  x: 149,
  y: 121
}, arrayC[arrayC.length] = {
  x: 158,
  y: 124
}, arrayC[arrayC.length] = {
  x: 172,
  y: 128
}, arrayC[arrayC.length] = {
  x: 187,
  y: 133
}, arrayC[arrayC.length] = {
  x: 181,
  y: 149
}, arrayC[arrayC.length] = {
  x: 171,
  y: 169
}, arrayC[arrayC.length] = {
  x: 159,
  y: 182
}, arrayC[arrayC.length] = {
  x: 134,
  y: 194
}, arrayC[arrayC.length] = {
  x: 117,
  y: 197
}, arrayC[arrayC.length] = {
  x: 100,
  y: 200
}, arrayC[arrayC.length] = {
  x: 75,
  y: 197
}, arrayC[arrayC.length] = {
  x: 59,
  y: 193
}, arrayC[arrayC.length] = {
  x: 44,
  y: 187
}, arrayC[arrayC.length] = {
  x: 36,
  y: 181
}, arrayC[arrayC.length] = {
  x: 24,
  y: 171
}, arrayC[arrayC.length] = {
  x: 15,
  y: 157
}, arrayC[arrayC.length] = {
  x: 11,
  y: 49
}, arrayC[arrayC.length] = {
  x: 5,
  y: 134
}, arrayC[arrayC.length] = {
  x: 3,
  y: 120
}, arrayC[arrayC.length] = {
  x: 1,
  y: 108
}, arrayC[arrayC.length] = {
  x: 45,
  y: 12
}, arrayC[arrayC.length] = {
  x: 78,
  y: 2
}, arrayC[arrayC.length] = {
  x: 118,
  y: 2
}, arrayC[arrayC.length] = {
  x: 148,
  y: 11
}, arrayC[arrayC.length] = {
  x: 124,
  y: 143
};
var arrayD = [];
arrayD[arrayD.length] = {
  x: 0,
  y: 0
}, arrayD[arrayD.length] = {
  x: 14,
  y: 0
}, arrayD[arrayD.length] = {
  x: 27,
  y: 0
}, arrayD[arrayD.length] = {
  x: 44,
  y: 0
}, arrayD[arrayD.length] = {
  x: 59,
  y: 0
}, arrayD[arrayD.length] = {
  x: 71,
  y: 0
}, arrayD[arrayD.length] = {
  x: 83,
  y: 0
}, arrayD[arrayD.length] = {
  x: 95,
  y: 0
}, arrayD[arrayD.length] = {
  x: 119,
  y: 3
}, arrayD[arrayD.length] = {
  x: 137,
  y: 11
}, arrayD[arrayD.length] = {
  x: 148,
  y: 19
}, arrayD[arrayD.length] = {
  x: 156,
  y: 28
}, arrayD[arrayD.length] = {
  x: 161,
  y: 36
}, arrayD[arrayD.length] = {
  x: 165,
  y: 44
}, arrayD[arrayD.length] = {
  x: 171,
  y: 58
}, arrayD[arrayD.length] = {
  x: 172,
  y: 69
}, arrayD[arrayD.length] = {
  x: 174,
  y: 83
}, arrayD[arrayD.length] = {
  x: 175,
  y: 100
}, arrayD[arrayD.length] = {
  x: 174,
  y: 119
}, arrayD[arrayD.length] = {
  x: 172,
  y: 135
}, arrayD[arrayD.length] = {
  x: 168,
  y: 150
}, arrayD[arrayD.length] = {
  x: 161,
  y: 162
}, arrayD[arrayD.length] = {
  x: 156,
  y: 169
}, arrayD[arrayD.length] = {
  x: 146,
  y: 180
}, arrayD[arrayD.length] = {
  x: 133,
  y: 188
}, arrayD[arrayD.length] = {
  x: 118,
  y: 193
}, arrayD[arrayD.length] = {
  x: 95,
  y: 200
}, arrayD[arrayD.length] = {
  x: 84,
  y: 200
}, arrayD[arrayD.length] = {
  x: 60,
  y: 200
}, arrayD[arrayD.length] = {
  x: 43,
  y: 200
}, arrayD[arrayD.length] = {
  x: 30,
  y: 200
}, arrayD[arrayD.length] = {
  x: 14,
  y: 200
}, arrayD[arrayD.length] = {
  x: 0,
  y: 200
}, arrayD[arrayD.length] = {
  x: 0,
  y: 190
}, arrayD[arrayD.length] = {
  x: 0,
  y: 180
}, arrayD[arrayD.length] = {
  x: 0,
  y: 170
}, arrayD[arrayD.length] = {
  x: 0,
  y: 155
}, arrayD[arrayD.length] = {
  x: 0,
  y: 140
}, arrayD[arrayD.length] = {
  x: 0,
  y: 125
}, arrayD[arrayD.length] = {
  x: 0,
  y: 110
}, arrayD[arrayD.length] = {
  x: 0,
  y: 95
}, arrayD[arrayD.length] = {
  x: 0,
  y: 80
}, arrayD[arrayD.length] = {
  x: 0,
  y: 65
}, arrayD[arrayD.length] = {
  x: 0,
  y: 50
}, arrayD[arrayD.length] = {
  x: 0,
  y: 35
}, arrayD[arrayD.length] = {
  x: 0,
  y: 20
}, arrayD[arrayD.length] = {
  x: 0,
  y: 10
}, arrayD[arrayD.length] = {
  x: 59,
  y: 44
}, arrayD[arrayD.length] = {
  x: 72,
  y: 44
}, arrayD[arrayD.length] = {
  x: 83,
  y: 45
}, arrayD[arrayD.length] = {
  x: 94,
  y: 48
}, arrayD[arrayD.length] = {
  x: 104,
  y: 53
}, arrayD[arrayD.length] = {
  x: 109,
  y: 59
}, arrayD[arrayD.length] = {
  x: 113,
  y: 70
}, arrayD[arrayD.length] = {
  x: 115,
  y: 81
}, arrayD[arrayD.length] = {
  x: 116,
  y: 99
}, arrayD[arrayD.length] = {
  x: 116,
  y: 108
}, arrayD[arrayD.length] = {
  x: 115,
  y: 120
}, arrayD[arrayD.length] = {
  x: 113,
  y: 131
}, arrayD[arrayD.length] = {
  x: 108,
  y: 140
}, arrayD[arrayD.length] = {
  x: 101,
  y: 148
}, arrayD[arrayD.length] = {
  x: 91,
  y: 152
}, arrayD[arrayD.length] = {
  x: 82,
  y: 154
}, arrayD[arrayD.length] = {
  x: 70,
  y: 153
}, arrayD[arrayD.length] = {
  x: 59,
  y: 153
}, arrayD[arrayD.length] = {
  x: 59,
  y: 142
}, arrayD[arrayD.length] = {
  x: 59,
  y: 130
}, arrayD[arrayD.length] = {
  x: 59,
  y: 119
}, arrayD[arrayD.length] = {
  x: 59,
  y: 106
}, arrayD[arrayD.length] = {
  x: 59,
  y: 93
}, arrayD[arrayD.length] = {
  x: 59,
  y: 80
}, arrayD[arrayD.length] = {
  x: 59,
  y: 69
}, arrayD[arrayD.length] = {
  x: 59,
  y: 54
};
var arrayL = [];
arrayL[arrayL.length] = {
  x: 0,
  y: 86
}, arrayL[arrayL.length] = {
  x: 6,
  y: 80
}, arrayL[arrayL.length] = {
  x: 16,
  y: 80
}, arrayL[arrayL.length] = {
  x: 34,
  y: 80
}, arrayL[arrayL.length] = {
  x: 45,
  y: 80
}, arrayL[arrayL.length] = {
  x: 51,
  y: 86
}, arrayL[arrayL.length] = {
  x: 62,
  y: 86
}, arrayL[arrayL.length] = {
  x: 71,
  y: 80
}, arrayL[arrayL.length] = {
  x: 81,
  y: 70
}, arrayL[arrayL.length] = {
  x: 86,
  y: 64
}, arrayL[arrayL.length] = {
  x: 92,
  y: 57
}, arrayL[arrayL.length] = {
  x: 100,
  y: 46
}, arrayL[arrayL.length] = {
  x: 108,
  y: 35
}, arrayL[arrayL.length] = {
  x: 112,
  y: 19
}, arrayL[arrayL.length] = {
  x: 116,
  y: 7
}, arrayL[arrayL.length] = {
  x: 122,
  y: 0
}, arrayL[arrayL.length] = {
  x: 134,
  y: 1
}, arrayL[arrayL.length] = {
  x: 143,
  y: 4
}, arrayL[arrayL.length] = {
  x: 148,
  y: 10
}, arrayL[arrayL.length] = {
  x: 152,
  y: 19
}, arrayL[arrayL.length] = {
  x: 153,
  y: 26
}, arrayL[arrayL.length] = {
  x: 153,
  y: 34
}, arrayL[arrayL.length] = {
  x: 151,
  y: 44
}, arrayL[arrayL.length] = {
  x: 148,
  y: 51
}, arrayL[arrayL.length] = {
  x: 143,
  y: 63
}, arrayL[arrayL.length] = {
  x: 153,
  y: 63
}, arrayL[arrayL.length] = {
  x: 167,
  y: 63
}, arrayL[arrayL.length] = {
  x: 182,
  y: 64
}, arrayL[arrayL.length] = {
  x: 191,
  y: 69
}, arrayL[arrayL.length] = {
  x: 197,
  y: 74
}, arrayL[arrayL.length] = {
  x: 201,
  y: 85
}, arrayL[arrayL.length] = {
  x: 201,
  y: 94
}, arrayL[arrayL.length] = {
  x: 198,
  y: 102
}, arrayL[arrayL.length] = {
  x: 194,
  y: 106
}, arrayL[arrayL.length] = {
  x: 197,
  y: 112
}, arrayL[arrayL.length] = {
  x: 196,
  y: 121
}, arrayL[arrayL.length] = {
  x: 195,
  y: 128
}, arrayL[arrayL.length] = {
  x: 191,
  y: 134
}, arrayL[arrayL.length] = {
  x: 193,
  y: 141
}, arrayL[arrayL.length] = {
  x: 191,
  y: 148
}, arrayL[arrayL.length] = {
  x: 189,
  y: 154
}, arrayL[arrayL.length] = {
  x: 184,
  y: 160
}, arrayL[arrayL.length] = {
  x: 184,
  y: 167
}, arrayL[arrayL.length] = {
  x: 182,
  y: 176
}, arrayL[arrayL.length] = {
  x: 178,
  y: 183
}, arrayL[arrayL.length] = {
  x: 170,
  y: 189
}, arrayL[arrayL.length] = {
  x: 161,
  y: 193
}, arrayL[arrayL.length] = {
  x: 151,
  y: 193
}, arrayL[arrayL.length] = {
  x: 139,
  y: 193
}, arrayL[arrayL.length] = {
  x: 128,
  y: 193
}, arrayL[arrayL.length] = {
  x: 117,
  y: 190
}, arrayL[arrayL.length] = {
  x: 107,
  y: 188
}, arrayL[arrayL.length] = {
  x: 98,
  y: 185
}, arrayL[arrayL.length] = {
  x: 90,
  y: 183
}, arrayL[arrayL.length] = {
  x: 82,
  y: 180
}, arrayL[arrayL.length] = {
  x: 75,
  y: 178
}, arrayL[arrayL.length] = {
  x: 66,
  y: 176
}, arrayL[arrayL.length] = {
  x: 61,
  y: 172
}, arrayL[arrayL.length] = {
  x: 51,
  y: 172
}, arrayL[arrayL.length] = {
  x: 49,
  y: 175
}, arrayL[arrayL.length] = {
  x: 46,
  y: 177
}, arrayL[arrayL.length] = {
  x: 41,
  y: 176
}, arrayL[arrayL.length] = {
  x: 35,
  y: 177
}, arrayL[arrayL.length] = {
  x: 26,
  y: 177
}, arrayL[arrayL.length] = {
  x: 17,
  y: 177
}, arrayL[arrayL.length] = {
  x: 10,
  y: 177
}, arrayL[arrayL.length] = {
  x: 5,
  y: 177
}, arrayL[arrayL.length] = {
  x: 2,
  y: 174
}, arrayL[arrayL.length] = {
  x: 0,
  y: 171
}, arrayL[arrayL.length] = {
  x: 0,
  y: 165
}, arrayL[arrayL.length] = {
  x: 0,
  y: 155
}, arrayL[arrayL.length] = {
  x: 0,
  y: 145
}, arrayL[arrayL.length] = {
  x: 0,
  y: 135
}, arrayL[arrayL.length] = {
  x: 0,
  y: 125
}, arrayL[arrayL.length] = {
  x: 0,
  y: 115
}, arrayL[arrayL.length] = {
  x: 0,
  y: 105
}, arrayL[arrayL.length] = {
  x: 0,
  y: 95
}, arrayL[arrayL.length] = {
  x: 57,
  y: 94
}, arrayL[arrayL.length] = {
  x: 57,
  y: 100
}, arrayL[arrayL.length] = {
  x: 57,
  y: 107
}, arrayL[arrayL.length] = {
  x: 57,
  y: 113
}, arrayL[arrayL.length] = {
  x: 57,
  y: 119
}, arrayL[arrayL.length] = {
  x: 57,
  y: 126
}, arrayL[arrayL.length] = {
  x: 57,
  y: 134
}, arrayL[arrayL.length] = {
  x: 57,
  y: 141
}, arrayL[arrayL.length] = {
  x: 57,
  y: 148
}, arrayL[arrayL.length] = {
  x: 57,
  y: 153
}, arrayL[arrayL.length] = {
  x: 57,
  y: 160
}, arrayL[arrayL.length] = {
  x: 57,
  y: 166
}, arrayL[arrayL.length] = {
  x: 184,
  y: 107
}, arrayL[arrayL.length] = {
  x: 183,
  y: 134
}, arrayL[arrayL.length] = {
  x: 177,
  y: 158
};
var canvas1, canvas2, canvas3, canvas4, canvas5, canvas6, to, in1, in2, in3;
$(document).ready(function() {
  if (canvas1 = $("#myCanvas1").canvaDots({
      sizeDependConnections: !1,
      speed: 1
    }), canvas2 = $("#myCanvas2").canvaDots({
      moveDirection: "up",
      showConnections: !1,
      mouseReaction: !1,
      sizeDependConnections: !0
    }), canvas3 = $("#myCanvas3").canvaDots({
      moveDirection: "down",
      showConnections: !1,
      mouseReaction: !1,
      fillCircles: !0,
      sizeDependConnections: !0
    }), canvas4 = $("#myCanvas4").canvaDots({
      showConnections: !1,
      speed: 3,
      sizeDependConnections: !1
    }), canvas5 = $("#myCanvas5").canvaDots({
      speed: 2,
      sizeDependConnections: !1,
      dotsColor: [0, 0, 0, 0],
      randomBounceSides: !1
    }), canvas6 = $("#myCanvas6").canvaDots({
      sizeDependConnections: !1,
      speed: 2
    }), canvas6.loadSpecificArray(1, arrayD), canvas6.loadSpecificArray(2, arrayC), canvas6.loadSpecificArray(3, arrayL), canvas5.loadSpecificArray(1, arrayD), canvas5.loadSpecificArray(2, arrayC), canvas5.loadSpecificArray(3, arrayL), canvas6.setSpecificArrayOffsetY(50), canvas5.setSpecificArrayOffsetY(50), $(window).width() >= 1170) {
    var r = ($(window).width() - 1170) / 2;
    canvas6.setSpecificArrayOffsetX(50 + r), canvas5.setSpecificArrayOffsetX(50 + r)
  } else canvas6.setSpecificArrayOffsetX(50), canvas5.setSpecificArrayOffsetX(50);
  setShapes(canvas6), setShapes(canvas5);
  for (var a = [], t = 0, e = Math.ceil($("#h1").offset().left); e < $("#h1").offset().left + $("#h1").width(); e += 25) a[t] = {
    x: e,
    y: Math.ceil($("#h1").offset().top + $("#h1").height() / 2)
  }, t++;
  for (var e = Math.ceil($("#p").offset().left); e < $("#p").offset().left + $("#p").width(); e += 25) a[t] = {
    x: e,
    y: Math.ceil($("#p").offset().top + $("#p").height() / 2)
  }, t++;
  canvas1.loadMagnetDots(a), $(window).resize(function() {
    if ($(window).width() >= 1170) {
      var r = ($(window).width() - 1170) / 2;
      canvas6.setSpecificArrayOffsetX(50 + r), canvas5.setSpecificArrayOffsetX(50 + r)
    } else $(window).width() > 600 && (canvas1.setSpecificArrayOffsetX($(window).width() - 250), canvas5.setSpecificArrayOffsetX(50));
    a = [], t = 0;
    for (var e = Math.ceil($("#h1").offset().left); e < $("#h1").offset().left + $("#h1").width(); e += 25) a[t] = {
      x: e,
      y: Math.ceil($("#h1").offset().top + $("#h1").height() / 2)
    }, t++;
    for (var e = Math.ceil($("#p").offset().left); e < $("#p").offset().left + $("#p").width(); e += 25) a[t] = {
      x: e,
      y: Math.ceil($("#p").offset().top + $("#p").height() / 2)
    }, t++;
    canvas1.loadMagnetDots(a)
  })
});