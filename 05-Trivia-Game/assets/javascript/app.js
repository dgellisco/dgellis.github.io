// Countdown timer

var timerCount = 15;
var currentQuestion = 0;
var score = 0;
var answer = false;
var pickedAnswer = false;

var countdownTimer;

var questionsObj = [
    {
        id: "Step Brothers (2008)",
        hint: "That's so funny the first time I heard that, I laughed so hard I fell off my dinosaur.",
        potentialAnswers: [
            "Zoolander (2001)",
            "Step Brothers (2008)",
            "The Big Lebowski (1998)",
            "Jurassic Park (1993)",
        ],
        correctAnswer: 1,
        gif: "<img src='assets/images/stepbrothers.gif'>",
    },
    {
        id: "The Big Lebowski (1998)",
        hint: "This aggression will not stand, man.",
        potentialAnswers: [
            "Step Brothers (2008)",
            "The Equalizer (2008)",
            "Superbad (2007)",
            "The Big Lebowski (1998)",
        ],
        correctAnswer: 3,
        gif: "<img src='assets/images/thebiglebowski.gif'>",
    },
    {
        id: "Anchorman: The Legend Of Ron Burgundy (2004)",
        hint: "I'm kind of a big deal. People know me.",
        potentialAnswers: [
            "Anchorman 2: The Legend Continues (2013)",
            "Zoolander (2001)",
            "Anchorman: The Legend Of Ron Burgundy (2004)",
            "Dumb & Dumber (1994)",
        ],
        correctAnswer: 2,
        gif: "<img src='assets/images/anchorman.gif'>",
    },
    {
        id: "Dumb & Dumber (1994)",
        hint: "We got no food, we got no jobs... our PETS' HEADS ARE FALLING OFF!",
        potentialAnswers: [
            "Get A Job (2016)",
            "Dumb & Dumber (1994)",
            "The Greatest Story Ever Told (1965)",
            "The Internship (2013)",
        ],
        correctAnswer: 1,
        gif: "<img src='assets/images/dumbanddumber.gif'>",
    },
];


// new game, reset global variables
function newGame() {
    $("#countdown-timer-text").text("Time remaining: ");
    $("#hint-quotes").html('"<span id="hint"></span>"');
    clearTimeout(countdownTimer);
    currentQuestion = 0;
    timerCount = 15;
    score = 0;
    answer = false;
    pickedAnswer = false;
    newRound();
}


// initial setup and every time a new question is asked
function newRound() {

    $("#hint").empty();
    $("#question-options").empty();
    $("#gif-space").empty();
    $("#game-status").empty();
    $("#round-answer").empty();

    pickedAnswer = false;
    startTimer();

    $("#hint").text(questionsObj[currentQuestion].hint);
    $(questionsObj[currentQuestion].potentialAnswers).each(function(index) {
        $("#question-options").append("<button class='btn btn-light potential-answers' id='potential-answer" + index + "'>" + questionsObj[currentQuestion].potentialAnswers[index] + "</button>");
        $("#question-options").append("<br>");
    });

}


// on click, see if answer is correct
$(document).on("click", ".potential-answers", function() {

    if (pickedAnswer == false) {

        chosenAnswer = $(this).attr("id");
        chosenAnswer = chosenAnswer.replace("potential-answer", "");

        if (chosenAnswer == questionsObj[currentQuestion].correctAnswer) {
            answer = true;
        }
        else {
            answer = false;
        }

        roundEnd();

        pickedAnswer = true;

    }

        
});


// timer counting down, if 0 then go to roundend screen
function startTimer() {

    // reset timer
    timerCount = 15;
    $("#countdown-timer").text(timerCount);
    
    // count timer down
    countdownTimer = setInterval(function() {
        timerCount--;
        $("#countdown-timer").text(timerCount);
        if (timerCount == 0) {
            clearTimeout(countdownTimer);
            roundEnd();
        }
    }, 1000);
}

// round end
function roundEnd() {
    clearTimeout(countdownTimer);

    $("#question-options").empty();

    $("#gif-space").html(questionsObj[currentQuestion].gif);
    $("#round-answer").html("The answer was " + questionsObj[currentQuestion].id + ".");

    // if correct
    if (timerCount > 0 && answer) {
        $("#game-status").html("Correct!");
        score++;

    // else if question wrong
    } else if (timerCount > 0 && answer == false) {
        $("#game-status").html("Wrong!");
    
    // else if time ran out
    } else if (timerCount == 0) {
        $("#game-status").html("You ran out of time!");
    
    } else {
        $("#game-status").html("End of else if else statement");
    }

    setTimeout(function() {
        console.log("currentQuestion is " + currentQuestion)
        if (questionsObj.length == currentQuestion + 1) {
            $("#game-status").html("Game finished!");
            scoreScreen();
        }
        else {
            currentQuestion++;
            newRound();
        }
    }, 5000);
    

}


function scoreScreen() {
    $("#hint").empty();
    $("#question-options").empty();
    $("#gif-space").empty();
    $("#hint-quotes").empty();
    $("#game-status").empty();
    $("#round-answer").empty();

    if (score == 1) {
        $("#game-status").html("You got " + score + " answer right out of " + questionsObj.length + " questions.\nYou're ");
    }
    else {
        $("#game-status").html("You got " + score + " answers right out of " + questionsObj.length + " questions.\nYou're ");
    }
    
    if (score > 3) {
        $("#game-status").append("an absolute champion!");
        $("#gif-space").html("<img src='assets/images/win_good.gif'>");
    }
    else if (score <= 3 && score > 1) {
        $("#game-status").append("pretty cool!");
        $("#gif-space").html("<img src='assets/images/win_ok.gif'>");
    }
    else {
        $("#game-status").append("very bad at this game!  But that's ok, I guess.");
        $("#gif-space").html("<img src='assets/images/win_bad.gif'>");
    }

    $("#question-options").append("<button class='btn btn-light' id='new-game-btn'>Start A New Game</button>");

    newGameTimer();
    $("#countdown-timer-text").text("New Game Starts In ");

    setTimeout(function() {
        newGame();
    }, 11000);

}

function newGameTimer() {

    // reset timer
    timerCount = 10;
    $("#countdown-timer").text(timerCount);
    
    // count timer down
    countdownTimer = setInterval(function() {
        timerCount--;
        $("#countdown-timer").text(timerCount);
        if (timerCount == 0) {
            clearTimeout(countdownTimer);
            newGame();
        }
    }, 1000);
}


$(document).on("click", "#new-game-btn", function() {

    newGame();
        
});