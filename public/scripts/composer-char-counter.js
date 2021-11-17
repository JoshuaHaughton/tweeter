$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('input', function() {
    let thisLength = $(this).val().length;
    let counter = $(this).siblings().children()[1];
    $(counter).val(140 - thisLength);

    
    if((140 - thisLength) < 0) {
      $(counter).css('color', 'red')
    }  else {
      $(counter).css('color', '#545149')
    }

  })

});