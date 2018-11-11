//API Key 8PZUG6VpbkmEyObiRifjjEe2wWO8u09t
// Initial array of topics.
var topics = ["Happy", "Sad", "Cheeky", "Angry"];
var l = 10;
var r = "r";
var random = "search?";
renderButtons()


// Event listeners for buttons
$(document).on("click", ".topic-btn", displayGifs);
$(document).on("click", ".topicImg", function(){
    toggleAnimate(this);
});
$(document).on("click", ".rating-btn", function(){
    r = $(this).data('rating');
    $(".rating-btn").removeClass("active");
    $(this).addClass("active");
});
$(document).on("change", "#inputGroupSelect", function(){
    l = $(this).val();
    console.log($(this).val());
});
$(document).on("click", ".randomize-btn", function(){
    var randomBtn = this;
    if ($(randomBtn).attr("data-random") == "true") {
        $(randomBtn).attr("data-random", "false");
        random = "search?";
        $(randomBtn).removeClass("active");
        $(randomBtn).text("Not Random");
    } else {
        $(randomBtn).attr("data-random", "true");
        random = "random?";
        $(randomBtn).addClass("active");
        $(randomBtn).text("Random");
    };
    console.log("Random? " + $(randomBtn).attr("data-random"));
});

// Toggle Animation of gif
function toggleAnimate(img) {
    // Grab url of the clicked image
    var clickSRC = $(img).attr("src");
    console.log(clickSRC);
    // Does it have "_s.gif"?
    if (clickSRC.search("_s.gif") != -1) {
        clickSRC = clickSRC.replace("_s.gif", ".gif");
        console.log(clickSRC);
    } else {
        clickSRC = clickSRC.replace(".gif", "_s.gif");
        console.log(clickSRC);
    }
    // Update image src
    $(img).attr("src", clickSRC);
  }
function displayGifs() {
    var gifSearch = $(this).attr("data-name");
    // Storing parts of API call construct
    // var baseURL = "https://api.giphy.com/v1/gifs/search?";
    var baseURL = "https://api.giphy.com/v1/gifs/";
    // var apiKey = "api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&";
    var apiKey = "api_key=8101kMpoOkY0OZMCiLrDyGMG8NpAJ4eQ&";
    var isRandom = random; // https://developers.giphy.com/explorer/
    var q = "q=" + gifSearch + "&";
    var rating= "rating=" + r + "&";
    var limit = "limit=" + l + "&"; 
    if (random == "random?") {
        q = "tag=" + gifSearch + "&";
        limit = "limit=" + "" + "&"; 
    };
    var limit = "limit=" + l + "&"; 
    queryURL = baseURL + isRandom + apiKey + q + rating + limit
    // queryURL = queryURL.trim().replace(/ /g,"%20");
    console.log("queryURL is " + queryURL);
    //https://api.giphy.com/v1/gifs/search?api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&limit=10&rating=&q=gta
    // Storing our giphy API URL for a topic image
    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + gifSearch;
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&limit=1&rating=" + "" + "&q=" + gifSearch
    if (random == "search?"){
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
              for (var i = 0; i < l; i++) {
                  // Saving the image_original_url property
                  var imageUrl = response.data[i].images.downsized_still.url;
                  // Store this into varable first then we can prepend it. Need to put image into it. 
                  var topicCard = $("<div>").addClass("card col-6")
                  topicCard.html('<div class="card-body"> \
                          <h5 class="card-title">'+ gifSearch + '</h5> \
                          <h6 class="card-subtitle mb-2 text-muted">Rating: ' + response.data[i].rating.toUpperCase() + '</h6> \
                          <img class="card-img-top topicImg" alt="game image" src="' + imageUrl + '"></img> \
                          <a href="' + response.data[i].url + '" class="card-link"><i class="fas fa-external-link-alt"></i> Giphy link</a> \
                          <a href="' + response.data[i].embed_url + '" class="card-link"><i class="fas fa-code"></i> Share Embed link</a> \
                      </div> \
                  </div> ')
                  $("#images").prepend(topicCard);
              }
          });
    } else { //Since Random doesn't have a limit parameter and only returns one Gif. Using a loop to retrive the total requested amounts of Gifs. 
        for (var i = 0; i < l; i++) {
            console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                // Saving the image_original_url property
                var imageUrl = response.data.images.downsized_still.url;
                // Store this into varable first then we can prepend it. Need to put image into it. 
                var topicCard = $("<div>").addClass("card col-6")
                topicCard.html('<div class="card-body"> \
                        <h5 class="card-title">'+ gifSearch + '</h5> \
                        <!-- // <h6 class="card-subtitle mb-2 text-muted">Rating: ' + "" + '</h6> \ --> \
                        <img class="card-img-top topicImg" alt="game image" src="' + imageUrl + '"></img> \
                        <a href="' + response.data.url + '" class="card-link"><i class="fas fa-external-link-alt"></i>Giphy link</a> \
                        <a href="' + response.data.embed_url + '" class="card-link"><i class="fas fa-code"></i> Share Embed link</a> \
                        </div> ')
                $("#images").prepend(topicCard);
            });
        }
    };

  }
// Function for displaying topic buttons
function renderButtons() {

    // Deleting the topic buttons prior to adding new topic button
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonsList").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each topic in the array.
            var a = $("<button>");
            // Adding a class
            a.addClass("topic-btn btn btn-outline-secondary");
            // Adding a data-attribute with a value of the topic at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the topic at index i
            a.text(topics[i]);
            // Adding the button to the HTML
            $("#buttonsList").append(a);
        }
}

      // This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        var rateVal = $("#button-addon3").val().trim();
        console.log(rateVal)

        // This line will grab the text from the input box
        var topic = $("#topic-input").val().trim();
        // The topic from the textbox is then added to our array
        topics.push(topic);

        // calling renderButtons which handles the processing of our topic array
        renderButtons();
      });