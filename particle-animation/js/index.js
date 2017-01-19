$(document).ready(function(){
  var can = ('<canvas>')
  
  $('body').css({'background':'black', 'margin':'0','overflow':'hidden'});
  $(can).appendTo('body').attr('id','cnv');
		
  var VELOCITY = 3;
  var PARTICLES = 700;			
  var mouse = {x:0, y:0};
  var particles = [];
  var colors = [ "#000000","#FF0000","#673ab7" ];
  var canvas = $('#cnv')[0];
  var context;
			
			if (canvas && canvas.getContext) {
				context = canvas.getContext('2d');
				
				for( var i = 0; i < PARTICLES; i++ ) {
					particles.push( { 
						x: Math.random()*window.innerWidth, 
						y: Math.random()*window.innerHeight, 
						vx: ((Math.random()*(VELOCITY*4))-VELOCITY),
						vy: ((Math.random()*(VELOCITY*4))-VELOCITY),
						size: 1+Math.random()*1,
						color: colors[ Math.floor( Math.random() * colors.length ) ]
					} );
				}
				
				Initialize();
			}
			
			function Initialize() {
				$(canvas)[0].addEventListener('mousemove', MouseMove, false),
				$(window)[0].addEventListener('mousedown', MouseDown, false),
				$(window)[0].addEventListener('resize', ResizeCanvas, false);
				setInterval( TimeUpdate, 20 );
				
				ResizeCanvas();
			}
			
			function TimeUpdate(e) {
				
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				
				var len = particles.length;
				var particle;
				
				for( var i = 0; i < len; i++ ) {
					particle = particles[i];
					
					if (!particle.frozen) {
						particle.x += particle.vx;
						particle.y += particle.vy;
						
						if (particle.x > window.innerWidth) {
							particle.vx = -VELOCITY - Math.random();
						}
						else if (particle.x < 0) {
							particle.vx = VELOCITY + Math.random();
						}
						else {
							particle.vx *= 1 + (Math.random() * 0.005);
						}
						
						if (particle.y > window.innerHeight) {
							particle.vy = -VELOCITY - Math.random();
						}
						else if (particle.y < 0) {
							particle.vy = VELOCITY + Math.random();
						}
						else {
							particle.vy *= 1 + (Math.random() * 0.01);
						}
						
						var distanceFactor = DistanceBetween( mouse, particle );
						distanceFactor = Math.max( Math.min( 15 - ( distanceFactor / 10 ), 10 ), 1 );
						
						particle.currentSize = particle.size*distanceFactor;
					}
					
					context.fillStyle = particle.color;
					context.beginPath();
					context.arc(particle.x,particle.y,particle.currentSize,0,Math.PI*2,true);
					context.closePath();
					context.fill();
					
				}
			}
			
			function MouseMove(e) {
				mouse.x = e.layerX;
				mouse.y = e.layerY;
			}
			
			function MouseDown(e) {
				var len = particles.length;
				
				var closestIndex = 0;
				var closestDistance = 900;
				
				for( var i = 0; i < len; i++ ) {
					var thisDistance = DistanceBetween( particles[i], mouse );
					
					if( thisDistance < closestDistance ) {
						closestDistance = thisDistance;
						closestIndex = i;
					}
					
				}
				
				if (closestDistance < particles[closestIndex].currentSize) {
					particles[closestIndex].frozen = true;
				}
			}
			
			function ResizeCanvas(e) {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}
			
			function DistanceBetween(p1,p2) {
				var dx = p2.x-p1.x;
				var dy = p2.y-p1.y;
				return Math.sqrt(dx*dx + dy*dy);
			}
		 });