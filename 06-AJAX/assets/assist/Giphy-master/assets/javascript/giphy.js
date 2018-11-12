// Gif "topic" buttons
var topics = ["Anime", "Yuri on Ice!", "Full Metal Alchemist", "DragonBall Z", "Fruits Basket", "Ouran High School Host Club"];

console.log(topics.length);
// Pulling gifs

// Making buttons/new buttons
function newAnimeBttns() {
    $("#animeBttns").empty();
    for (var i= 0; i < topics.length; i++) {
        var topicBttn = $("<button>");
        topicBttn.addClass("bttn");
        topicBttn.attr("data", topics[i]);
        topicBttn.text(topics[i]);
        $("#animeBttns").append(topicBttn);
    } 
}

    $("#add-anime").on("click", function(event) {
        event.preventDefault();
        var anime = $("#anime-input").val().trim();
        topics.push(anime);
        newAnimeBttns();
    });

// Calling the function to show the initial topics
newAnimeBttns();

// Displaying gifs on a click for any of the buttons above.
$(document).on("click", ".bttn", function() {
    var topic = $(this).attr("data");
    console.log(topic);
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=sTY8u4svT7q5V5kmbOFxWn7S1SyfRB3b&limit=10";
    console.log("this search is " + topic);

    $.ajax({   
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    
        var results = response.data;
        console.log(results);

    // For loop for getting rid of R/PG-13 Gifs, adding stills of Gifs, and adding rating to the Gifs.
        
        for (var a = 0; a < results.length; a++) {
            console.log("results.length is " + results.length);
            if (results[a].rating !== "r" && results[a].rating !== "pg-13") {
                console.log("rating if statement has run");

            // shopping list:

                // create div for image and image details - DONE
                var newGif = $("<div>");
                newGif.addClass("newGif");
                    // create img element - DONE
                    var animeImg = $("<img>");
                    animeImg.attr("src", results[a].images.fixed_width_still.url);
                    animeImg.addClass("animeGIF");
                    animeImg.attr("alt", "animeGif");
                        // give attribute of data-state-still, give value of results[a].images.fixed_width_still.url, set to initial src value - DONE
                        var stillimg = results[a].images.fixed_width_still.url;
                        animeImg.attr("data-state", "still"); 
                        animeImg.attr("data-state-still", stillimg);
                        // give attribute of data-state-animated, give value of results[a].images.fixed_width.url - DONE
                        var animateimg = results[a].images.fixed_width.url;
                        animeImg.attr("data-state-animate", animateimg);
                        // append to parent div
                        newGif.append(animeImg);
                    // create p elements with details (name, rating, etc.)
                        // create p element with rating and append to parent div
                        var gifRating = $("<p>").text("Rating: " + results[a].rating.toUpperCase());
                        newGif.append(gifRating);
                        // craete p element with title and append to parent div
                    $("#anime-gif").prepend(newGif);
                
            }   
        }
    });
});
    // global on-click command
    $(document).on("click", ".animeGIF", function(){
        var ds = this.getAttribute("data-state");
        var urlStill = this.getAttribute("data-state-still");
        var urlAnimate = this.getAttribute("data-state-animate");
        console.log("ds is " + ds);
        // if img data-state == still, change img src to value of data-state-animated (i.e. the url)
        if (ds == "still"){
            // change img src value to value of data-state-animate
            $(this).attr("src", urlAnimate);
            $(this).attr("data-state", "animate");
        }
        else {
            // change img src value to value of data-state-state
            $(this).attr("src", urlStill);
            $(this).attr("data-state", "still");
        }

    });
    
            





        // function updateState(state, ele) {
        //     $(ele).attr("src", $(ele).attr("data-" + state));
        //     $(ele).attr("data-state", state);
        //   }
        //   $(".newGif").on("click", function () {
        //     var state = $(this).attr("data-state");
        //     var dAnimate = $(this).attr("data-animate")
        //     if (state === "still") {
        //       updateState('animate', this);
        //     } else {
        //       updateState('still', this);
        //     }
        //   });
//         $(".newGif").on("click", function(){


//             var state = $(this).attr('data-state');
            
          
//            if (state === "still") {
//   $(this).attr("src", $(this).attr("data-animate"));
//   $(this).attr("data-state", "animate");
// } else {
//   $(this).attr("src", $(this).attr("data-still"));
//   $(this).attr("data-state", "still");
// }
// });






