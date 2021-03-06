! function(o) {
    function e() {
        for (d = document.getElementById("c"), x = d.getContext("2d"), d.width = f, d.height = g, i = 0; i < F; i++) L.push(new l(Math.random() * f, Math.random() * g));
        for (col = 0; col < q; col++)
            for (M[col] = [], row = 0; row < E; row++) {
                var e = new u(col * m, row * m, m);
                M[col][row] = e, M[col][row].col = col, M[col][row].row = row
            }
        for (col = 0; col < q; col++)
            for (row = 0; row < E; row++) {
                var e = M[col][row],
                    t = row - 1 >= 0 ? row - 1 : E - 1,
                    n = col - 1 >= 0 ? col - 1 : q - 1,
                    s = col + 1 < q ? col + 1 : 0,
                    v = M[col][t],
                    c = M[n][row],
                    _ = M[n][t],
                    j = M[s][t];
                e.up = v, e.left = c, e.up_left = _, e.up_right = j, v.down = M[col][row], c.right = M[col][row], _.down_right = M[col][row], j.down_left = M[col][row]
            }
        o.addEventListener("mousedown", a), o.addEventListener("touchstart", a), o.addEventListener("mouseup", w), o.addEventListener("touchend", h), d.addEventListener("mousemove", y), d.addEventListener("touchmove", p), o.onload = r
    }

    function t() {
        for (i = 0; i < L.length; i++) {
            var o = L[i];
            if (o.x >= 0 && o.x < f && o.y >= 0 && o.y < g) {
                var e = parseInt(o.x / m),
                    t = parseInt(o.y / m),
                    r = M[e][t],
                    n = o.x % m / m,
                    s = o.y % m / m;
                o.xv += (1 - n) * r.xv * .05, o.yv += (1 - s) * r.yv * .05, o.xv += n * r.right.xv * .05, o.yv += n * r.right.yv * .05, o.xv += s * r.down.xv * .05, o.yv += s * r.down.yv * .05, o.x += o.xv, o.y += o.yv;
                var v = o.px - o.x,
                    u = o.py - o.y,
                    l = Math.sqrt(v * v + u * u),
                    a = .5 * Math.random();
                l > a ? (x.beginPath(), x.moveTo(o.x, o.y), x.lineTo(o.px, o.py), x.stroke()) : (x.beginPath(), x.moveTo(o.x, o.y), x.lineTo(o.x + a, o.y + a), x.stroke()), o.px = o.x, o.py = o.y
            } else o.x = o.px = Math.random() * f, o.y = o.py = Math.random() * g, o.xv = 0, o.yv = 0;
            o.xv *= .5, o.yv *= .5
        }
    }

    function r() {
        var o = c.x - c.px,
            e = c.y - c.py;
        for (i = 0; i < M.length; i++) {
            var u = M[i];
            for (j = 0; j < u.length; j++) {
                var l = u[j];
                c.down && n(l, o, e, _), s(l)
            }
        }
        for (x.clearRect(0, 0, d.width, d.height), x.strokeStyle = "#edff38", t(), i = 0; i < M.length; i++) {
            var u = M[i];
            for (j = 0; j < u.length; j++) {
                var l = u[j];
                v(l)
            }
        }
        c.px = c.x, c.py = c.y, requestAnimationFrame(r)
    }

    function n(o, e, t, r) {
        var n = o.x - c.x,
            i = o.y - c.y,
            s = Math.sqrt(i * i + n * n);
        if (r > s) {
            4 > s && (s = r);
            var v = r / s;
            o.xv += e * v, o.yv += t * v
        }
    }

    function s(o) {
        var e = .5 * o.up_left.xv + o.left.xv + .5 * o.down_left.xv - .5 * o.up_right.xv - o.right.xv - .5 * o.down_right.xv,
            t = .5 * o.up_left.yv + o.up.yv + .5 * o.up_right.yv - .5 * o.down_left.yv - o.down.yv - .5 * o.down_right.yv;
        o.pressure = .25 * (e + t)
    }

    function v(o) {
        o.xv += .25 * (.5 * o.up_left.pressure + o.left.pressure + .5 * o.down_left.pressure - .5 * o.up_right.pressure - o.right.pressure - .5 * o.down_right.pressure), o.yv += .25 * (.5 * o.up_left.pressure + o.up.pressure + .5 * o.up_right.pressure - .5 * o.down_left.pressure - o.down.pressure - .5 * o.down_right.pressure), o.xv *= .99, o.yv *= .99
    }

    function u(o, e, t) {
        this.x = o, this.y = e, this.r = t, this.col = 0, this.row = 0, this.xv = 0, this.yv = 0, this.pressure = 0
    }

    function l(o, e) {
        this.x = this.px = o, this.y = this.py = e, this.xv = this.yv = 0
    }

    function a(o) {
        o.preventDefault(), c.down = !0
    }

    function w() {
        c.down = !1
    }

    function h(o) {
        o.touches || (c.down = !1)
    }

    function y(o) {
        c.px = c.x, c.py = c.y, c.x = o.offsetX || o.layerX, c.y = o.offsetY || o.layerY
    }

    function p(o) {
        c.px = c.x, c.py = c.y;
        var e = d.getBoundingClientRect();
        c.x = o.touches[0].pageX - e.left, c.y = o.touches[0].pageY - e.top
    }
    var d, x, c = {
            x: 0,
            y: 0,
            px: 0,
            py: 0,
            down: !1
        },
        f = 1440,
        g = 800,
        m = 10,
        _ = 40,
        q = f / m,
        E = g / m,
        F = 5e3,
        M = [],
        L = [];
    o.Fluid = {
        initialize: e
    }
}(window), window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, Fluid.initialize();