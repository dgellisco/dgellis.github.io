// How can I run the search again from the switch statement.  Async.  So that you don't have to start a new search every time.

const env = require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const moment = require("moment");
const spotifyAPI = require("node-spotify-api");

var spotify = new spotifyAPI(keys.spotify);

var searchTerm = "";
var username = "";
var response2 = {};

initialWelcome();

function initialWelcome(){
    inquirer
    .prompt([
        {
            type: "input",
            name: "username",
            message: "What is your name?"
        }
    ]).then(function(response)
        {
            username = response.username;
            if (username == "" || username == undefined || username == null) {
                username = "user";
            }
            startSearch();
        }
    );
}

function startSearch() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "searchtype",
            message: "Please choose your search type",
            choices: [
                "concert-this",
                "spotify-this-song",
                "movie-this",
                "do-what-it-says"
            ]
        },
        {
            type: "input",
            name: "searchterm",
            message: "Enter your search terms"
        }
    ]).then(function(response)
        {
            fs.appendFile('log.txt', "\n\n====================================\nNew search by " + username + "\n====================================\n   Search Type: " +
            response.searchtype + "\n   Search Term: " + response.searchterm + "\n   Search Timestamp: " +
            moment().format("YYYY-MM-DD HH:mm") + "\n\n", function (err) {
                if (err) throw err;
            });
            // console.log(response);
            grabData(response);
        }
    );
}

function searchAgain() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "searchagain",
            message: "Would you like to do another search?",
            choices: [
                "Yes",
                "No, take me back to the terminal"
            ]
        }
    ]).then(function(response)
        {
            if(response.searchagain == "Yes") {
                startSearch();
            }
            else {
                process.exit();
            }
        }
    );
}


function grabData(response) {
    // console.log("This is the function response");
    // console.log(response.searchtype);

    switch(response.searchtype) {
        case "concert-this":
            // console.log("Case: concert-this");
            runAPISearch(response);
            break;
        case "spotify-this-song":
            // console.log("Case: spotify-this-song");
            runSpotifySearch(response);
            break;
        case "movie-this":
            // console.log("Case: movie-this");
            runAPISearch(response);
            break;
        case "do-what-it-says":
            // console.log("Case: do-what-it-says");
            fs.readFile("./random.txt", "utf8", function (err, data) {
                if (err) {
                    console.log(err)
                }
                else {
                    var x = data.replace(/"/g, "");
                    x = x.split(",");
                    response2 = {
                        searchtype: x[0],
                        searchterm: x[1]
                    }
                    grabData(response2);
                }
            });
            break;
    }
}

function runAPISearch(userInput) {
    if (userInput.searchterm != "") {
        searchTerm = userInput.searchterm;
        searchTerm = searchTerm.replace(/ /g, "+")
    }
    switch (userInput.searchtype) {
        case "concert-this":
            if (userInput.searchterm == "") {
                searchTerm = "Elton+John";
            }
            var queryURL = "https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=f7f77cc0c81af633e6bcb2dc17dcd1bc"
            axios.get(queryURL)
                .then(
                    function(response) {
                        var y = "\n";
                        if (response.data != "{warn=Not found}\n" && response.data.length != 0) {
                            y = "====================================\n";
                            y = y + "SEARCH RESULTS: BANDS IN TOWN\n";
                            y = y + "====================================\n";
                            y = y + " Arist: " + response.data[0].lineup[0] + "\n";
                            y = y + " Venue: " + response.data[0].venue.name + "\n";

                            if (response.data[0].venue.region != undefined && response.data[0].venue.region != "") {
                                y = y + " Venue Location: " + response.data[0].venue.city + " " + response.data[0].venue.region + ", " + response.data[0].venue.country + "\n";
                            } else {
                                y = y + " Venue Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country + "\n";
                            }
                            let x = response.data[0].datetime;
                            x = moment(x).format("MM/DD/YYYY");
                            // x = x.substring(0, x.indexOf("T"));
                            y = y + " Date (MM/DD/YYYY): " + x + "\n";
                            y = y + "====================================\n"
                        }
                        else {
                            y = y + "====================================\n";
                            y = y + "SEARCH RESULTS: BANDS IN TOWN\n";
                            y = y + "====================================\n";
                            searchTerm = searchTerm.replace(/ /g, "+")
                            y = y + "ERROR: No upcoming events found for '" + searchTerm + "'\n";
                            y = y + "====================================\n";
                        }
                        y = y + " ";

                        console.log(y);
                        fs.appendFile('log.txt', y, function (err) {
                            if (err) throw err;
                        });

                        setTimeout(function(){
                            searchAgain();
                        }, 1200);
                    }
                );
            break;
        case "movie-this":
            if (userInput.searchterm == "") {
                searchTerm = "Mr+Nobody";
            }
            var queryURL = "http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy";
            axios.get(queryURL)
                .then(
                    function(response) {
                        var y = "\n";
                        if (response.data.Response !== "False") {
                            y = y + "=====================================\n"
                            y = y + "SEARCH RESULTS: ONLINE MOVIE DATABASE\n";
                            y = y + "=====================================\n";
                            y = y + " Title: " + response.data.Title + "\n";
                            y = y + " Year: " + response.data.Year + "\n";
                            y = y + " Rating (IMDB): " + response.data.imdbRating + "\n";
                            if (response.data.Ratings[1] != undefined) {
                                y = y + " Rating (Rotten Tomatoes): " + response.data.Ratings[1].Value + "\n";
                            }
                            y = y + " Country: " + response.data.Country + "\n";
                            y = y + " Language: " + response.data.Language + "\n";
                            y = y + " Plot: " + response.data.Plot + "\n";
                            y = y + " Actors: " + response.data.Actors + "\n";
                            y = y + "====================================\n";
                        }
                        else {
                            y = y + "====================================\n";
                            y = y + "SEARCH RESULTS: ONLINE MOVIE DATABASE\n";
                            y = y + "====================================\n";
                            searchTerm = searchTerm.replace(/ /g, "+")
                            y = y + "ERROR: No movies found for search '" + searchTerm + "'\n";
                            y = y + "====================================\n";
                        }
                        y = y + "\n";

                        console.log(y);
                        fs.appendFile('log.txt', y, function (err) {
                            if (err) throw err;
                        });

                        setTimeout(function(){
                            searchAgain();
                        }, 1200);
                    }
                );
            break;
    }
}

function runSpotifySearch(userInput) {
    if (userInput.searchterm != "") {
        searchTerm = userInput.searchterm;
        searchTerm = searchTerm.replace(/ /g, "+")
    }
    else {
        searchTerm = "The Sign Ace Of Base";
    }
    spotify.search({
        type: 'track',
        query: searchTerm,
        limit: "1"
    }, function(err, data) {
        var y = "\n";
        // if (err) {
        //   return console.log('Error occurred: ' + err);
        // }

        if (data.tracks.items[0] == null || data.tracks.items[0] == undefined) {
            y = y + "=======================\n";
            y = y + "SEARCH RESULTS: SPOTIFY\n";
            y = y + "=======================\n";
            y = y + "No results found\n";
            y = y + "=======================\n";
        }
        else {
            y = y + "=======================\n";
            y = y + "SEARCH RESULTS: SPOTIFY\n";
            y = y + "=======================\n";
            y = y + " Arist: " + data.tracks.items[0].album.artists[0].name + "\n";
            y = y + " Song: " + data.tracks.items[0].name + "\n";
            if (data.tracks.items[0].preview_url == null) {
                y = y + " Preview Link: Not available\n";
            }
            else {
                y = y + " Preview Link: " + data.tracks.items[0].preview_url + "\n";
            }
            y = y + " Album Name: " + data.tracks.items[0].album.name + "\n";
            y = y + "=======================\n";
        }
        y = y + "\n";

        console.log(y);
        fs.appendFile('log.txt', y, function (err) {
            if (err) throw err;
        });

        setTimeout(function(){
            searchAgain();
        }, 1200);
      });
}