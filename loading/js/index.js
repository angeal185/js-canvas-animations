var d = 'horizontal', c = 0, s = 100, m = 200;
setInterval(function() {
  function dim() {
    c += Math.random() * 5;
    if (s - c < Math.random() * 5) s += Math.random() * 15;
    if (s > m) s = m;
    if (c > s) c = s;
    
    var barSize = (c - 4) + "px", bgSize = s + "px", bgMargin = (s * -0.5) + "px";
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
    c = 0; s = 100; d = "vertical";
  } else if (d == "vertical" && dim()) {
    c = 6; s = 100; d = "text";
  } else if (d =="text") {
     dim();
     bar.innerHTML = (Math.round(c / m * 99) + Math.round(Math.random() * 9) / 10) + "%";
  }
  
}, 200);