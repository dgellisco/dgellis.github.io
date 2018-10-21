var WordsHintsObj = [{
        id: "AUSTRALIA",
        hints: [
            "While boarding the plane, Carmen was talking about spending Christmas in a swimsuit on the beach.  Honestly, she must have gone mad - Christmas is freezing!",
            "Sometimes, national icons are not monuments or artifacts, but native animals.  Wherever she was going, she was intent to take one of our... ahem, one of this country's national treasures home with her.",
            "She called it the land down under.  I don't know what that meant, but I'm pretty sure it wasn't a Stranger Things reference...",
        ]
    },
    {
        id: "CANADA",
        hints: [
            "I noticed Carmen was practicing her French as she boarded the plane, but I'm certain she wasn't going to France...",
            "Carmen loved pancakes, and a recent raid on her house uncovered cupboards full of empty maple syrup bottles.  Maybe she was planning a sweet heist up North.",
            "She told me that residents in the northern areas of this country leave their cars unlocked to offer an escape for pedestrians who might encounter Polar Bears.  Wow!  Sounds like the locals are friendly!",
        ]
    },
    {
        id: "EGYPT",
        hints: [
            "Carmen said she was going somewhere very sandy, but I noticed she didn't pack a beach towel...",
            "I think Carmen said she was going to pick up her Mummy...  and that her Mummy was over 2,000 years old! Strange lady.",
            "Carmen's going to Egypt.  She's in Egypt, dummy.",
        ]
    },
    {
        id: "FRANCE",
        hints: [
            "Carmen loved art.  She said she was going to pick up a new painting to decorate her house - said she'd get it for a steal from some place called 'the Louvre'.",
            "Carmen said she hadn't visited since they unbanned potatoes back in 1772.  Well, maybe that's not true, but it's an interesting fact!",
            "Oui.  You can do this.",
        ]
    },
];

var currentWord;
var guessProgress = [];
var userName;

var wins = 0;
var guessesRemaining;
var guessesWrong;
var guessesRight;
var guessesMade = 0;

var guessedLetters = [];
var guessInput;

var currentWordIndex;
var currentHint = "";
var currentHints = "";
var hintsThisRound;
var hintsRemaining;

var statusDisplay;

var gameFinished;
var levelFinished;


// ** INSTRUCTIONS FOR GAME, FADE IN DISPLAY
function pageLoad() {
    setTimeout(function () {
        let startDate = new Date().toLocaleDateString()
        alert("***POLICE ALERT " + startDate + " ***\n\nNotorious thief 'Carmen Sandiego' has just stolen the Declaration Of Independence!\n\nShe's fled the scene, and was last seen boarding a plane at the International Airport.\n\nAll police, please respond!");
        userName = prompt("You!\n\nDetective!\n\nWhat's your name?\n");
        if (userName == "") {
            userName = "Rookie Detective";
        }
        document.getElementById("username").innerHTML = userName;
        alert("Alright, " + userName + ", I'm putting you on this case.\n\nThis will be a challenging assignment - you'll need all of your skill, determination, and a physical keyboard with functioning alphabetical keys.");
        alert("Reports suggest that Carmen might be planning to steal more national treasures from other countries around the globe.\n\n" + userName + ", use your detective skills to interview witnesses, unravel clues, and find out where she's going - before she strikes again!\n\nI wonder... where in the world is Carmen Sandiego?");
    }, 1000);
    setTimeout(function () {
        document.documentElement.style.opacity = "1";
    }, 1000);
    newGame();
}

// ** INITIALIZE NEW GAME
function newGame() {
    guessesRemaining = 10;
    levelFinished = false;
    gameFinished = false;
    newLevel();
}

// ** NEW LEVEL
function newLevel() {
    document.getElementById("display-gamestatus").innerHTML = "Using your keyboard, guess the letters of the country that Carmen plans to strike next!";
    // ** Pick random word
    currentWord = WordsHintsObj[Math.floor(Math.random() * WordsHintsObj.length)].id;
    currentWordArray = currentWord.split("");
    // Set currentWordIndex for hints (also utilised in addHint)
    currentWordIndex = WordsHintsObj.findIndex(function(i) {
        return i.id == currentWord;
    });
    // ** Reset values
    levelFinished = false;
    guessProgress = [];
    guessedLetters = [];
    // ????? I can't seem to assign multiple variables the same value.  I tried using...
    // ????? guessesWrong, guessesRight, guessesMade, hintsThisRound = 0;
    // ????? It broke my code.
    guessesWrong = 0;
    guessesRight = 0;
    guessesMade = 0;
    hintsThisRound = 0;
    currentHint = "";
    currentHints = "";
    hintsRemaining = WordsHintsObj[currentWordIndex].hints.length;
    console.log("hints remaining: " + hintsRemaining);
    document.getElementById("display-currenthints").innerHTML = "";
    // ** Reset guessProgress to underscores of word length
    for (i = 0; i < currentWordArray.length; i++) {
        guessProgress.push("_ ");
    }
    updateDisplay();
    setTimeout (function () {
        addHint();
    }, 4000);
    updateDisplay();
}

// ** UPDATE DISPLAY
function updateDisplay() {
    // ** Update guess progress
    var guessProgressDisplay = guessProgress.join(" ");
    document.getElementById("guessprogress").innerHTML = guessProgressDisplay;
    // ** Update guessed letters
    guessedLetters.sort();
    var guessedLettersDisplay = guessedLetters.join(" ");
    document.getElementById("guessedletters").innerHTML = guessedLettersDisplay;
    // ** Update score
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("guessesremaining").innerHTML = guessesRemaining;
    document.getElementById("guesseswrong").innerHTML = guessesWrong;
    // ** Update hints button
    if (hintsRemaining >= 1 && guessesWrong >= hintsThisRound) {
        document.getElementById("hintbutton").className = "btn btn-primary";
        document.getElementById("hintbutton-text").style.fontStyle = "normal";
        document.getElementById("hintbutton-text").innerHTML = "Eyewitness reports available";
    } else if (hintsRemaining == 0) {
        document.getElementById("hintbutton").className = "btn btn-secondary";
        document.getElementById("hintbutton-text").style.fontStyle = "italic";
        document.getElementById("hintbutton-text").innerHTML = "No more eyewitness reports available.  You'll have to guess!";
    } else {
        document.getElementById("hintbutton").className = "btn btn-secondary";
        document.getElementById("hintbutton-text").style.fontStyle = "italic";
        document.getElementById("hintbutton-text").innerHTML = "No more eyewitness reports available at this time.";
    }
}

// ** ADD HINT
function addHint() {
    if (hintsRemaining >= 1 && guessesWrong + 1 >= hintsThisRound) {
        // ** Added dynamic functionality.  Number of hints per country can vary and the program stil works.
        currentHint = WordsHintsObj[currentWordIndex].hints[hintsThisRound];
        hintsThisRound++;
        hintsRemaining--;
        currentHints += currentHint;
        currentHints += "<br><br>";
        document.getElementById("display-currenthints").innerHTML = currentHints;
    }
    updateDisplay();
}

// ** CAPTURE USER INPUT
document.onkeyup = function (event) {
    if (gameFinished != true && levelFinished != true) {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                guessInput = String.fromCharCode(event.keyCode).toUpperCase();
                checkGuess();
            }        
    }
};

// ** CHECK GUESS
function checkGuess() {
    if (guessedLetters.indexOf(guessInput) == -1) { // check if guess not already in guessed array
        guessedLetters.push(guessInput);
        if (currentWordArray.indexOf(guessInput) >= 0) { // correct guess
            var statusDisplayArray = [
                "Nice one!  You correctly guessed the letter '" + guessInput + "'.  You're amazing!",
                "Wow, the letter '" + guessInput + "' is absolutely right!  Well done!",
                "Way to go, pal!  The letter '" + guessInput + "' is part of this word.  Keep up the good work!"
            ];
            statusDisplay = statusDisplayArray[Math.floor(Math.random() * statusDisplayArray.length)];
            document.getElementById("display-gamestatus").innerHTML = statusDisplay;
            guessesRight++;
            for (i = 0; i < currentWord.length; i++) { // check each index of word array for guess, put it in displayed guess if it's there
                if (currentWordArray[i] == guessInput) {
                    guessProgress[i] = guessInput;
                }
            }
        }
        // wrong letter
        else {
            guessesRemaining--;
            guessesWrong++;
            guessesMade = guessesWrong + guessesRight;
            var statusDisplayArray = [
                "This country does not contain the letter '" + guessInput + "'.  Try again.",
                "Nice try, but the letter '" + guessInput + "' is incorrect.  Please try a different letter.",
                "Oh no!  The letter '" + guessInput + "' is not in the name of this country.  Quick, try again!  We have to find Carmen!"
            ];
            statusDisplay = statusDisplayArray[Math.floor(Math.random() * statusDisplayArray.length)];
            document.getElementById("display-gamestatus").innerHTML = statusDisplay;
        }
    }
    // wrong letter
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
}

function checkWinLose() {
    if (guessProgress.includes("_ ") == false) {
        levelWon();
    } else if (guessesRemaining == 0) {
        gameLose();
    } else {
        updateDisplay();
    }
}

function levelWon() {
    // update display-gamestatus
    document.getElementById("display-gamestatus").innerHTML = "You win!  You guessed it correctly in '" + guessesRight + "' guesses with only '" + guessesWrong + "' mistakes.  Press Enter to continue.";
    levelFinished = true;
    // remove correct guess from array
    if (WordsHintsObj.length == 1) {
        gameWon()
    } else {
        console.log("currentWord " + currentWord);
        console.log("currentWordIndex " + currentWordIndex);
        // var deleteIndex = ;
        // console.log("deleteIndex is " + deleteIndex);
        WordsHintsObj.splice(currentWordIndex, 1);
        setTimeout(function () {
            var statusDisplayArray = [
                "Well done!  You thwarted her plans before she could steal another national icon!\n\nBut Carmen escaped capture and fled the country.\n\nThe case goes cold, until...",
                "Nice one!  You stopped her in her tracks.  She's escaped the country, but you prevented her stealing another artifact.\n\nTake a rest, you deserve it!",
                "Excellent investigation skills, " + userName + "!  You will no doubt be recommended for a promotion for this.\n\nStay on this case for now.  Carmen may try to strike again",
            ];
            statusDisplay = statusDisplayArray[Math.floor(Math.random() * statusDisplayArray.length)];
            alert(statusDisplay);
            alert("You pick up some fresh leads!  Find Carmen Sandiego!");
            newGame();
        }, 60);
    }
    wins++;
    updateDisplay();
    }

function gameWon() {
    document.getElementById("display-gamestatus").innerHTML = "Wow!  You beat the game!";
    gameFinished = true;
    setTimeout(function () {
        alert("Congratulations!  You not only foiled her plans to steal another national icon, but you were so fast that you caught her red-handed!\n\nShe's off to jail, and you're a hero, " + userName + "!");
        alert("You recover all that was stolen, and the countries you saved send their gratitude!  Well done, " + userName + "!");
        alert("Click OK to start a new game!");
        newGame();
    }, 60);
}

function gameLose() {
    gameFinished = true;
    setTimeout(function () {
        alert("Oh no!  You ran out of guesses, and Carmen got away with the crime!");
        alert("Click OK to start a new game!");
        newGame();
    }, 60);
}