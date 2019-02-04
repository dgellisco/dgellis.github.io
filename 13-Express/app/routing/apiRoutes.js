// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var friendsList = require("../data/friends");

// Routes
// =============================================================
module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function(req, res) {

        var newFriend = req.body;
        
        var newFriendSurveyAnswers = newFriend.scores;
    
        var bestMatch = "";
        var bestMatchImage = "";
        var bestMatchDifference = 88888;

        for (var i = 0; i < friendsList.length; i++) {
            var difference = 0;
            for (var h = 0; h < newFriendSurveyAnswers.length; h++) {
                difference += Math.abs(friendsList[i].scores[h] - newFriendSurveyAnswers[h]);
            }
            if (difference < bestMatchDifference) {
                bestMatchDifference = difference;
                bestMatch = friendsList[i].name;
                bestMatchImage = friendsList[i].picture;
            }
        }

        friendsList.push(req.body);

        res.json({
            bestMatch: bestMatch,
            bestMatchImage: bestMatchImage
        });
    });
}