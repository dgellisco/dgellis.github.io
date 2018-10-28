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

var chooseWarrior = true;  // initial warrior select
var chooseEnemy = false;    // initial enemy select

var heroIndex = "";
var enemyIndex = "";

var roundStarted = false;   // round started, can start battle
var roundFinished = false;   // round finished, must pick new warrior unless gameFinished
var gameFinished = false;    // game finished, win screen


// Status display
var statusDiv = document.getElementById("status-display");
var statusDisplay;


// Click to start game
$(document).on("click", "#btn-start", function() {
    newGame();
});

function recreateContainerNoBtns() {
    $("#enemies-available").empty();
    $("#warriors-available").empty();
    $("#warrior-attacker").empty();
    $("#warrior-defender").empty();

    $(".container-game").empty();
    $('<div class="row container-stage" id="battle-row"><div class="col"></div><div class="col-sm-4" id="warrior-attacker"></div><div class="col-sm-4" id="warrior-defender"></div><div class="col"></div></div>\
    <div class="row container-stage" id="warriors-enemies"></div>\
    <div class="row container-stage" id="warriors-available"></div>\
    <div class="row container-stage card text-center card-text-status">\
    <div class="card-body">\
        <p id="game-status"></p>\
    </div>\
    </div>').appendTo(".container-game");
}

function recreateContainerWithBtns() {
    $("#enemies-available").empty();
    $("#warriors-available").empty();
    $("#warrior-attacker").empty();
    $("#warrior-defender").empty();

    $(".container-game").empty();
    $('<div class="row container-stage" id="battle-row"><div class="col"></div><div class="col-sm-4" id="warrior-attacker"></div><div class="col-sm-4" id="warrior-defender"></div><div class="col"></div></div>\
    <div class="row container-stage" id="warriors-enemies"></div>\
    <div class="row container-stage" id="warriors-available"></div>\
    <div class="row container-stage card text-center card-text-status">\
    <div class="card-body">\
        <p id="game-status"></p>\
        <button type="button" class="btn btn-primary container-stage container-battle" id="btn-attack">Attack</button>\
        <button type="button" class="btn btn-primary container-stage container-battle" id="btn-new-rnd">Choose Your Next Opponent</button>\
        <button type="button" class="btn btn-primary container-stage container-battle" id="btn-final-rnd">Fight The Secret Challenger!</button>\
    </div>\
    </div>').appendTo(".container-game");
}
 

// NEWGAME() POPULATES ALL CHARACTERS, NO WARRIOR CHOSEN YET, CANNOT BE REUSED
function newGame() {

    // RESET VARIABLES (NOT VALID YET, UNTIL RESET FUNCTION MADE)
    heroIndex = "";
    enemyIndex = "";
    $("#warriors-available").empty();
    $("#warrior-attacker").empty();
    $("#warrior-defender").empty();

    // CLEAR CONTAINER AND RECREATE WITH 'WARRIORS-AVAILABLE' CONTAINER
    recreateContainerNoBtns();
    
    // POPULATE AVAILABLE PLAYERS
    $(WarriorsObj).each(function (index) {
        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + index + '">    <div class="card-header">      <span id="warrior' + index + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + index + '-hp"></span>    </div></span>';
        
        // DON'T GENERATE PUTIN
        if (index == WarriorsObj.length - 1) {
            return;
        }

        // ADD ALL OTHER PLAYERS
        $("#warriors-available").append(cardTemplate);
    });

    // UPDATE GAME STATUS
    $("#game-status").html("Select your hero");
    console.log("~~~~ newGame() executed succesfully");
    $('.warriors').css('cursor', 'pointer');
}

// CLICK LISTENER TO SELECT INITIAL ENEMY AND WARRIOR
$(document).on("click", ".warriors", function() {
    if (chooseEnemy == true || roundFinished == true) {  // Only runs at start or end of round
        enemyIndex = $(this).attr("id");
        enemyIndex = enemyIndex.replace("warrior", "");
        if (heroIndex !== enemyIndex) {
            newEnemy();
        }
    }
    else if (chooseWarrior == true) {  // Only runs once at start to select warrior
        heroIndex = $(this).attr("id");
        heroIndex = heroIndex.replace("warrior", "");
        newWarrior();
    }
});

// PICK HERO - DO NOT REUSE
function newWarrior() {
    console.log("---- newWarrior() started");

    recreateContainerNoBtns();

    console.log("heroIndex is " + heroIndex);

    $(WarriorsObj).each(function (index) {
        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + index + '">    <div class="card-header">      <span id="warrior' + index + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + index + '-hp"></span>    </div></span>';
    
        console.log("heroIndex is " + heroIndex);
        console.log("index is " + index + " and name is " + WarriorsObj[index].name);


        if (index == WarriorsObj.length - 1) {
            
        }
        else if (heroIndex == index) {
            // $("#warrior-attacker").html(cardTemplate);
        }
        else if (heroIndex !== index) {
            $("#warriors-enemies").append(cardTemplate);
        }
        if (WarriorsObj.length == 2 && heroIndex !== index){
            $("#warriors-enemies").append(cardTemplate);
        }
    });

    chooseWarrior = false;
    chooseEnemy = true;

    // UPDATE GAME STATUS
    $("#game-status").html("Select your opponent.");
    console.log("~~~~ newWarrior() executed succesfully");
    $('.warriors').css('cursor', 'pointer');
}


// ENEMY CHOSEN - REUSE
function newEnemy() {
    console.log("--- newWarrior() started");

    chooseEnemy = false;
    roundStarted = true;
    roundFinished = false;

    console.log("WarriorsObj.length is " + WarriorsObj.length);
    console.log("heroIndex is " + heroIndex + " hero name " + WarriorsObj[heroIndex].name + " hero ID " + WarriorsObj[heroIndex].id);

    // Build battle screen
    recreateContainerWithBtns();

    $("#btn-attack").show();
    $("#btn-new-rnd").hide();
    $("#btn-final-rnd").hide();

    $(WarriorsObj).each(function (index) {
        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + index + '">    <div class="card-header">      <span id="warrior' + index + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + index + '-hp"></span>    </div></span>';
        
        if (index === WarriorsObj.length - 1) {
            if (WarriorsObj.length == 2) {
                $("#warrior-defender").html(cardTemplate);
                $("#warrior" + index).show();
            }
            return;
        }
        
        else if (index == heroIndex) {
            $("#warrior-attacker").html(cardTemplate);
        }

        else if (index == enemyIndex) {
            $("#warrior-defender").html(cardTemplate);
        }
        // if (WarriorsObj.length == 2 && heroIndex !== index){
        //     $("#warrior-defender").append(cardTemplate);
        // }
       
    });
    
    console.log("~~~~ newWarrior() executed succesfully");
}


// ATTACK BUTTON LISTENER
$(document).on("click", "#btn-attack", function() {
    newBattle();
});


function newBattle(){

    console.log("heroIndex is " + heroIndex + " and hero is " + WarriorsObj[heroIndex].name);
    console.log("enemyIndex is " + enemyIndex + " and enemy is " + WarriorsObj[enemyIndex].name);

    heroDamage = WarriorsObj[heroIndex].ap * attackMultiplier;

    attackMultiplier++;

    // IF ENEMY STILL ALIVE
    // if (roundStarted == true && roundFinished == false){
        // if (WarriorsObj[enemyIndex].hp >= 0) {
            // YOU ATTACK
            WarriorsObj[enemyIndex].hp = WarriorsObj[enemyIndex].hp - heroDamage;
            $("#game-status").html("You attack for " + heroDamage + " damage");
            
            // IF THEY DIE
            if (WarriorsObj[enemyIndex].hp <= 0) {
                
                $("#battle-row").empty();

                $(WarriorsObj).each(function (index) {
                    if (index == heroIndex){
                        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + index + '">    <div class="card-header">      <span id="warrior' + index + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + index + '-hp"></span>    </div></span>';
                        $("#battle-row").html(cardTemplate);
                    }
                });

                // setTimeout(function(){
                    $("#game-status").append("<br><br>Opponent vanquished - nice one!");
                // }, 400);

                                
                if (heroIndex > enemyIndex) {
                    heroIndex = heroIndex - 1;
                    // enemyIndex = "";
                    console.log("heroIndex is " + heroIndex);
                }

                WarriorsObj.splice($.inArray(WarriorsObj[enemyIndex], WarriorsObj), 1);
                console.log("heroIndex is " + heroIndex);



                
                // $("#warrior-defender").empty();
                // $("#warrior-attacker").empty();
                if (WarriorsObj.length > 2) {
                    // setTimeout(function(){
                        $("#game-status").append("<br><br>Get ready for another round!");
                        $("#game-status").append('<br><br>');
                    // }, 800);
                    $("#btn-attack").hide();
                    $("#btn-new-rnd").show();
                    $(document).on("click", "#btn-new-rnd", function() {
                        newWarrior();
                        roundStarted = false;
                        roundFinished = true;
                    });
                }
                else if (WarriorsObj.length == 2) {
                    // setTimeout(function(){
                        $("#game-status").append("<br><br>A secret challenger has entered the arena!");
                        $("#game-status").append('<br><br>');
                    // }, 800);
                    $("#btn-attack").hide();
                    $("#btn-new-rnd").show();
                    $("#btn-new-rnd").html("Reveal The Secret Final Opponent");
                    $(document).on("click", "#btn-new-rnd", function() {
                        newWarrior();
                        roundStarted = false;
                        roundFinished = true;
                    });
                }
                else {
                // setTimeout(function(){
                    $("#game-status").append("<br><br>Congratulations - you win!");
                    // }, 800);
                    $("#btn-attack").hide();
                    $("#btn-new-rnd").show();
                    $("#btn-new-rnd").html("Click to play again");
                    $("#game-status").append('<br><br>');
                    $(document).on("click", "#btn-new-rnd", function() {
                        location.reload();
                    });
                }

                // $("#warriors-enemies").empty();
                // $(WarriorsObj).each(function (index) {  
                //     var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + index + '">    <div class="card-header">      <span id="warrior' + index + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + index + '-hp"></span>    </div></span>';
                //     if (index == WarriorsObj.length - 1){
                //         return;
                //     }
                //     else if (index !== heroIndex) {
                //         $("#warriors-enemies").append(cardTemplate);
                //     }
                //     else {

                //     }
                // });
            }

            // THEY COUNTER-ATTACK
            else {
            $("#damage-taken-indicator").html("Opponent hit back for " + WarriorsObj[enemyIndex].cp + " damage");
            WarriorsObj[heroIndex].hp = WarriorsObj[heroIndex].hp - WarriorsObj[enemyIndex].cp;
            console.log("enemyDamage is " + WarriorsObj[enemyIndex].cp + " / your HP is " + WarriorsObj[heroIndex].hp);
            // setTimeout(function(){
                $("#game-status").append("<br><br>Opponent attacked back for " + WarriorsObj[enemyIndex].cp + " damage");
            // }, 800);

                // IF YOU DIE FROM COUNTER-ATTACK
                if (WarriorsObj[heroIndex].hp <= 0) {
                    $("#warrior-attacker").empty();
                    
                    roundStarted = false;
                    roundFinished = true;
                    
                    // setTimeout(function(){
                        $("#game-status").append("<br><br>You were defeated - you lose!");
                        $("#btn-attack").hide();
                        $("#btn-new-rnd").show();
                        $("#btn-new-rnd").html("Click to play again");
                        $("#game-status").append('<br><br>');
                        $(document).on("click", "#btn-new-rnd", function() {
                            location.reload();
                        });
                    // }, 1200);
                }
                else {
                    // setTimeout(function(){
                        $("#game-status").append('<br><br>Click "Attack" to continue');
                        $("#game-status").append('<br><br>');
                    // }, 1200);
                    
                }

                // UPDATE BOTH CARDS
                $(WarriorsObj).each(function (index) {
                    if (index == heroIndex){
                        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + index + '">    <div class="card-header">      <span id="warrior' + index + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + index + '-hp"></span>    </div></span>';
                        $("#warrior-attacker").html(cardTemplate);
                    }
                    else if (index == enemyIndex){
                        var cardTemplate = '<span class="warriors card text-center bg-light" id="warrior' + index + '">    <div class="card-header">      <span id="warrior' + index + '-name">' +    WarriorsObj[index].name + '</span>    </div>    <div class="card-body">        ' + WarriorsObj[index].img +   '</div>    <div class="card-footer text-muted">        HP: ' + WarriorsObj[index].hp + '        <span id="warrior' + index + '-hp"></span>    </div></span>';
                        $("#warrior-defender").html(cardTemplate);
                    }
                });
    
            }
        

        // }


        // Update attacker and defender cards
        // if (roundFinished == false) {

        // }
    // }
}

// function gameWon() {
//     setTimeout(function(){
//         alert("Congratulations - you were UNDEFEATED!");
//     }, 1200);
// }

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


