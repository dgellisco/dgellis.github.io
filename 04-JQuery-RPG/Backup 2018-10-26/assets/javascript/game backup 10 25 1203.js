var WarriorsObj = [
    {
        id: "01",
        name: "George W. Bush",
        hp: 100,
        ap: 5,
        cp: 10,
        phrases: [
            "I want to be president.  Being president was FUN.",
            "Hello?",
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
            "For the Mother Land!",
        ]
    },
];

var attacksPerformed = 0;

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
$(document).ready(function() {
    newGame();
    $(".warriors").css("cursor", "pointer");

    $(".warriors").click(function() {
    if (chooseWarrior == true) {
    
        console.log("Console: You clicked on a warrior");
        newWarrior();
        chooseWarrior = false;
        chooseEnemy = true;
    }
    });


// if (chooseEnemy == true) {
//     $(".warriors").click(function() {
//         newEnemy();
//         chooseEnemy = false;
//         gameStarted = true;
//     });
// }

// else if (gameStarted == true) {
//     $(".warriors").click(function() {
//         newRound();
//     });
// }

// else if (gameFinished == true) {
//     alert("Game finished");
// }

// else {
//     alert("If/Else statement end reached");
// }

});

// function updateWarriors() {
//     $("#warriors-available").append('\
//     <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
//         <div class="card-header">\
//             <span id="warrior' + WarriorsObj[index].id + '-name">' 
//             + WarriorsObj[index].name + '</span>\
//         </div>\
//         <div class="card-body">\
//             <img src="assets/images/hero' + WarriorsObj[index].id + '.jpg" alt="Candidate" id="warrior' + WarriorsObj[index].id + '-pic">\
//         </div>\
//         <div class="card-footer text-muted">\
//             HP: ' + WarriorsObj[index].hp + '\
//             <span id="warrior' + WarriorsObj[index].id + '-hp"></span>\
//         </div>\
//     </span>\
//     ');
// }

function newGame() {
    // POPULATE CHARACTERS AT START
    $(WarriorsObj).each(function(index) {
        console.log("Console: Populating html with characters");

        // IGNORE SECRET CHARACTER
        if(index === WarriorsObj.length - 1) {
            return;
        }

        warriorID = WarriorsObj[index].id;
        
        $("#warriors-available").append('\
        <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
            <div class="card-header">\
                <span id="warrior' + WarriorsObj[index].id + '-name">' 
                + WarriorsObj[index].name + '</span>\
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
}
    
function newWarrior() {
    // CHOOSE YOUR WARRIOR
    console.log("heroIndex is " + heroIndex);
    $(WarriorsObj).each(function(index) {
        
        
        heroIndex = $(this).attr("id");
        heroIndex = heroIndex.replace("warrior", "");
        console.log("Hero ID = " + heroIndex);

        $(WarriorsObj).each(function(index) {
            
            if(index === WarriorsObj.length - 1) {
                return;
            }           
            
            $("#warriors-available").empty();

            console.log("heroIndex is " + heroIndex);
            if(heroIndex == WarriorsObj[index].id) {
                console.log("heroIndex is " + heroIndex);
                $("#warriors-attacker").html('\
                <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
                    <div class="card-header">\
                        <span id="warrior' + WarriorsObj[index].id + '-name">' 
                        + WarriorsObj[index].name + '</span>\
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

            if(heroIndex !== WarriorsObj[index].id) {
                $("#warriors-enemies").append('\
                <span class="warriors card text-center bg-light" id="warrior' + WarriorsObj[index].id + '">\
                    <div class="card-header">\
                        <span id="warrior' + WarriorsObj[index].id + '-name">' 
                        + WarriorsObj[index].name + '</span>\
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
    });
    console.log("newWarrior() executed succesfully")
}



    // <!-- newLevel() -->
// newLevel()
        // <!-- select warrior[i] -->
        // <!-- other warriors become defenders[-] -->
        

            // <!-- newEnemy() -->
                // <!-- pick enemy, move to bottom -->
                // Putin not available

                // <!-- attackEnemy() -->
                    // <!-- on button click, attack -->
                    $("#btn-attack").on("click", function() {    // dollar sign, selector, event, function                       
                      });
                    // <!-- warrior[i] attacks defender for AP*TotalAttacks -->
                    // <!-- update defender HP -->
                        // <!-- if defenders[i] has remaining HP -->
                            // <!-- attack back for CP -->
                            // <!-- update attacker HP -->
                            // <!-- if attacker hp >0 -->
                                // <!-- allow attacking again -->
                            // <!-- if attack hp <=0 -->
                                // <!-- lose screen -->
                        // <!-- if defender[i] does not have remaining HP, do not attack back -->
                            // <!-- remove defender     -->
                            // if trump, add in Putin
                            // <!-- if enemies remaining   -->
                                // <!-- allow chosing of new enemy -->
                            // <!-- if no enemies remaining, go to win screen -->