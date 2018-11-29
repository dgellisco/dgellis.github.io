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
  var dataRef = database.ref("/data");
  var dataGSRef = database.ref("/data/gameState");
  var dataVRef = database.ref("/data/visitors");

        
  /// ~~~ LOCAL GAME VARIABLES ~~~ ///
  var players = {
    p1: {
      key: "",
      name: "",
      choice: "",
      wins: "",
      loses: ""
      },
    p2: {
      key: "",
      name: "",
      choice: "",
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
    choice: ""
  };

  var gameState;
  // 0 not enough players joined
  // 1 players joined, game started, no choices
  // 2 one choice
  // 3 both have chosen

  

                /// ************* LOGIC *************  ///

        /// ~~~ LISTENERS ~~~ ///

  // --- LOCAL DOM LISTENERS --- //

// Input Form - Enter player name
function onloadFunction() {
  
}

$(document).on("click", "#name-submit", function(event) {
  event.preventDefault();
  user.name = $("#name-input").val();
  $("#name-input").remove();
  $("#name-submit").remove();
  $("#gamestatus").text("Cool name, '" + user.name + "'!  Let's see if you're playing");
});

// Button - Select RPS
$(document).on("click", ".img-rps-link", function(event) {
  event.preventDefault();
  // Take user choice
  if (user.choice == "") {
    user.choice = $(this).attr("data");

    $("#yourguess").html("You selected " + user.choice);
    if (user.role == "p1") {
      database.ref("/players/p1/choice").set(user.choice);
      // Upload user choice
      gameStateUpdate();
    }
    else if (user.role == "p2") {
      database.ref("/players/p2/choice").set(user.choice);
      // Upload user choice
      gameStateUpdate();
    }
    else {
      console.log("you're a spectator dude");
    }

  }
  else {
    $("#yourguess").html("You selected " + user.choice + ".  You can't change that now!");
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
  database.ref("/players").remove();
  database.ref("/data/gameState").set(0);
});


  // --- FIREBASE LISTENERS --- //

// Add/remove connections
connectedRef.on("value", function(snap) {
  // Adds or removes only THIS connection to the firebase list of connections
  if (snap.val()) {
    // On connect, push that connection's ID to the firebase *connections* list.  Also store connection key locally.
    var con = connectionsRef.push(true);
    user.key = con.key;
    // On disconnect, remove from firebase *connections*
    con.onDisconnect().remove();
    // Set the initial user name based on total number of connections ever
    setInitialUserName();
  }
});

// Remove disconnecters from players list, if they're there
connectionsRef.on("child_removed", function(oldChildSnap) {
  if (oldChildSnap.key == players.p1.key) {
      database.ref("/players/p1").remove();
      $("#gamestatus").text("Player 1 disconnected");
      console.log("Player 1 disconnected");
      players.p1.name = null;
  }
  if (oldChildSnap.key == players.p2.key) {
      database.ref("/players/p2").remove();
      $("#gamestatus").text("Player 2 disconnected");
      console.log("Player 2 disconnected");
      players.p2.name = null;
  }
});

// Initial load, check players and gamestate
database.ref("/players").on("value", function(snapshot) {
  // Set local variables of logged in players, if they exist
  players.p1.name = snapshot.child("p1/name").val();
  players.p1.key = snapshot.child("p1/key").val();
  players.p1.choice = snapshot.child("p1/choice").val();
  players.p2.name = snapshot.child("p2/name").val();
  players.p2.key = snapshot.child("p2/key").val();
  players.p2.choice = snapshot.child("p2/choice").val();
  updatePlayerNames();
});

function updatePlayerNames() {
  console.log("updatePlayerNames");
  console.log("players.p1.name is " + players.p1.name);
  console.log("players.p2.name is " + players.p2.name);
  if (players.p1.name == null && players.p2.name == null){
    $("#p1name").text("~Click 'Join Game' To Play, And Invite A Friend~");
    $("#p2name").text("~Click 'Join Game' To Play, And Invite A Friend~");
  }
  else if (players.p1.name == null && players.p2.name != null) {
    $("#p1name").text("~Invite A Friend~");
    $("#p2name").text(players.p2.name);
  }
  else if (players.p1.name != null && players.p2.name == null) {
    $("#p1name").text(players.p1.name);
    $("#p2name").text("~Invite A Friend~");
  }
  else {
      $("#p1name").text(players.p1.name);
      $("#p2name").text(players.p2.name);
  }
};

dataGSRef.on("value", function(snap) {
  gameState = snap.val();
});

// Display locally the total number of connections, and your connection ID
connectionsRef.on("value", function(snap) {
  $("#connections-total").text(snap.numChildren());
  $("#connections-your-id").text(user.key);
});



                /// ~~~ FUNCTIONS ~~~ ///

//
function canIPlay() {
  console.log("user.name is " + user.name);
  console.log("user.key is " + user.key);
  console.log("user.role is " + user.role);
  console.log("players.p1.name is " + players.p1.name);
  console.log("players.p1.key is " + players.p1.key);
  console.log("players.p2.name is " + players.p2.name);
  console.log("players.p2.key is " + players.p2.key);
  
  console.log();
  console.log();
  console.log();

  if (user.role != "p1" && user.role != "p2") {
    if (players.p1.name == null) {
      joinGame(1);
    }
    else if (players.p2.name == null) {
      joinGame(2);
    }
    else {
      $("#gamestatus").text("There are already two players");
    }
  }
};

// Join game, if a slot is free
function joinGame(arg) {
  console.log("running JoinGame");
  var ref = firebase.database().ref("players");

  // become p1, send local variables to firebase
  if (arg == 1) {
    ref.once("value").then(function(snapshot) {
      if (snapshot.hasChild("p1") != true) {
        console.log("p1 doesnt exist");
        database.ref("players/p1").set({
          key: user.key,
          name: user.name,
        })
        players.p1.name = user.name;
        user.role = "p1";
        console.log("user.name is " + user.name);
        console.log("user.key is " + user.key);
        console.log("user.role is " + user.role);
        console.log("players.p1.name is " + players.p1.name);
        console.log("players.p1.key is " + players.p1.key);
        console.log("players.p2.name is " + players.p2.name);
        console.log("players.p2.key is " + players.p2.key);
      }
      else {
        console.log("local out of sync");
      }
    });
  }
  // become p2, send local variables to firebase
  else if (arg == 2) {
    ref.once("value").then(function(snapshot) {
      if (snapshot.hasChild("p2") != true) {
        console.log("p2 doesnt exist");
        database.ref("players/p2").set({
          key: user.key,
          name: user.name,
        })
        players.p2.name = user.name;
        user.role = "p2";
        console.log("user.name is " + user.name);
        console.log("user.key is " + user.key);
        console.log("user.role is " + user.role);
        console.log("players.p1.name is " + players.p1.name);
        console.log("players.p1.key is " + players.p1.key);
        console.log("players.p2.name is " + players.p2.name);
        console.log("players.p2.key is " + players.p2.key);
      }
      else {
        console.log("local out of sync");
      }
    });
  }
  else {
    console.log("makePlayer() error");
  }
}

function gameStateUpdate() {
  gameState++;
  console.log(gameState);
  database.ref("/data/gameState").set(gameState);
};

function gameStateReset() {
  gameState = 0;
  console.log(gameState);
  database.ref("/data/gameState").set(gameState);
};


// Set the initial user name based on total number of connections ever
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
  });
}


// Game logic
dataGSRef.on("value", function(gameState) {
  console.log("gameState is " + gameState.val());

  switch (gameState.val()) {

    // game hasn't started yet
    case 0:
      console.log("gameState case 0 - players need to join");
      $("#gamestatus").text("Two players need to join the game");
      break;

    // game has started, nobody has chosen
    case 1:
      console.log("gameState case 0 - players need to join");
      $("#gamestatus").text("Both players are chosing");
      break;

    // one player has chosen
    case 2:
      console.log("gameState case 1 - one player has chosen");
        if (players.p1.choice == "" && players.p2.choice == "") {
          console.log("error")
        }
        else if (players.p1.choice == "" && players.p2.choice != "") {
          $("#gamestatus").text("Player 1 is still choosing");
        }
        else if (players.p1.choice != "" && players.p2.choice == "") {
          $("#gamestatus").text("Player 2 is still choosing");
        }
        else {
          console.log("error")
        }
      break;

    // both players have chosen, results screen
    case 3:
      // P1 win scenarios
      if (
      (players.p1.choice == "R" && players.p2.choice == "S") ||
      (players.p1.choice == "P" && players.p2.choice == "R") ||
      (players.p1.choice == "S" && players.p2.choice == "P") ){
          $("#gamestatus").text("Player 1 wins!");
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
          $("#gamestatus").text("Player 2 wins!");
          gameStateReset();
      }
  }
});