$(document).ready(function() {
  //Tracks user character input, and displays for the user to see. If the length of the characters input exceed 140, the display showing the remaining characters available will turn red and become a negative integer
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