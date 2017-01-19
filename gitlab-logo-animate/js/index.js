function Fox() {
  var tl        = new TimelineMax({ delay: 0.8 });
  var faceright = document.querySelectorAll('.face .right path'),
      faceleft  = document.querySelectorAll('.face .left path'),
      facectr   = document.querySelectorAll('.face .center path'),
      ears      = document.querySelectorAll('.face .ear path');

  TweenMax.set(faceright, { transformOrigin: 'bottom left' });
  TweenMax.set(faceleft, { transformOrigin: 'bottom right' });
  TweenMax.set([facectr, ears], { transformOrigin: 'bottom center'});
  TweenMax.set([faceleft, faceright, facectr], { opacity: 0, scale: 0 })
  TweenMax.set(ears, { opacity: 0, rotationZ: 180 });

  var scale_in = {
    opacity: .5,
    scale: 1,
    ease: Cubic.fadeInOut
  };

  var unfold_ears = {
    rotationX: -180,
    opacity: .5,
    ease: Power1.fadeInOut
  };

  tl.staggerTo(faceright, 1, scale_in, 0.05675, 0)
    .staggerTo(faceleft, 1, scale_in, 0.05675, 0)
    .to(facectr, 1, scale_in, '-=0.9')
    .to(ears, 1, unfold_ears, '-=0.3');

  return tl;
}

function masterFox() {
  var tl = new TimelineMax();
  tl.add(Fox());
  tl.timeScale(.925);
  tl.repeat(999999);
  return tl;

}
masterFox();