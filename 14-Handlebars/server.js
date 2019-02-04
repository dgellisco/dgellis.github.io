// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// Declare express port
var port = process.env.PORT || 8080;

// Create express instance
var app = express();


// Middleware functions

// Serve static files
app.use(express.static(__dirname + "/public"));

// extracts the entire body portion of an incoming request stream, and exposes it on req.body
app.use(bodyParser.urlencoded({ extended: false }));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));



// Handlebars dependency
var exphbs = require("express-handlebars");

// app.engine(ext, callback)
// register the template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// use the template engine
app.set("view engine", "handlebars");

// import routes so that server has access to them
var routes = require("./controllers/burgers_controller.js")

app.use("/", routes);

app.listen(port, function() {
    console.log("App listening on PORT: http://localhost:" + port);
})