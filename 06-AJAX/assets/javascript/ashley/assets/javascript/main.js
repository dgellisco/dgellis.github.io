

// Initial array of musicians(Global variable):

var music = ["Wookiefoot", "Led Zeppelin", "Ella Fitzgerald", "Sunsquabi"];

$( document ).ready(function() {
//Create a function that is triggered by clicking the submit button, creates new music variable and API URL

function displayMusicInfo() {

    console.log("hello there");



    var musicInput = $(this).attr("music-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=uhWODV3AlW7nK6FBrHah9AsEVdt4ixhj&q=" +
      musicInput +
      "&limit=10&offset=0&rating=PG-13&lang=en";
      
    // Creates AJAX call for the specific music/musician entered
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (result) {
      console.log("hi");
      console.log(result.data.length);
      console.log(result);


      //for loop to dynamically create div & class, images and class, etc. for each result

      for (var i = 0; i < result.data.length; i++) {
        var animated = result.data[i].images.fixed_height.url
        var still = result.data[i].images.fixed_height_still.url
            console.log("Animated:" + animated)

                var newDiv = $("<div id='gif'>");
                var p = $("<p>").text("Rating: " + result.data[i].rating);
                var musicImage = $("<img>")
                musicImage.addClass("resultGif")
                musicImage.attr("src", still);
                musicImage.attr("data-state", "still");
                musicImage.attr("data-still", still);
                musicImage.attr("data-animate", animated);
                newDiv.append(p);
                newDiv.prepend(musicImage);
                $("#music-view").prepend(newDiv);
        console.log("animated is " + animated);
      }
      
    });

}


        //Rendering buttons
            function renderButtons() {
            $("#button-view").empty();
        

            //for Loop for creating buttons, appending to button-view area
            for(var i = 0; i < music.length; i++) {
                var a = $("<button>");
                a.addClass("music-btn");
                a.attr("music-name", music[i]);
                a.text(music[i]);
                $("#button-view").append(a);
            };

        };

            //when clicking on the add-music buttons, display info
            $("#add-music").on("click", function (event) {
                event.preventDefault();
                var newMusic = $("#music-input").val().trim();
                music.push(newMusic);
                renderButtons();
                $('#music-input').val("");
            });
            $(document).on("click", ".music-btn", displayMusicInfo);


            //still vs animated gifs upon clicking
            function playGifs() {
                var state = $(this).attr("data-state");
               if (state === "still") {
                 $(this).attr("src", $(this).attr("data-animate"));
                 $(this).attr("data-state", "animate");
               } else {
                 $(this).attr("src", $(this).attr("data-still"));
                 $(this).attr("data-state", "still");
                }
            };

            //call functions
            renderButtons();

        $(document).on("click",".resultGif", playGifs);

     displayMusicInfo();


        });
        
        
