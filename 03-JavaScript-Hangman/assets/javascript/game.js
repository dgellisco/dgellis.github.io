var wordsArray = [
    "AUSTRALIA",
    "CANADA",
    "EGYPT",
    "FRANCE"
];

var hintsAustralia = [
    "Sometimes, national icons are not monuments or artifacts, but native animals.  Wherever she was going, she said it had some really cool and strange ones!",
    "When she boarded the plane, it was freezing and the dead of winter - which is why I thought it was very strange she was wearing boardshorts and a tanktop.",
    "She called it the land down under.  I don't know what that meant, but I'm pretty sure it wasn't a Stranger Things reference...",
    "<NO MORE HINTS>"
];

var hintsCanada = [
    "I noticed Carmen was practicing her French as she boarded the plane, but I'm certain she wasn't going to France...",
    "Carmen loved pancakes, and a recent raid on her house uncovered cupboards full of empty maple syrup bottles.  Maybe she was planning a sweet heist up north.",
    "Residents in the northern areas of this country leave their cars unlocked to offer an escape for pedestrians who might encounter Polar Bears.",
    "<NO MORE HINTS>"
];

var hintsEgypt = [
    "Carmen said she was going somewhere very sandy, but I noticed she didn't pack a beach towel...",
    "I think Carmen said she wanted to see her Mummy...  and that her Mummy was over 2,000 years old! Strange lady.",
    "Carmen's going to Egypt.  She's in Egypt, dummy.",
    "<NO MORE HINTS>"
];

var hintsFrance = [
    "Carmen said she hadn't visited since they stopped banning potatoes back in 1772.  She was pretty excited for a potato salad with her wine and cheese",
    "Carmen loved art.  She said she was going to pick up a new painting to decorate her house - said she'd get it for a steal from a place called 'the Louvre'.",
    "Interesting fact about this place - it used to be on the same time zone as England, but after being invaded in 1940 during WW2, Germany forced this country conform with Berlin time.  This change has never been reversed.",
    "<NO MORE HINTS>"
];

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

var currentHint = "";
var currentHints = "";

var statusDisplay;
var gameFinished;
var levelFinished;


function pageLoad() {
    // gameInstructions();
    setTimeout(function() {

        // Capture date
        let startDate = new Date().toLocaleDateString()

        // Capture time
        function startTime(){
            var today = new Date();
            var todayString;

            today.setDate(today.getDate() + 20);

            todayString = ('0' + today.getDate()).slice(-2) + '/'
             + ('0' + (today.getMonth()+1)).slice(-2) + '/'
             + today.getFullYear();

            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds(); 
            return [ h, m, s ].join(':');
        }

        // Game introduction
        alert("***POLICE ALERT " + startDate + " " + startTime() + "***\n\nNotorious thief 'Carmen Sandiego' has just stolen our beloved Declaration Of Independence!\n\nShe's fled the scene, and was last seen boarding a plane at the International Airport.\n\nAll police, please respond!");
        userName = prompt("You!\n\nDetective!\n\nWhat's your name?\n");
        if (userName == "") {
            userName = "Rookie Detective";
            }
        document.getElementById("username").innerHTML = userName;
        alert("Alright, " + userName + ", I'm putting you on this case.\n\nThis will be a challenging assignment - you'll want all your skill, talent, determination, and keys of your keyboard to complete this one.");
        alert("Reports suggest that Carmen might be planning to steal another national icon, but we have no idea which country she'll strike next.\n\nUse your detective skills to interview witnesses, uncover clues, and find her - before she strikes again!\n\nBut... where in the world is Carmen Sandiego?");    
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
        document.getElementById("display-gamestatus").innerHTML = "Using your keyboard, guess the letters of the country that Carmen plans to strike next!";
        // clear temp fields
        guessProgress = [];
        guessedLetters = [];
        guessesWrong = 0;
        guessesRight = 0;
        currentHint = "";
        currentHints = "";
        document.getElementById("currenthints").innerHTML = "";
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


function updateHints(){
    currentHints += currentHint;
    console.log("currentHint = " + currentHint + " and currentHints = " + currentHints);
    currentHints += "<br><br>";
    document.getElementById("currenthints").innerHTML = currentHints;
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

            if(currentWord == "AUSTRALIA" && guessesWrong <= hintsAustralia.length) {
                currentHint = hintsAustralia[guessesWrong - 1];
                updateHints();
            }
            
            else if(currentWord == "CANADA" && guessesWrong <= hintsCanada.length) {
                currentHint = hintsCanada[guessesWrong - 1];
                updateHints();
            }
            
            else if(currentWord == "EGYPT" && guessesWrong <= hintsEgypt.length) {
                currentHint = hintsEgypt[guessesWrong - 1];
                updateHints();
            }

            else if(currentWord == "FRANCE" && guessesWrong <= hintsFrance.length) {
                currentHint = hintsFrance[guessesWrong - 1];
                updateHints();
            }
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
    document.getElementById("display-gamestatus").innerHTML = "You win!  You guessed it correctly in '" + guessesRight + "' guesses with only '" + guessesWrong + "' mistakes.  Press Enter to continue.";
    console.log("Game won!");
    levelFinished = true;
    console.log("wordsArray length is " + wordsArray.length);
    // remove correct guess from array
    if(wordsArray.length == 1) {
        countriesSaved += wordsArray.indexOf(currentWord);
        alert("Congratulations!  You not only foiled her plans to steal a national icon, but you were so fast that you caught her red-handed!\n\nShe's off to jail, and you're a hero" + userName + "!");
        gameWon()
    }
    else {
        alert("Well done!  You thwarted her plan before she could steal a national icon!\n\nBut it looks like she's escaped capture for now.\n\nWhere could she be?");
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