function changeColor() {
    delay++, delay > 3 && (bodyElement.style.backgroundColor = getRandomColor(), delay = 0), requestAnimationFrame(changeColor)
;}

function getRandomColor() {
    var o = Math.floor(256 * Math.random()),
        e = Math.floor(256 * Math.random()),
        n = Math.floor(256 * Math.random()),
        t = o.toString(16),
        a = e.toString(16),
        r = n.toString(16);
    1 == t.length && (t = "0" + t), 1 == a.length && (a = "0" + a), 1 == r.length && (r = "0" + r);
    var i = "#" + t + a + r;
    return i.toUpperCase();
}
var bodyElement = document.querySelector("body"),
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
    delay = 0;
changeColor();