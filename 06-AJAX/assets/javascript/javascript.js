
// Initial array of emotions
var emotionsObj = ["Happy", "Sad", "Cheeky", "Angry"];
var gifsPerClick = 10;
var gifDIVNumber = 0;
var clickedBtn = "";
var gifsToPreloadArray = [];
var firstButtonClicked = 0;
var currentSongIndex = 0;
var songs = [
    "assets/audio/Europe-The_Final_Countdown_[Requested_By_Alex].mp3",
    "assets/audio/Modest_Mouse-Float_On_[DJ'd_For_Dane].mp3",
    "assets/audio/Vitas-7th_Element_[Randomly_Selected_For_Marlow].mp3",
    "assets/audio/Jukebox_The_Ghost-Fred_Astaire_[Recommended_By_Bri].mp3",
    "assets/audio/Jim_James-Throwback_[For_Dave's_Enjoyment].mp3"
]
renderButtons();
musicStopStart();

  
// This function handles events where the add emotion button is clicked
$("#add-emotion-btn").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var newEmotion = $("#add-emotion-form").val();
    if (newEmotion.length != 0) {
        newEmotion = $("#add-emotion-form").val().trim();
        // The emotion from the textbox is then added to our array
        emotionsObj.push(newEmotion);
        $("#add-emotion-form").val("");
        // Calling renderButtons which handles the processing of our emotion array
        renderButtons();
    }
});
  
// Adding click event listeners to all elements with a class of "emotion"
$(document).on("click", ".emotion-btn", function() {
    clickedBtn = $(this).attr("data-name");
    $("#giphy-view").empty();
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

    $.ajax({
      url: queryURL,
      method: "GET"
    })

        .then(function(response) {

            console.log(response);

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
                var imgUrl = response.data[i].images.original_still.url;
                var newGIPHYImg = $("<img>")
                    .attr("src", imgUrl)
                    .attr("class", "gif-img")
                    .attr("alt", "giphy goes here");
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
    var clickedImgURL = $(img).attr("src");
    if (clickedImgURL.search("_s.gif") != -1) {
        clickedImgURL = clickedImgURL.replace("_s.gif", ".gif");
    }
    else {
        clickedImgURL = clickedImgURL.replace(".gif", "_s.gif");
    }
    $(img).attr("src", clickedImgURL);
}

function musicStopStart() {
    if ($("#backgroundmusic").attr("src").indexOf("assets") > -1) {
        $("#backgroundmusic")
            .attr("src", "");
    }
    else {
        musicPlay();
    }
    updateSongDetails();
}

function musicPlay() {
    $("#backgroundmusic")
    .attr("src", songs[currentSongIndex]);
}

function updateSongDetails() {
    currentSongDisplay = songs[currentSongIndex]
        .replace("assets/audio/", "")
        .replace(/_/g, " ")
        .replace(/-/g, " - ")
        .replace(".mp3", "");

    if ($("#backgroundmusic").attr("src").indexOf("assets") > -1) {
        $("#musiccurrentsongdisplay")
        .text(currentSongDisplay);
    }
    else {
        $("#musiccurrentsongdisplay").empty();
    }
}

function musicNextTrack() {
    if (currentSongIndex < songs.length -1) {
        currentSongIndex++;
        musicPlay();
    }
    else {
        currentSongIndex = 0;
        musicPlay();
    }
    updateSongDetails();
}