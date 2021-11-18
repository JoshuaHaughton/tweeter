/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Document-ready shorthand
$(() => {

  //function to escape XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Dynamically reates a new tweet element from tweet/user data that is passed in the form of an Object
  const createTweetElement = function (tweetData) {
    const $tweet = $(`
    <article>


          <header>

            <div class="name">
              <img src="${tweetData.user.avatars}"></i>
              <p>${escape(tweetData.user.name)}</p>
            </div>

            <div>
              <p>${escape(tweetData.user.handle)}</p>
            </div>


          </header>


          <div class="bottom-border">
            <p class="tweet-content">${escape(tweetData.content.text)}</p>
          </div>



          <footer>

            <div>
              <p class='p1'>${timeago.format(tweetData["created_at"])}</p>
            </div>
            
            <div class='icons'>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
            
          </footer>


        </article>`);
    return $tweet;
  };

  //When given an array of objects containing tweet data, will dynamically create and append tweets to the class tweet-container
  const renderTweets = function (tweets) {
    for (tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $(".tweet-container").append($tweet);
    }
  };

  //At any given time, will make a GET request to /tweets, and will dynamically create and render all tweets currently in the database
  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (data) {
      renderTweets(data);
    });
  };

  loadTweets();

  //Appends the latest added tweet to the tweet-container
  const newTweet = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (data) {
      latestIndex = data.length - 1;
      const $tweet = createTweetElement(data[latestIndex]);
      $(".tweet-container").append($tweet);
    });
  };



  
  $("#tweet-form").submit(function (event) {
    event.preventDefault();
    const serialized = $(this).serialize();

    //Returns an object containing the key-value pairs of the submitted form ({name: 'text', value: 'tweet text'})
    var data = $(this)
      .serializeArray()
      .reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      });

    let length = data.value.length;

    //If length is less than zero, hides the other possible error before revealing the current one
    if (length <= 0) {
      $("#error-length").hide();
      $("#error-empty").show();
    }

    if (length > 140) {
      $("#error-empty").hide();
      $("#error-length").show();
    }

    if (length < 140 && length > 0) {
      $("#error-empty").hide();
      $("#error-length").hide();
      $.post("/tweets", serialized).then(newTweet());
    }
  });
});
