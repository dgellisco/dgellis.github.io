
// Initial array of emotions
var emotionsObj = ["Feels", "TGIF", "Yay", "Woohoo!", "Cheeky", "Angry"];
var gifsPerClick = 10;
var gifDIVNumber = 0;
var clickedBtn = "";
var gifsToPreloadArray = [];
var firstButtonClicked = 0;
var currentSongIndex = 0;
var songs = [
    "assets/audio/Modest_Mouse-Float_On_[DJ'd_For_Dane].mp3",
    "assets/audio/Europe-The_Final_Countdown_[Requested_By_Alex].mp3",
    "assets/audio/Vitas-7th_Element_[Randomly_Selected_For_Marlow].mp3",
    "assets/audio/Jukebox_The_Ghost-Fred_Astaire_[Recommended_By_Bri].mp3",
    "assets/audio/Jim_James-Throwback_[Dave's_Current_Jam].mp3"
]
renderButtons();
musicStartStop();

  
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
    else {
        alert("Field is blank\nEnter an emotion before clicking add");
    }
});
  
// Adding click event listeners to all elements with a class of "emotion"
$(document).on("click", ".emotion-btn", function() {
    clickedBtn = $(this).attr("data-name");
    renderGIF();
});

// $(document).on("click", ".gif-img", function() {
//     toggleAnimate(this);
// });

    // global on-click command
    $(document).on("click", ".gif-img", function(){
        // toggleAnimate(this);
        var ds = this.getAttribute("data-state");
        console.log(this.getAttribute("data-state"));
        var urlStill = this.getAttribute("data-url-still");
        var urlAnimate = this.getAttribute("data-url-animated");
        console.log("ds is " + ds);
        // if img data-state == still, change img src to value of data-url-animated (i.e. the url)
        if (ds == "still"){
            // change img src value to value of data-state-animate
            $(this).attr("src", urlAnimate);
            $(this).attr("data-state", "animated");
        }
        else {
            // change img src value to value of data-state-state
            
            $(this).attr("src", urlStill);
            $(this).attr("data-state", "still");
        }
        console.log("ds is now " + this.getAttribute("data-state"));
    });


$(document).on("click", "#musicbuttonstartstop", function() {
    musicStartStop();
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
        var a = $("<button>")
        // Adds a class of emotion to our button
        .addClass("emotion-btn")
        .addClass("btn btn-dark")
        // Added a data-attribute
        .attr("data-name", emotionsObj[i])
        // Provided the initial button text
        .text(emotionsObj[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}


// render static GIFs
function renderGIF() {
  
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + clickedBtn + "&rating=pg-13";

    $.ajax({
      url: queryURL,
      method: "GET"
    })

        .then(function(response) {

            console.log(response);

            for (i = 0; i < gifsPerClick; i++) {
            
                // create div for image and image details
                var newGIPHYDiv = $("<div>")
                    .attr("class", "gif-div col-md-6 card d-flex align-items-stretch")
                    .attr("id", "gif-div" + gifDIVNumber);
                $("#giphy-view").prepend(newGIPHYDiv);

                var newGIPHYCardBody = $("<div class='card-body' id='gif-div-card-body-" + gifDIVNumber + "'>");
                console.log("newGIPHYCardBody is " + newGIPHYCardBody);
                $("#gif-div" + gifDIVNumber).append(newGIPHYCardBody);

                // IMG Details: Rating
                var imgRating = response.data[i].rating;
                imgRating = "Rating: " + imgRating.toUpperCase();
                var newGIPHYRating = $("<p>")
                    .attr("class", "gif-img-rating")
                    .text(imgRating);
                $("#gif-div-card-body-" + gifDIVNumber).append(newGIPHYRating);

                // IMG Details: Download Link
                var imgDownload = response.data[i].images.original.url;
                var newGIPHYDL = $("<a href='" + imgDownload + "' class='download-link' download>Download GIF</a>");
                $("#gif-div-card-body-" + gifDIVNumber).append(newGIPHYDL);

                var newGIPHYImg = $("<img>")
                    .attr("src", response.data[i].images.original_still.url)
                    .attr("data-state", "still")
                    .attr("data-url-still", response.data[i].images.original_still.url)
                    .attr("data-url-animated", response.data[i].images.original.url)
                    .attr("class", "gif-img")
                    .attr("alt", "giphy goes here")
                    .addClass("card-img-top");
                $("#gif-div" + gifDIVNumber).prepend(newGIPHYImg);

                var imgTitle = response.data[i].title;
                // imgTitle = imgTitle.toProperCase();
                imgTitle = sentenceCase(imgTitle);

                function sentenceCase (str) {
                    if ((str===null) || (str===''))
                         return false;
                    else
                     str = str.toString();
                  
                   return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
                }

                var newGIPHYTitle = $("<p>")
                    .attr("class", "gif-img-title")
                    .text("Title: " + imgTitle);

                $("#gif-div-card-body-" + gifDIVNumber).prepend(newGIPHYTitle);

                gifDIVNumber++;

                // push animated GIF URL to an array, but do not load to page yet
                gifsToPreloadArray.push(response.data[i].images.original.url);
                console.log(gifsToPreloadArray.length);
            } // end of for loop - all static images have been loaded and written to page using HTML

            // now that all static images have been loaded, 'preload' the animated GIFs by writting them to a hidden HTML element
            $("#preloaded-giphy-view").empty();
            console.log("gifstoPreload are " + gifsToPreloadArray);
            for (i = 0; i < gifsToPreloadArray.length; i++) {
                var nextImage = new Image();
                    nextImage.src = gifsToPreloadArray[i];
                    console.log("preload gif url is " + gifsToPreloadArray[i]);
                // var preloadedGIF = $("<img>")
                //     .attr("src", gifsToPreloadArray[i])
                //     .attr("class", "gif-img-preloaded")
                //     .attr("alt", "preloaded giphy goes here")
                //     .attr("style", "display: none");
                //     $("#preloaded-giphy-view").append(preloadedGIF);
                // console.log("preloadedGIF " + i);
            }
            // clear array of URLs
            gifsToPreloadArray = [];
            console.log("gifstoPreload are " + gifsToPreloadArray);
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

function musicStartStop() {
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
        .replace("[", "<br>[")
        .replace(".mp3", "");

    if ($("#backgroundmusic").attr("src").indexOf("assets") > -1) {
        $("#musiccurrentsongdisplay")
        .html(currentSongDisplay);
        $("#musicbuttonstartstop").text("Stop Music");
    }
    else {
        $("#musiccurrentsongdisplay").empty();
        $("#musiccurrentsongdisplay").text("Click These Buttons To Play Some Music");
        $("#musicbuttonstartstop").text("Start Music");
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