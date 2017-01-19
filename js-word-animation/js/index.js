var WORD_LENGTH_SEED = 10;
var LOG_MESSAGE_LENGTH_SEED = 10;
var SCROLL_SPEED_SEED = 1200;
var BUFFER_LENGTH = 100;
var SCREEN_ELEMENT = 'div.background-screen'

function generateWord() {
  var text = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var wordLength = Math.floor(Math.random() * 10 + WORD_LENGTH_SEED);

  for (var i = 0; i < wordLength; i++) {
    text += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return text;
}

function generateLogMessage() {
  var wordCount = Math.floor(Math.random() * 10 + LOG_MESSAGE_LENGTH_SEED);
  var highlightColor = Math.floor(Math.random() * 10);
  var message = '<p><span class="color' + highlightColor + '">';

  for (var i = 0; i < wordCount; i++) {
    if (i == 3) {
      message += '</span>';
    }
    message += generateWord() + ' ';
  }
  message += '</p>';

  return message;
}

function generateLogMessagesHTML(count) {
  messages = [];
  for (var i = 0; i < count; i++) {
    messages.push(generateLogMessage());
  }
  return messages.join('\n');
}

$(document).ready(function() {
  var el = $(SCREEN_ELEMENT);
  var logMessagesHTML = generateLogMessagesHTML(BUFFER_LENGTH);
  el.html(logMessagesHTML);
  var lastScroll = new Date();

  function scrollLogs() {
    if (new Date().getTime() - lastScroll.getTime() > 100) {
      var lastMessage = el.find('p:first');
      el.append(lastMessage);
    }
    var wait = parseInt((Math.random() / 4) * SCROLL_SPEED_SEED);
    setTimeout(scrollLogs, wait);
  }
  scrollLogs(0);
  $(window).scroll(function() {
    lastScroll = new Date();
  });
});