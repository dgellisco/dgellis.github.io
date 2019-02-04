// dependos
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js")


// get function - default function, pulls all data from DB
router.get("/", function (req, res) {

    // callback function selectAll to pull all results from DB
    burger.selectAll(function(data) {

        // pass the handlebars object the data from SQL query
        var hbsObject = {
            burgers: data
        };

        console.log(hbsObject);

        // render the results (i.e. hbsObject) to the index view
        res.render("index", hbsObject);
    });
});



// post function - allows user to CREATE data in the DB
router.post("/burgers", function (req, res) {

    // pull the data from the body (i.e. request.body.input_field) and use insert callback function to post to DB
    burger.insertOne(req.body.burger_name, function() {
        // refresh the page after data is sent
        res.redirect("/");
    })
});


// put function - allows user to UPDATE data in the DB
router.put("/burgers/:id", function (req, res) {

    // id from the request
    var id = req.params.id;

    console.log("id", id);

    // pull the data from the url (i.e. req.params.id) and use updateone callback function to update value in the DB
    burger.updateOne(id, function() {
        // refresh the page after data is sent
        res.redirect("/");
    })

});


module.exports = router;