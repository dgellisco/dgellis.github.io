// DONT FORGET TO REVEAL SECRET CHARACTER IF DONALD 04 IS DEFEATED


var WarriorsObj = [{
        id: "01",
        name: "George W. Bush",
        hp: 100,
        ap: 5,
        cp: 10,
        phrases: [
            "I want to be president.  Being president was FUN.",
            "phrase2",
            "phrase3",
        ],
    },
    {
        id: "02",
        name: "Hillary Clinton",
        hp: 120,
        ap: 6,
        cp: 15,
        phrases: [
            "phrase1",
            "phrase2",
            "phrase3",
        ]
    },
    {
        id: "03",
        name: "Barack Obama",
        hp: 140,
        ap: 8,
        cp: 20,
        phrases: [
            "phrase1",
            "phrase2",
            "phrase3",
        ]
    },
    {
        id: "04",
        name: "Donald Trump",
        hp: 180,
        ap: 10,
        cp: 25,
        phrases: [
            "This is going to be HUGE!",
            "By God, I will make America great again!",
        ]
    },
    {
        id: "05",
        name: "Vladimir Putin",
        hp: 50,
        ap: 4,
        cp: 10,
        phrases: [
            "For Mother Russia!",
            "You'll never stop me",
            "Don't make me take my shirt off",
        ]
    },
];

var attackMultiplier = 0;

var chooseWarrior = true;
var heroIndex = "";
var chooseEnemy = false;
var enemyIndex = "";
var gameStarted = false;

var warriorID = "";

var enemyDestroyed = false;
var heroDestroyed = false;
var gameFinished = false;

var statusDiv = document.getElementById("status-display");
var statusDisplay;


// Start
$(document).ready(function () {
    newGame();
    $(".warriors").css("cursor", "pointer");

    // Depending on game state/stage, clicking on a picture (i.e. anything in "warriors" class) will run a different function.
    // Done in reverse so as to not run twice.
    $(".warriors").click(function () {

        if (gameStarted == true) {
            console.log("Console: You are about to attack an enemy!");
            newAttack();
        }

        if (chooseEnemy == true) {
            enemyIndex = $(this).attr("id");
            enemyIndex = enemyIndex.replace("warrior", "");
            console.log("Enemy ID = " + enemyIndex);

            console.log("Console: You clicked on an enemy!");
            newEnemy();
        }

        else if (chooseWarrior == true) {
            heroIndex = $(this).attr("id");
            heroIndex = heroIndex.replace("warrior", "");
            console.log("Hero ID = " + heroIndex);

            console.log("Console: You clicked on a warrior");
            newWarrior();
            
        }

        else {
            alert("End of if/else click statement");
        }

    });

});


// FUNCTION JUNCTION FUNCTION JUNCTION FUNCTION JUNCTION FUNCTION JUNCTION FUNCTION JUNCTION
// FUNCTION JUNCTION FUNCTION JUNCTION FUNCTION JUNCTION FUNCTION JUNCTION FUNCTION JUNCTION

// Setup Step 1: Populate characters at start
function newGame() {
    $(WarriorsObj).each(function (index) {
        console.log("Console: Populating html with characters");
        warriorID = WarriorsObj[index].id;

        // HIDE PUTIN... Get him working behind the scenes ;).  This is important because we need to create the element here and now.
        // We can then use it later.
        if (index === WarriorsObj.length - 1) {
            $("#warriors-available").append('\
            <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
                <div class="card-header">\
                    <span id="warrior' + WarriorsObj[index].id + '-name">' +
                WarriorsObj[index].name + '</span>\
                </div>\
                <div class="card-body">\
                    <img src="assets/images/hero' + WarriorsObj[index].id + '.jpg" alt="Candidate" id="warrior' + WarriorsObj[index].id + '-pic">\
                </div>\
                <div class="card-footer text-muted">\
                    HP: ' + WarriorsObj[index].hp + '\
                    <span id="warrior' + WarriorsObj[index].id + '-hp"></span>\
                </div>\
            </span>\
            ');
            console.log("Vladimir ID is " + warriorID);
            $("#warrior" + warriorID).hide();
            return;
        }

        // Add all other candidates
        $("#warriors-available").append('\
        <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
            <div class="card-header">\
                <span id="warrior' + WarriorsObj[index].id + '-name">' +
            WarriorsObj[index].name + '</span>\
            </div>\
            <div class="card-body">\
                <img src="assets/images/hero' + WarriorsObj[index].id + '.jpg" alt="Candidate" id="warrior' + WarriorsObj[index].id + '-pic">\
            </div>\
            <div class="card-footer text-muted">\
                HP: ' + WarriorsObj[index].hp + '\
                <span id="warrior' + WarriorsObj[index].id + '-hp"></span>\
            </div>\
        </span>\
        ');

    });
    $("#game-status").html("Select a candidate.");
    console.log("newGame() executed succesfully");
    console.log("chooseWarrior is " + chooseWarrior);
    console.log("chooseEnemy is " + chooseEnemy);
    console.log("gameStarted is " + gameStarted);
}


// Setup Step 2: Pick your character
function newWarrior() {
    console.log("newWarrior function just started");

    $(WarriorsObj).each(function (index) {

        if (index === WarriorsObj.length - 1) {
            return;
        }

        $("#warriors-available").empty();

        console.log("heroIndex is " + heroIndex);
        if (heroIndex == WarriorsObj[index].id) {
            $("#warriors-attacker").html('\
                <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
                    <div class="card-header">\
                        <span id="warrior' + WarriorsObj[index].id + '-name">' +
                WarriorsObj[index].name + '</span>\
                    </div>\
                    <div class="card-body">\
                        <img src="assets/images/hero' + WarriorsObj[index].id + '.jpg" alt="Candidate" id="warrior' + WarriorsObj[index].id + '-pic">\
                    </div>\
                    <div class="card-footer text-muted">\
                        HP: ' + WarriorsObj[index].hp + '\
                        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>\
                    </div>\
                </span>\
                ');
        }

        if (heroIndex !== WarriorsObj[index].id) {
            $("#warriors-enemies").append('\
                <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
                    <div class="card-header">\
                        <span id="warrior' + WarriorsObj[index].id + '-name">' +
                WarriorsObj[index].name + '</span>\
                    </div>\
                    <div class="card-body">\
                        <img src="assets/images/hero' + WarriorsObj[index].id + '.jpg" alt="Candidate" id="warrior' + WarriorsObj[index].id + '-pic">\
                    </div>\
                    <div class="card-footer text-muted">\
                        HP: ' + WarriorsObj[index].hp + '\
                        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>\
                    </div>\
                </span>\
                ');
        }

    });
    console.log("newWarrior() executed succesfully");
    chooseWarrior = false;
    chooseEnemy = true;
    console.log("chooseWarrior is " + chooseWarrior);
    console.log("chooseEnemy is " + chooseEnemy);
    console.log("gameStarted is " + gameStarted);
}


// Setup Step 3: Pick your enemy
function newEnemy() {

    console.log("newEnemy function just started");
    console.log("enemyIndex is " + enemyIndex);

    $("#warriors-enemies").empty();

    $(WarriorsObj).each(function (index) {

        if (index === WarriorsObj.length - 1) {
            return;
        }

        console.log("enemyIndex is " + enemyIndex);
        if (enemyIndex == WarriorsObj[index].id) {
            $("#warriors-defender").html('\
                <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
                    <div class="card-header">\
                        <span id="warrior' + WarriorsObj[index].id + '-name">' +
                WarriorsObj[index].name + '</span>\
                    </div>\
                    <div class="card-body">\
                        <img src="assets/images/hero' + WarriorsObj[index].id + '.jpg" alt="Candidate" id="warrior' + WarriorsObj[index].id + '-pic">\
                    </div>\
                    <div class="card-footer text-muted">\
                        HP: ' + WarriorsObj[index].hp + '\
                        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>\
                    </div>\
                </span>\
                ');
        }

        if (enemyIndex !== WarriorsObj[index].id) {
            $("#warriors-enemies").append('\
                <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
                    <div class="card-header">\
                        <span id="warrior' + WarriorsObj[index].id + '-name">' +
                WarriorsObj[index].name + '</span>\
                    </div>\
                    <div class="card-body">\
                        <img src="assets/images/hero' + WarriorsObj[index].id + '.jpg" alt="Candidate" id="warrior' + WarriorsObj[index].id + '-pic">\
                    </div>\
                    <div class="card-footer text-muted">\
                        HP: ' + WarriorsObj[index].hp + '\
                        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>\
                    </div>\
                </span>\
                ');
        }

    });
    console.log("newEnemy() executed succesfully")
    chooseEnemy = false;
    gameStarted = true;
    console.log("chooseWarrior is " + chooseWarrior);
    console.log("chooseEnemy is " + chooseEnemy);
    console.log("gameStarted is " + gameStarted);
}


// Game On: Attack enemy on click
// You attack.  Enemy HP = HP - (AP * attackMultiplier)
    // If enemy HP > 0, enemy attacks back.  Hero HP = HP - CP.  Once done,
        // if Hero HP > 0, you can attack again.
        // if Hero HP <= 0, lose screen
    // If enemy HP <= 0, enemy defeated (hide).
        // enemiesRemaining--
        // If enemy is trump and defeated, gets replaced with Putin, start over
        // if enemiesRemaining >1, you select a new enemy (chooseEnemy = true)
        // if enemiesRemaining == 0, you win