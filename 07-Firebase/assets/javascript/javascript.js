                /// ************* VARIABLES *************  ///

  /// ~~~ FIREBASE VARIABLES ~~~ ///

// Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyC1pVb7z1y1iK3ijhWnNYSeA2bSM4NN-3Q",
    authDomain: "project-7-rps.firebaseapp.com",
    databaseURL: "https://project-7-rps.firebaseio.com",
    projectId: "project-7-rps",
    storageBucket: "project-7-rps.appspot.com",
    messagingSenderId: "658462864111"
  };

  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  // References to firebase databases
  var connectionsRef = database.ref("/connections");
  var connectedRef = database.ref(".info/connected");
  var playersRef = database.ref("/players");
  var dataRef = database.ref("/data");
  var dataDCRef = database.ref("/data/disconnectors");
  var dataGSRef = database.ref("/data/gameState");
  var dataVRef = database.ref("/data/visitors");
  var dataRSRef = database.ref("/data/reset");

        
  /// ~~~ LOCAL GAME VARIABLES ~~~ ///
  var players = {
    p1: {
      key: "",
      name: null,
      choice: null,
      status: "",
      score: 0,
      wins: "",
      loses: ""
      },
    p2: {
      key: "",
      name: null,
      choice: null,
      status: "",
      score: 0,
      wins: "",
      loses: ""
      },
  };
  
  var totalConnections;
  var visitorCount;

  var user = {
    key: "",
    name: "",
    role: "",
    choice: null,
    status: null,
    wins: 0,
    loses: 0,
  };

  var gameState = "preGame";
  // preGame    more players needed
  // roundInProgress      both players need to make a choice
  // roundInProgress       one player has chosen, other needs to choose
  // roundComplete         both have chosen, results
  // gameComplete        game finished, score reached
  

                /// ************* LOGIC *************  ///

        /// ~~~ LISTENERS ~~~ ///

  // --- LOCAL DOM LISTENERS --- //

// !!!!!!!!!! need to then update player name, in different function
// Input Form - Enter player name
$(document).on("click", "#name-submit", function(event) {
  event.preventDefault();
  if ($("#name-input").val() != "") {
    user.name = $("#name-input").val();
    console.log("user.name is " + user.name);
    $("#name-input").remove();
    $("#name-submit").remove();
    $("#gamestatus").text("Cool name, '" + user.name + "'!");
    console.log("user.role is " + user.role);
    if (user.role == "p1") {
      database.ref("players/p1").update({
        name: user.name,
      });
    }
    else if (user.role == "p2") {
      database.ref("players/p2").update({
        name: user.name,
      });
    }
    updateDisplay;
  }
  else {
    $("#name-input").attr("placeholder", "Cannot be left blank");
    setTimeout(function(){
      $("#name-input").attr("placeholder", "Enter your name");
    }, 1400);
  }
});

// Button - Select RPS
$(document).on("click", ".img-rps-link", function(event) {
  event.preventDefault();
  if (gameState == "preGame") { // not enough players, deny choice
    if (players.p1.name == null && players.p2.name == null) {
      $("#gamestatus").text("More players need to join first.  Maybe you could join the game?");
    }
    else {
      $("#gamestatus").text("We're just waiting on one more player to join...");
    }
  }
  if (gameState == "roundInProgress") {
    if (user.choice == null) {
      user.choice = $(this).attr("data");
      console.log("gameState is " + gameState + " and user.choice is " + user.choice);
      submitUserChoice();
    }
    else {
      $("#yourguess").text("You've already selected " + user.choice + ".");
    }
  }
});

// Button - Join game
$(document).on("click", "#btn-join", function(event) {
  event.preventDefault();
  canIPlay();
});

// Button - hard reset
$(document).on("click", "#btn-hard-reset", function(event) {
  event.preventDefault();
  database.ref("/connection").remove();
  database.ref("/players").remove();
  database.ref("/data/gameState").remove();
  database.ref("/data/reset").set("reset");
  location.reload();
});

dataRSRef.on("value", function(snap) {
  console.log("snap");
  if (snap.val() != null) {
    database.ref("/data/reset").remove();
    location.reload();
  }
});
    


  // --- FIREBASE LISTENERS --- //

// Add/remove connections
connectedRef.on("value", function(snap) {
  // Adds or removes only THIS connection to the firebase list of connections
  if (snap.val()) {
    // On connect, push that connection's ID to the firebase *connections* list.  Also store connection key locally.
    var con = connectionsRef.push(true);
    // On disconnect, remove from firebase *connections*
    con.onDisconnect().remove();
    user.key = con.key;
    // Set the initial user name based on total number of connections ever
    setInitialUserName();
    updateDisplay();
  }
  var ref = firebase.database().ref("players");
  ref.once("value").then(function(snapshot) {
    if (snapshot.hasChild("p1") && snapshot.hasChild("p2")) {
      players.p1.score = snapshot.child("p1/score").val();
      players.p2.score = snapshot.child("p2/score").val();
      $("#score-p1").text(players.p1.score);
      $("#score-p2").text(players.p2.score);
      updateDisplay();
    }
    else if (snapshot.hasChild("p1")){
      players.p2.score = snapshot.child("p2/score").val();
      $("#score-p2").text(players.p2.score);
      updateDisplay();
    }
    else if (snapshot.hasChild("p2")){
      players.p2.score = snapshot.child("p2/score").val();
      $("#score-p2").text(players.p2.score);
      updateDisplay();
    }
  });
});

// Remove disconnecters from players list, if they're there
connectionsRef.on("child_removed", function(oldChildSnap) {
  if (oldChildSnap.key == players.p1.key) {
      database.ref("/players/p1").remove();
      $("#gamestatus").text("Player 1 disconnected.  Waiting for another player to join.");
      $("#p1name").val("");
      players.p1.name = null;
      updateGameState();
      if (user.role == "") {
        $("#btn-join").show();
      }
  }
  if (oldChildSnap.key == players.p2.key) {
      database.ref("/players/p2").remove();
      $("#gamestatus").text("Player 2 disconnected.  Waiting for another player to join.");
      $("#p2name").val("");
      players.p2.name = null;
      updateGameState();
      if (user.role == "") {
        $("#btn-join").show();
      }
  }
  updateDisplay();
});


playersRef.on("child_added", function(oldChildSnap) {
  console.log("players added");
  if (user.role == "p1" || user.role == "p2") {
    $("#gamestatus").text("A new player has joined!  Game on!");
  }
  console.log(oldChildSnap);
});


// Initial load, check players and gamestate
database.ref("/players").on("value", function(snapshot) {
  // Set local variables of logged in players, if they exist
  players.p1.name = snapshot.child("p1/name").val();
  players.p1.key = snapshot.child("p1/key").val();
  players.p1.choice = snapshot.child("p1/choice").val();
  players.p1.status = snapshot.child("p1/status").val();
  players.p2.name = snapshot.child("p2/name").val();
  players.p2.key = snapshot.child("p2/key").val();
  players.p2.choice = snapshot.child("p2/choice").val();
  players.p2.status = snapshot.child("p2/status").val();
  console.log("user.role is " + user.role);
  setTimeout(function(){
    if (user.role == "") {
      $("#btn-join").show();
      console.log("1");
    }
    else {
      $("#btn-join").hide();
      console.log("2");
    }
  }, 200);
  updateDisplay();
});

// Auto-update gameState from Firebase
dataGSRef.on("value", function(snapState) {
  console.log("gameState is " + snapState.val());
  gameState = snapState.val();
  if (gameState == "roundComplete") {
    evaluateRPS();
  }
  updateGameState();
});

// Display locally the total number of connections, and your connection ID
connectionsRef.once("value", function(snap) {
  $("#connections-total").text(snap.numChildren());
  $("#connections-your-id").html(user.key);
});



                /// ~~~ FUNCTIONS ~~~ ///

function onloadFunction() {
}

// See if there's a free player slot
function canIPlay() {
  if (user.role != "p1" && user.role != "p2") {
    if (players.p1.name == null) {
      joinGame(1);
    }
    else if (players.p2.name == null) {
      joinGame(2);
    }
    else {
      $("#gamestatus").text("There are already two players - wait for someone to leave.");
    }
  }
};

// If there's a free slot, join it.
function joinGame(arg) {
  console.log("***running JoinGame()***");
  var ref = firebase.database().ref("players");

  // Become p1, send local variables to firebase
  if (arg == 1) {
    ref.once("value").then(function(snapshot) {
      if (snapshot.hasChild("p1") != true) {
        console.log("P1 doesn't exist - joining game as P1");
        // set firebase variables
        database.ref("players/p1").set({
          key: user.key,
          name: user.name,
          // status: "has joined as Player 1!",
        })
        // set local variables
        players.p1.name = user.name;
        players.p1.key = user.key;
        // players.p1.status = "has joined as Player 1!";
        user.role = "p1";
        updateDisplay();
        updateGameState();
      }
      else {
        console.log("!!ERROR!! joinGame() failed");
      }
    });
  }
  // or become p2, send local variables to firebase
  else if (arg == 2) {
    ref.once("value").then(function(snapshot) {
      if (snapshot.hasChild("p2") != true) {
        console.log("P2 doesn't exist - joining game as P2");
        // set firebase variables
        database.ref("players/p2").set({
          key: user.key,
          name: user.name,
          // status: "has joined as Player 2!",
        })
        // set local variables
        players.p2.name = user.name;
        players.p2.key = user.key;
        // players.p2.status = "has joined as Player 2!";
        user.role = "p2";
        updateDisplay();
        updateGameState();
      }
      else {
        console.log("local out of sync");
      }
    });
  }
  else {
    console.log("!!ERROR!! joinGame() failed");
  }
  console.log("***joinGame() complete***");
}

// Set the initial user name based on total number of connections ever, increment visitor count
function setInitialUserName() {
  dataVRef.once("value").then(function(snap) {
    visitorCount = snap.val();
    visitorCount = visitorCount + 1;
    if (user.name == "") {
      console.log(visitorCount);
      user.name = "Visitor " + visitorCount;
      console.log(visitorCount);
      $("#gamestatus").html("Welcome to RPS, " + user.name + "!  Want a better name?  Type it in this box!");
      console.log("user.name is " + user.name);
    }
    dataVRef.transaction(function(visitors) {
      return (visitors) + 1;
    });
    $("#your-name").text(user.name);  
  });
}

function submitUserChoice() {
  console.log("**starting submitUserChoice()**");
  console.log("user.choice is " + user.choice);
  console.log("user.role is " + user.role);

  $("#gamestatus").text("You selected " + user.choice + ".");
    // Update choice in Firebase
  if (user.role == "p1") {
    database.ref("/players/p1/choice").set(user.choice);
  }
  else if (user.role == "p2") {
    database.ref("/players/p2/choice").set(user.choice);
  }
  else {
    $("#gamestatus").text("Looks like you're a spectator.  Better wait your turn!");
  }

  if (user.role == "p1") {
    if (user.choice == "R") { $("#p1-choice-img").attr("src","assets/images/rps-r-sm.png") }
    else if (user.choice == "P") { $("#p1-choice-img").attr("src","assets/images/rps-p-sm.png") }
    else if (user.choice == "S") { $("#p1-choice-img").attr("src","assets/images/rps-s-sm.png") }
    else { $("#p1-choice-img").attr("src","assets/images/rps-blank-sm.png") }
  }
  else if (user.role == "p2") {
    if (user.choice == "R") { $("#p2-choice-img").attr("src","assets/images/rps-r-sm.png") }
    else if (user.choice == "P") { $("#p2-choice-img").attr("src","assets/images/rps-p-sm.png") }
    else if (user.choice == "S") { $("#p2-choice-img").attr("src","assets/images/rps-s-sm.png") }
    else { $("#p2-choice-img").attr("src","assets/images/rps-blank-sm.png") }
  }
  else {
    console.log("!!ERROR!!");
  }
  
  console.log("**finishing submitUserChoice()**");
  setTimeout(function(){
    updateGameState();
    updateDisplay();  
  }, 1400);
}

if (user.name != "") {
  $("#name-input").hide();
  $("#name-submit").hide();
}
else {
  $("#name-input").show();
  $("#name-submit").show();
}

// Update gameState locally after local change made, upload to Firebase
function updateGameState() {
  var z = "";
  if (players.p1.name == null || players.p2.name == null) {
    // game hasn't started yet
    z = "preGame";
  }
  else if (players.p1.choice == null || players.p2.choice == null) {
    z = "roundInProgress";
    $("#gamestatus").text("Game is in progress.  People are chosing their weapon.");
  }
  else if (players.p1.choice != null && players.p2.choice != null) {
    z = "roundComplete"
  }
  else {
    
  }
  database.ref("/data/gameState").set(z);
  console.log("gameState is " + gameState);
  updateDisplay();
}

function updatePlayerStatus() {
  database.ref("/players/").set(gameState);
}

// Update display based on local user names and scores
function updateDisplay(){
  // Update display of local name and score
  console.log(user.name);
  $("#score-p1").text(players.p1.score);
  $("#score-p2").text(players.p2.score);
  $("#p1status").text(players.p1.status);
  $("#p2status").text(players.p2.status);

  // Update display of player names in vs section
  if (players.p1.name == null && players.p2.name == null){
    $("#p1status").text("Waiting For Player To Join");
    $("#p2status").text("Waiting For Player To Join");
  }
  else if (players.p1.name == null && players.p2.name != null) {
    $("#p1status").text("Waiting For Player To Join");
    $(".p2name").text(players.p2.name);
    $("#p2status").text("is ready to play!");
  }
  else if (players.p1.name != null && players.p2.name == null) {
    $(".p1name").text(players.p1.name);
    $("#p1status").text("is ready to play!");
    $("#p2status").text("Waiting For Player To Join");
  }
  else {
      $(".p1name").text(players.p1.name);
      $(".p2name").text(players.p2.name);
  }
  
}

// !!!!!!!!!!!! CORE LOGIC - needs work
function evaluateRPS(){
  console.log("***starting evaluateRPS***");
  console.log("p1 chose" + players.p1.choice);
  console.log("p2 chose" + players.p2.choice);
  console.log(gameState);

  if (user.role == "p1") {
    if (players.p2.choice == "R") { $("#p2-choice-img").attr("src","assets/images/rps-r-sm.png") }
    else if (players.p2.choice == "P") { $("#p2-choice-img").attr("src","assets/images/rps-p-sm.png") }
    else if (players.p2.choice == "S") { $("#p2-choice-img").attr("src","assets/images/rps-s-sm.png") }
    else { $("#p2-choice-img").attr("src","assets/images/rps-blank-sm.png") }
  }
  else if (user.role == "p2") {
    if (players.p1.choice == "R") { $("#p1-choice-img").attr("src","assets/images/rps-r-sm.png") }
    else if (players.p1.choice == "P") { $("#p1-choice-img").attr("src","assets/images/rps-p-sm.png") }
    else if (players.p1.choice == "S") { $("#p1-choice-img").attr("src","assets/images/rps-s-sm.png") }
    else { $("#p1-choice-img").attr("src","assets/images/rps-blank-sm.png") }
  }
  else {
    console.log("!!ERROR!!");
  }

  if (
  (players.p1.choice == "R" && players.p2.choice == "S") ||
  (players.p1.choice == "P" && players.p2.choice == "R") ||
  (players.p1.choice == "S" && players.p2.choice == "P") ){
      $("#gamestatus").text(players.p1.name + " wins!");
      players.p1.score++;
      database.ref("/players/p1/score").set(players.p1.score);    
  }
  // Tie scenarios
  else if (
    (players.p1.choice == "R" && players.p2.choice == "R") ||
    (players.p1.choice == "P" && players.p2.choice == "P") ||
    (players.p1.choice == "S" && players.p2.choice == "S") ){
      $("#gamestatus").text("It's a tie!");
  }
  // Else P1 lose
  else {
      $("#gamestatus").text(players.p2.name + " wins!");
      players.p2.score++;
      database.ref("/players/p2/score").set(players.p2.score);
  }

  setTimeout(function(){
    resetRound();
  }, 1600);
  
  console.log("***ending evaluateRPS***");
}

function resetRound(){
  $("#gamestatus").text("A new round is starting!");
  // update firebase
  database.ref("/players/p1/choice").remove();
  database.ref("/players/p2/choice").remove();
  setTimeout(function(){
    user.choice = null;
    // update gameState
    updateGameState();
    // remove previous guess pics
    console.log("endgame");
    $("#p1-choice-img").attr("src","assets/images/rps-blank-sm.png");
    $("#p2-choice-img").attr("src","assets/images/rps-blank-sm.png");
    $("#gamestatus").text("A new round has started!  Time for these contenders to pick their weapons!");
    // remove previous choices    
  }, 1600);
}
