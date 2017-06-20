div1 = $('<div></div>')

bubbles = ->
  min_bubble_count = 40
  max_bubble_count = 60
  min_bubble_size = 80
  max_bubble_size = 100
  min_speed = 1
  max_speed = 10
  #more is less
  bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count + 1))
  i = 0
  while i < bubbleCount
    $bubbles.append('<div class="bubble-container"><div class="bubble"></div></div></div>').append '<div class="bubble-container"><div class="bubble2"></div></div></div>'
    i++
  $bubbles.find('.bubble-container').each ->
    pos_rand = Math.floor(Math.random() * 99)
    size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 1))
    delay_rand = Math.floor(Math.random() * 17)
    speed_rand = min_speed + Math.floor(Math.random() * (max_speed + 1))
    $this = $(this)
    $this.css
      'left': pos_rand + '%'
      '-webkit-animation-duration': speed_rand + 's'
      '-moz-animation-duration': speed_rand + 's'
      '-ms-animation-duration': speed_rand + 's'
      'animation-duration': speed_rand + 's'
      '-webkit-animation-delay': delay_rand + 's'
      '-moz-animation-delay': delay_rand + 's'
      '-ms-animation-delay': delay_rand + 's'
      'animation-delay': delay_rand + 's'
    $this.children('.bubble, .bubble2').css
      'width': size_rand + 'px'
      'height': size_rand + 'px'
    return
  return

$(div1).prependTo('body').attr 'class': 'bubbles'
$bubbles = $('.bubbles')
bubbles()