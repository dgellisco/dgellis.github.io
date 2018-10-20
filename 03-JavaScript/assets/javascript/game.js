var wordsArray = ["AUSTRALIA", "CANADA", "CHINA" ];
// var wordsArraySaved = wordsArray.slice(0);
var countriesSaved = [];
var countriesSavedDisplay = "";
var chosenWord;
var currentWord;
var guessProgress = [];

var userName;
var qwerty;

var wins = 0;
var guessesRemaining;
var guessesWrong;
var guessesRight;

var guessedLetters = [];
var guessInput;

var statusDisplay;
var gameFinished;
var levelFinished;


function pageLoad() {
    // gameInstructions();
    setTimeout(function() {
        // Capture time
        function startTime(){
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds(); 
            return [ h, m, s ].join(':');
        }
        // Capture date
        let startDate = new Date().toLocaleDateString()
        // Game introduction
        alert("INTERPOL NOTICE " + startDate + " " + startTime() + "\n\nNotorious thief Carmen Sandiego has just stolen the Statue Of Liberty!\n\nShe has fled the scene, and was last seen boarding a plane at the International Airport.");
        userName = prompt("You!\n\nDetective!\n\nWhat's your name?\n");
        if (userName == "") {
            userName = "ROOKIE DETECTIVE";
            }
        document.getElementById("username").innerHTML = userName;
        alert("Oh...  How interesting...  My father's name was also " + userName + ".\n\n...Anyway, INTERPOL needs YOU to find Carmen, recover the Statue Of Liberty, and save the day!\n\nFor this challenging assignment, you'll need to use your incredible skills, amazing talents, and the alphabetical keys on your keyboard to trace Carmen's footsteps and find out where she's gone.");
        alert("Reports are that Carmen intends to continue her crime spree by stealing another national icon, somewhere else in the world.\n\nWe need YOU to prevent that.\n\n...but, where in the world is Carmen Sandiego?");    
        }
        ,1000);
    // Fade in game
    setTimeout(function() {
        document.documentElement.style.opacity = "1";
        }
        ,1000);
    console.log("Intro complete, page loaded");
    gameReset();
}

// function gameInstructions {
//     alert("test");
// }

// intialize or new game
function gameReset() {
    newLevel();
    guessesRemaining = 20;
    levelFinished = false;
    gameFinished = false;
    updateDisplay();
    console.log(userName);
    }


// new level
function newLevel() {
    if(gameFinished != true) {
        levelFinished = false;
        // update display-gamestatus for newLevel()
        document.getElementById("display-gamestatus").innerHTML = "Guess the word.  It's a country.  Type a letter on your keyboard to get started.";
        // clear guess fields
        guessProgress = [];
        guessedLetters = [];
        guessesWrong = 0;
        guessesRight = 0;
        // pick a random word from wordsArray
        currentWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
        console.log(currentWord);
        // divide word into an array
        currentWordArray = currentWord.split("");
        console.log(currentWordArray);
        // hide letters in array by duplicating into different variable, and replacing display with underscores
        for (i = 0; i < currentWordArray.length; i++) {
            guessProgress.push("_ ");
        }
        console.log(guessProgress.length);
        console.log(guessProgress);
        // update displays
        updateDisplay();
    }
}



// Update display
function updateDisplay() {
    // Update scores
    document.getElementById("wins").innerHTML = wins;
    console.log("guess progress is " + guessProgress);
    // var guessProgressDisplay = guessProgress.toString();
    // guessProgressDisplay.replace(","," x");
    var guessProgressDisplay = guessProgress.join(" ");
    // console.log("guess progress display is " + guessProgressDisplay);
    document.getElementById("guessprogress").innerHTML = guessProgressDisplay;
    document.getElementById("guessesremaining").innerHTML = guessesRemaining;
    document.getElementById("guesseswrong").innerHTML = guessesWrong;
    guessedLetters.sort();
    var guessedLettersDisplay = guessedLetters.join(" ");
    document.getElementById("guessedletters").innerHTML = guessedLettersDisplay;
    // Update user guesses - if letter exists in guessedLetters and exists in #currentWord, change display from none to show


    // If currentWord is complete, display win screen

    // If guessesRemaining = 0, display lose screen, change status to gameFinished
}



// User input
document.onkeyup = function(event) {
    // Check if game is won
    if(gameFinished != true) {
        // Accept key input
        console.log(levelFinished);
            if(levelFinished) {
                document.getElementById("display-gamestatus").innerHTML = "Press Enter to start a new game";
                console.log("Press enter to restart");
                if(event.keyCode == 13) {
                    console.log("Game Status: Game restarted");
                    newLevel();
                }
                else {
                    console.log("Press enter to restart");
                }
            }
        
        if(levelFinished != true) {
            if(event.keyCode >= 65 && event.keyCode <= 90) {
                guessInput = String.fromCharCode(event.keyCode).toUpperCase();
                
                console.log("guessedInput is " + guessInput);

                checkGuess();
            }
        }
    }
};



// Check guessInput against guessedLetters
function checkGuess() {
    console.log("checkGuess function");
    if(guessedLetters.indexOf(guessInput) == -1) { // If guessInput not already in guessed array
        guessedLetters.push(guessInput);
        console.log("  New letter.  guessedLetters = " + guessedLetters);

// Check if letter is correct, wrong, or already guessed
        // Check conditions
        if(currentWordArray.indexOf(guessInput) >= 0) { // If guessInput exists in word array
            var statusDisplayArray = [
                "Nice one!  You correctly guessed the letter '" + guessInput + "'.  You're amazing!",
                "Wow, the letter '" + guessInput + "' is absolutely right!  Well done!",
                "Way to go, pal!  The letter '" + guessInput + "' is part of this word.  Keep up the good work!"
            ];
            statusDisplay = statusDisplayArray[Math.floor(Math.random() * statusDisplayArray.length)];
            document.getElementById("display-gamestatus").innerHTML = statusDisplay;
            
            guessesRight++;
            console.log("  Correct Guess!");
            
            
            for (i = 0; i < currentWord.length; i++) {  // check each index of word array for guess, put it in displayed guess if it's there
                if(currentWordArray[i] == guessInput) {
                    console.log("letter is in " + currentWordArray.indexOf(guessInput) + " position in word");
                    console.log(guessProgress);
                    guessProgress[i] = guessInput;
                    console.log(guessProgress);
                }
            }
        }
        // Condition: Wrong letter
        else {
            guessesRemaining--;
            guessesWrong++;
            var statusDisplayArray = [
                "This country does not contain the letter '" + guessInput + "'.  Try again.",
                "Nice try, but the letter '" + guessInput + "' is incorrect.  Please try a different letter.",
                "Oh no!  The letter '" + guessInput + "' is not in the name of this country.  Quick, try again!  We have to find Carmen!"
            ];
            statusDisplay = statusDisplayArray[Math.floor(Math.random() * statusDisplayArray.length)];
            document.getElementById("display-gamestatus").innerHTML = statusDisplay;
        }
    }
    // Condition: Already guessed letter
    else {
        var statusDisplayArray = [
            "You already guessed the letter '" + guessInput + "'.  Try a different letter.",
            "You already guessed the letter '" + guessInput + "'.  Whoops!",
            "Long day?  You already guessed '" + guessInput + "'.  Keep trying!"
        ];
        statusDisplay = statusDisplayArray[Math.floor(Math.random() * statusDisplayArray.length)];
        document.getElementById("display-gamestatus").innerHTML = statusDisplay;
    }
    checkWinLose();
    updateDisplay();
}



function checkWinLose() {
    if(guessProgress.includes("_ ") == false) {
        levelWon();
    }
    else if(guessesRemaining == 0) {
        gameLose();
    }
    else {
        updateDisplay();
    }
}


function levelWon() {
    // update display-gamestatus
    document.getElementById("display-gamestatus").innerHTML = "You win!  You guessed it correctly in '" + guessesRight + "' guesses with only '" + guessesWrong + "' mistakes.";
    console.log("Game won!");
    levelFinished = true;
    console.log("wordsArray length is " + wordsArray.length);
    // remove correct guess from array
    if(wordsArray.length == 1) {
        countriesSaved += wordsArray.indexOf(currentWord);
        gameWon()
    }
    else {
        countriesSaved += wordsArray.indexOf(currentWord);
        var deleteIndex = wordsArray.indexOf(currentWord);
        wordsArray.splice(deleteIndex, 1);
    }
    
    // add to score
    wins++;
    updateDisplay();
}

function gameWon () {
    console.log("Running gameWon function");
    document.getElementById("display-gamestatus").innerHTML = "Wow!  You beat the game!";
    setTimeout(function() {
        for(i = 1; i < countriesSaved.length; i++) {
            countriesSavedDisplay += countriesSaved[i];
            countriesSavedDisplay += ", ";
        }
        countriesSavedDisplay += ", and ";
        countriesSavedDisplay += countriesSaved[0];
        alert("You did it, " + userName + "!\n\nYou captured Carmen Sandiego, and recovered what was stolen!");
        alert("The countries of " + countriesSavedDisplay + " send their gratitude!");
        },2000);
    gameFinished = true;
}


function gameLose() {
    console.log("Game loss!");
    gameFinished = true;
    updateDisplay();
}








    // for (i = 0; i < currentWordArray.length; i++) {
    //     currentWordArray[i]
    // }


    // Pick a word
    // currentWordIndex = Math.floor(Math.random() * (wordsArray.length));
    // for (var i = 0; i < wordsArray[currentWordIndex].length; i++) {
    // }

    // Update display