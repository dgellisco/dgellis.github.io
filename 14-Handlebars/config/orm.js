// home cooked orm - used to allow JS functions to easily communicate
// and execute SQL functions, all in the native JS language

// dependencies
var connection = require("./connection.js");

// Execute the necessary MySQL commands in the controllers.
// These are the methods you will need to use in order to retrieve and store data in your DB.


// Helper functions for SQL syntax
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objtoSql(ob) {
    var arr = [];

    for (var key in ob) {
        arr.push(key + "=" + ob[key]);
    }

    return arr.toString();
}


// ORM object to perform SQL queries
var orm = {

    // return all results
    // selectAll()
    selectAll: function (cb) {
        // mysql call, get all * from table burgers (db already defined in connection)
        var queryString = "SELECT * FROM burgers;";
        connection.query(queryString, function (err, result) {
            // stop if error
            if (err) {
                throw err;
            }
            // return result to callback
            cb(result);
        });
    },

    // insert a record 
    // insertOne()
    insertOne: function (burger, cb) {
        // mysql call, insert a record into table burgers (db already defined in connection)
        // ? denotes value to be inserted into query string, i.e. [burger]
        var queryString = "INSERT INTO burgers (burger_name) VALUES (?)";
        connection.query(queryString, burger, function (err, result) {
            // stop if error
            if (err) {
                throw err;
            }
            // return result to callback
            cb(result);
        });
    },

    // update a value in a record
    // updateOne()
    updateOne: function (id, cb) {
        // mysql call, update a value in a record in table burgers (db already defined in connection)
        // change value 'devoured' to true
        // ? denotes value to be inserted into query string, i.e. [id]
        var queryString = "UPDATE burgers SET devoured=true WHERE id=(?)";
        connection.query(queryString, id, function (err, result) {
            // stop if error
            if (err) {
                throw err;
            }
            // return result to callback
            cb(result);
        });
    }

};

// export this home-brewed ORM for use by model (how MVC programs interacts with data)
module.exports = orm;