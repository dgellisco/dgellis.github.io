// DONT FORGET TO REVEAL SECRET CHARACTER IF DONALD 04 IS DEFEATED


var WarriorsObj = [{
        id: "0",
        name: "George W. Bush",
        hp: 100,
        ap: 5,
        cp: 10,
        phrases: [
            "I want to be president.  Being president was FUN.",
            "phrase2",
            "phrase3",
        ],
        img: '<img src="assets/images/hero0.jpg" alt="Candidate" id="warrior0-pic">'
    },
    {
        id: "1",
        name: "Hillary Clinton",
        hp: 120,
        ap: 6,
        cp: 15,
        phrases: [
            "phrase1",
            "phrase2",
            "phrase3",
        ],
        img: '<img src="assets/images/hero1.jpg" alt="Candidate" id="warrior1-pic">'
    },
    {
        id: "2",
        name: "Barack Obama",
        hp: 140,
        ap: 8,
        cp: 20,
        phrases: [
            "phrase1",
            "phrase2",
            "phrase3",
        ],
        img: '<img src="assets/images/hero2.jpg" alt="Candidate" id="warrior2-pic">'
    },
    {
        id: "3",
        name: "Donald Trump",
        hp: 180,
        ap: 10,
        cp: 25,
        phrases: [
            "This is going to be HUGE!",
            "By God, I will make America great again!",
        ],
        img: '<img src="assets/images/hero3.jpg" alt="Candidate" id="warrior3-pic">'
    },
    {
        id: "4",
        name: "Vladimir Putin",
        hp: 50,
        ap: 4,
        cp: 10,
        phrases: [
            "For Mother Russia!",
            "You'll never stop me",
            "Don't make me take my shirt off",
        ],
        img: '<img src="assets/images/hero4.jpg" alt="Candidate" id="warrior4-pic">'
    },
];

var attackMultiplier = 1;

var chooseWarrior = true;
var heroIndex = "";
var chooseEnemy = false;
var enemyIndex = "";
var roundStarted = false;
var roundFinished = false;

var enemyDestroyed = false;
var heroDestroyed = false;
var gameFinished = false;

var statusDiv = document.getElementById("status-display");
var statusDisplay;


// INITIALIZE GAME
newGame();
$(".warriors").css("cursor", "pointer");


// PLAYER CLICK LISTENER
$(document).on("click", ".warriors", function() {

    if (chooseEnemy == true || roundFinished == true) {
        enemyIndex = $(this).attr("id");
        enemyIndex = enemyIndex.replace("warrior", "");
        if (heroIndex !== enemyIndex) {
            newEnemy();
        }
    }

    else if (chooseWarrior == true) {
        heroIndex = $(this).attr("id");
        heroIndex = heroIndex.replace("warrior", "");
        newWarrior();
    }

});

// ATTACK BUTTON LISTENER BUTTON
$(document).on("click", "#btn-attack", function() {
    newBattle();
});



// ~~ FUNCTION JUNCTION . CREATION STATION ~~  FUNCTION JUNCTION . CREATION STATION ~~ FUNCTION JUNCTION . CREATION STATION ~~ 
// ~~ FUNCTION JUNCTION . CREATION STATION ~~  FUNCTION JUNCTION . CREATION STATION ~~ FUNCTION JUNCTION . CREATION STATION ~~ 

// Setup Step 1: Populate characters at start
function newGame() {

    // RESET VARIABLES
    heroIndex = "";
    enemyIndex = "";

    $("#warriors-available").empty();
    $("#warriors-attacker").empty();
    $("#warriors-defender").empty();

    $("#btn-attack-div").html('<button id="btn-attack">Attack</button><br><br><br><br><p class="damage-indicator" id="damage-given-indicator"></p><p class="damage-indicator" id="damage-taken-indicator"></p>');
    $("#btn-attack-div").css("display", "none");
    
    // POPULATE AVAILABLE PLAYERS
    $(WarriorsObj).each(function (index) {
        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">    <div class="card-header">      <span id="warrior' + WarriorsObj[index].id + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>    </div></span>';

        // HIDE PUTIN.
        if (index == WarriorsObj.length - 1) {
            console.log(WarriorsObj[index]);
            $("#warriors-available").append(cardTemplate);
            $("#warrior" + WarriorsObj[index].id).hide();
            return;
        }

        // ADD ALL OTHER PLAYERS
        $("#warriors-available").append(cardTemplate);

    });

    // UPDATE GAME STATUS
    $("#game-status").html("Select a candidate.");
    console.log("chooseWarrior = " + chooseWarrior + " / chooseEnemy = " + chooseEnemy + " / roundStarted = " + roundStarted);
    console.log("~~~~ newGame() executed succesfully");
}


// function hidePutin(index) {
//     var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">    <div class="card-header">      <span id="warrior' + WarriorsObj[index].id + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>    </div></span>';
//     $("#warriors-available").append(cardTemplate);
//     $("#warrior" + WarriorsObj[index] - 1).hide();
// }

// Setup Step 2: Pick your character
function newWarrior() {
    console.log("---- newWarrior() started");

    $("#warriors-available").empty();

    $(WarriorsObj).each(function (index) {
        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">    <div class="card-header">      <span id="warrior' + WarriorsObj[index].id + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>    </div></span>';
    
        if (index === WarriorsObj.length - 1) {
            return;
        }

        

        // if (enemyIndex == WarriorsObj[index].id) {
        //     console.log(WarriorsObj[index].name + " is the defender.  Skipped iteration.")
        // }
        if (heroIndex == WarriorsObj[index].id) {
            $("#warriors-attacker").html(cardTemplate);
        }
        else if (heroIndex !== WarriorsObj[index].id) {
            $("#warriors-enemies").append(cardTemplate);
        }
        else {
            
        }

    });
    chooseWarrior = false;
    chooseEnemy = true;
    console.log("chooseWarrior = " + chooseWarrior + " / chooseEnemy = " + chooseEnemy + " / roundStarted = " + roundStarted);
    console.log("~~~~ newWarrior() executed succesfully");
}


// Setup Step 3: Pick your enemy
function newEnemy() {

    roundStarted = true;
    roundFinished = false;

    $("#warriors-defender").css("opacity","1");

    console.log("----- newEnemy() just started");
    console.log("WarriorsObj.length is " + WarriorsObj.length);

    $("#warriors-enemies").empty();
    $("#warriors-defender").empty();

    console.log("heroIndex is " + heroIndex);
    console.log("hero name " + WarriorsObj[heroIndex].name);
    console.log("hero ID " + WarriorsObj[heroIndex].id);

    $(WarriorsObj).each(function (index) {
        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">    <div class="card-header">      <span id="warrior' + WarriorsObj[index].id + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>    </div></span>';
        
        if (index === WarriorsObj.length - 1) {
            return;
        }
        
        else if (index == heroIndex) {
            $("#warriors-attacker").html(cardTemplate);
        }

        else if (index == enemyIndex) {
            $("#warriors-defender").html(cardTemplate);
        }

        else if (index !== enemyIndex || index !== heroIndex) {
            $("#warriors-enemies").append(cardTemplate);
        }
        
    });

    chooseEnemy = false;
    roundStarted = true;

    $("#btn-attack-div").css("display", "inline-block");
    
    console.log("chooseWarrior = " + chooseWarrior + " / chooseEnemy = " + chooseEnemy + " / roundStarted = " + roundStarted);
    console.log("~~~~ roundStarted is " + roundStarted);

}


function newBattle(){

    heroDamage = WarriorsObj[heroIndex].ap * attackMultiplier;

    attackMultiplier++;

    console.log("enemy is " + WarriorsObj[enemyIndex].name + " and array index is " + WarriorsObj[enemyIndex]);
    console.log("hero is " + WarriorsObj[heroIndex].name + " and array index is " + WarriorsObj[heroIndex]);

    // IF ENEMY STILL ALIVE
    if (roundStarted == true && roundFinished == false){
        if (WarriorsObj[enemyIndex].hp >= 0) {
            // YOU ATTACK
            $("#damage-given-indicator").html("Attacked for " + heroDamage + " damage");
            WarriorsObj[enemyIndex].hp = WarriorsObj[enemyIndex].hp - heroDamage;
            console.log("heroDamage is " + heroDamage + " / enemy HP is " + WarriorsObj[enemyIndex].hp);

            // IF THEY DIE
            if (WarriorsObj[enemyIndex].hp <= 0) {
                setTimeout(function(){
                    alert("Opponent defeated.  Nice one!");
                }, 800);

                WarriorsObj.splice($.inArray(WarriorsObj[enemyIndex], WarriorsObj), 1);
                heroIndex = heroIndex - 1;

                console.log("enemy is " + WarriorsObj[enemyIndex].name + " and array index is " + enemyIndex + " and id is " + WarriorsObj[enemyIndex].id);
                console.log("hero is " + WarriorsObj[heroIndex].name + " and array index is " + heroIndex + " and id is " + WarriorsObj[heroIndex].id);

                chooseEnemy = true;
                roundStarted = false;
                roundFinished = true;
                
                $("#warriors-defender").empty();
                if (heroIndex > - 1) {
                    setTimeout(function(){
                        alert("Choose a new enemy");
                    }, 800);
                }
                else {
                    gameWon();
                }

                $("#warriors-enemies").empty();
                $(WarriorsObj).each(function (index) {  
                    var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + index + '">    <div class="card-header">      <span id="warrior' + index + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + index + '-hp"></span>    </div></span>';
                    if (index == WarriorsObj.length - 1){
                        return;
                    }
                    else if (index !== heroIndex) {
                        $("#warriors-enemies").append(cardTemplate);
                    }
                    else {

                    }
                });
            }

            // THEY COUNTER-ATTACK
            else {
            $("#damage-taken-indicator").html("Opponent hit back for " + WarriorsObj[enemyIndex].cp + " damage");
            WarriorsObj[heroIndex].hp = WarriorsObj[heroIndex].hp - WarriorsObj[enemyIndex].cp;
            console.log("enemyDamage is " + WarriorsObj[enemyIndex].cp + " / your HP is " + WarriorsObj[heroIndex].hp);

                // IF YOU DIE FROM COUNTER-ATTACK
                if (WarriorsObj[heroIndex].hp <= 0) {
                    $("#warriors-attacker").empty();
                    roundFinished = true;
                    setTimeout(function(){
                        alert("You lose!");
                        location.reload();
                    }, 800);
                }
            }
        }


        // Update attacker and defender cards
        if (roundFinished == false) {
            $(WarriorsObj).each(function (index) {
                if (index == heroIndex){
                    var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">    <div class="card-header">      <span id="warrior' + WarriorsObj[index].id + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>    </div></span>';
                    $("#warriors-attacker").html(cardTemplate);
                }
                else if (index == enemyIndex){
                    var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">    <div class="card-header">      <span id="warrior' + WarriorsObj[index].id + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + WarriorsObj[index].id + '-hp"></span>    </div></span>';
                    $("#warriors-defender").html(cardTemplate);
                }
            });
        }
    }
}

function gameWon() {
    alert("You just won!");
    setTimeout(function(){
        alert("Choose a new enemy");
    }, 800);
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