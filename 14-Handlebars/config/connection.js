// dependencies
var mysql = require("mysql");

// create mySQL connection object
var connection = mysql.createConnection({
    host: "localhost",
    // specify port
    port: 3306,
    // your username
    user: "root",
    // your password
    password: "root",
    database: "burgers_db"
});

// Connect to SQL database
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected to mySQL as id " + connection.threadId + "\n");
});

// export the connection
module.exports = connection;