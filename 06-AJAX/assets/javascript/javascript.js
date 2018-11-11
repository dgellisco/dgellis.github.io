
// Initial array of emotions
var emotionsObj = ["Happy", "Sad", "Cheeky", "Angry"];
var gifsPerClick = 10;
var gifDIVNumber = 0;
var clickedBtn = "";
var gifsToPreloadArray = [];
var currentSong = "assets/audio/Jim_James-Throwback.mp3";
renderButtons();

  
// This function handles events where the add emotion button is clicked
$("#add-emotion").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var newEmotion = $("#emotion-input").val().trim();
    // The emotion from the textbox is then added to our array
    emotionsObj.push(newEmotion);
    // Calling renderButtons which handles the processing of our emotion array
    renderButtons();
});
  
// Adding click event listeners to all elements with a class of "emotion"
$(document).on("click", ".emotion-btn", function() {
    clickedBtn = $(this).attr("data-name");
    renderGIF();
});

$(document).on("click", ".gif-img", function() {
    toggleAnimate(this);
});

$(document).on("click", "#musicbuttonstopstart", function() {
    musicStopStart();
});

$(document).on("click", "#musicbuttonnexttrack", function() {
    musicNextTrack();
});

// Render buttons from emotions Obj
function renderButtons() {

    // Deletes the emotions prior to adding new emotions
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
  
    // Loops through the array of emotions
    for (var i = 0; i < emotionsObj.length; i++) {
  
        // Then dynamicaly generates buttons for each emotion in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of emotion to our button
        a.addClass("emotion-btn");
        // Added a data-attribute
        a.attr("data-name", emotionsObj[i]);
        // Provided the initial button text
        a.text(emotionsObj[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}


// render static GIFs
function renderGIF() {
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + clickedBtn;

    console.log("queryURL is " + queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    })

        .then(function(response) {

            for (i = 0; i < gifsPerClick; i++) {
            
                var newGIPHY = $("<div>")
                    .attr("class", "gif-div")
                    .attr("id", "gif-div" + gifDIVNumber);
                $("#giphy-view").prepend(newGIPHY);

                var imgRating = response.data[i].rating;
                imgRating = "Rating: " + imgRating.toUpperCase();
                var newGIPHYRating = $("<p>")
                    .attr("class", "gif-img-rating")
                    .text(imgRating);
                    
                $("#gif-div" + gifDIVNumber).prepend(newGIPHYRating);

                // grab still gif and prepend to giphy view
                console.log(response.data);
                var imgUrl = response.data[i].images.original_still.url;
                var newGIPHYImg = $("<img>")
                    .attr("src", imgUrl)
                    .attr("class", "gif-img")
                    .attr("alt", "giphy goes here");
                console.log("newGIPHY is " + newGIPHY + " and newGIPHYImg is " + newGIPHYImg);
                $("#gif-div" + gifDIVNumber).prepend(newGIPHYImg);

                gifDIVNumber++;

                // push animated GIF URL to an array, but do not load to page yet
                gifsToPreloadArray.push(response.data[i].images.original.url);
            } // end of for loop - all static images have been loaded and written to page using HTML

            // now that all static images have been loaded, 'preload' the animated GIFs by writting them to a hidden HTML element
            for (i = 0; i < gifsToPreloadArray.length; i++) {
                var preloadedGIF = $("<img>")
                    .attr("src",  gifsToPreloadArray)
                    .attr("cl   ass", "gif-img-preloaded")
                    .attr("alt", "preloaded giphy goes here")
                    .attr("style", "display: none");
                    $("#preloaded-giphy-view").append(preloadedGIF);
            }
            // clear array of URLs
            gifsToPreloadArray = [];
            // images will now animate quicker once clicked by user
        });
    

}


function toggleAnimate(img) {
    console.log("on function this is 2 " + img);
    var clickedImgURL = $(img).attr("src");
    if (clickedImgURL.search("_s.gif") != -1) {
        clickedImgURL = clickedImgURL.replace("_s.gif", ".gif");
        console.log("clickedImgURL is " + clickedImgURL);
    }
    else {
        clickedImgURL = clickedImgURL.replace(".gif", "_s.gif");
        console.log("clickedImgURL is " + clickedImgURL);
    }
    $(img).attr("src", clickedImgURL);
}

function musicStopStart() {
    if ($("#backgroundmusic").attr("src").indexOf("assets") > -1) {
        $("#backgroundmusic")
            .attr("src", "");
        console.log("music stopped");
    }
    else {
        $("#backgroundmusic")
        .attr("src", currentSong)
        console.log("music started");
    }
    updateSongDetails();
}

function updateSongDetails() {
    currentSongDisplay = currentSong
        .replace("assets/audio/", "")
        .replace("_", " ")
        .replace("-", " - ")
        .replace(".mp3", "");
    console.log(currentSong);

    if ($("#backgroundmusic").attr("src").indexOf("assets") > -1) {
        $("#musiccurrentsongdisplay")
        .text(currentSongDisplay);
    }
    else {
        $("#musiccurrentsongdisplay").empty();
    }
}

function musicNextTrack() {

}