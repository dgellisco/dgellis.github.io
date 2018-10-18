var wordsArray = ["AUSTRALIA", "CANADA", "CHINA", "ENGLAND", "FRANCE", "GERMANY", "JAPAN", "SPAIN"];
var chosenWord;
var currentWord;
var guessProgress = [];

var wins = 0;
var guessesMax = 10;
var guessesRemaining;

var guessedLetters = [];
var guessInput;

var gameFinished;


// Function - Reset game
function gameReset() {
    
    document.getElementById("gamestatus").innerHTML = "Guess the word.  It's a country.  Type a letter on your keyboard to get started.";
    // Reset score
    guessesRemaining = guessesMax;
    gameFinished = false;

    // Clear guess fields
    guessProgress = [];
    guessedLetters = [];

    currentWord = wordsArray[0];
    

    console.log(currentWord);
    currentWordArray = currentWord.split("");
    console.log(currentWordArray);
    document.getElementById("revealword").innerHTML = currentWord;
    // document.getElementById("revealword").style.display = "none";

    for (i = 0; i < currentWordArray.length; i++) {
        guessProgress.push("_ ");
    }
    console.log(guessProgress.length);
    console.log(guessProgress);

    document.getElementById("guessprogress").innerHTML = guessProgress;

    // for (i = 0; i < currentWordArray.length; i++) {
    //     currentWordArray[i]
    // }


    // Pick a word
    // currentWordIndex = Math.floor(Math.random() * (wordsArray.length));
    // for (var i = 0; i < wordsArray[currentWordIndex].length; i++) {
    // }

    // Update display
    updateDisplay();
}

// Update display
function updateDisplay() {
    // Update scores
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guessprogress").innerHTML = guessProgress;
    document.getElementById("guessesremaining").innerHTML = guessesRemaining;
    document.getElementById("guessedletters").innerHTML = guessedLetters;
    // Update user guesses - if letter exists in guessedLetters and exists in #currentWord, change display from none to show


    // If currentWord is complete, display win screen

    // If guessesRemaining = 0, display lose screen, change status to gameFinished
}


// User input
document.onkeydown = function(event) {
    // Check if game is won
        // Accept key input
    console.log(gameFinished);
        if(gameFinished) {
            document.getElementById("gamestatus").innerHTML = "Press Enter to start a new game";
            console.log("Press enter to restart");
            if(event.keyCode == 13) {
                console.log("Game Status: Game restarted");
                gameReset();
            }
            else {
                console.log("Press enter to restart");
            }
        }
    
    if(gameFinished != true) {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            guessInput = String.fromCharCode(event.keyCode).toUpperCase();
            
            console.log("guessedInput is " + guessInput);

            checkGuess();
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
        if(currentWordArray.indexOf(guessInput) >= 0) { // If guessInput exists in word array
            document.getElementById("gamestatus").innerHTML = "Nice one!  You correctly guessed the letter '" + guessInput + "'.  You're amazing!";
            document.getElementById("gamestatus").innerHTML = "Wow, the letter '" + guessInput + "' is absolutely right!  Did I put that in there???";
            document.getElementById("gamestatus").innerHTML = "Way to go, pal!  The letter '" + guessInput + "' is part of this word.  Keep up the good work!";
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

        else {
            guessesRemaining--;
            console.log("  Incorrect Guess!");
        }
    }
    else {
        // BONUS: Only one of these should appear randomly each time condition is met.
        document.getElementById("gamestatus").innerHTML = "You already guessed the letter '" + guessInput + "'.  Try again!";
        document.getElementById("gamestatus").innerHTML = "You already guessed the letter '" + guessInput + "'.  Whoops!";
        document.getElementById("gamestatus").innerHTML = "You already guessed the letter '" + guessInput + "'.  Keep trying!";
    }
    checkWinLose();
    updateDisplay();
}

function checkWinLose() {
    if(guessProgress.includes("_ ") == false) {
        gameWin();
    }
    else if(guessesRemaining == 0) {
        gameLose();
    }
    else {
        updateDisplay();
    }
}

function gameWin() {
    console.log("Game won!");
    gameFinished = true;
    wins++;
    updateDisplay();
    // gameDone();
}

function gameLose() {
    console.log("Game loss!");
    gameFinished = true;
    updateDisplay();
    // gameDone();
}

// function gameDone() {
//     document.onkeydown = function(event) {



        // If guessInput character already exists in guessedLetters, message "already guessed"
        // If guessInput character does not already exist in guessedLetters
            // Add to guessedLetters
            // Check if guessInput character exists in currentWord
                // if in currentWord, reveal letter in html #currentword, check if #currentWord has blank letters remaining, if 0 win++, if >0 do nothing
                // If not in currentWord, remove 1 from guessesRemaining
        
    // Update display (which checks for win/lose)


// ????
// document.addEventListener('keypress', function gameInput() {
//     guessInput += guessedLetters.fromCharCode(event.charCode);
//     console.log(guessInput);
//     guessInput = guessInput.replace(/[^A-Za-z]/g, "");
//     console.log(guessInput);
//     if (typeof guessInput !== "undefined") {
//         console.log("~~User input received: Checking for letter in word")
//         console.log("~~Guess is " + guessInput)
//         document.getElementById("guessedLetters").innerHTML = guessInput;
//     }
// })

// // User input, iteration of game
// function gameInput() {
    
// }