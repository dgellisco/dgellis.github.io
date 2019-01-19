// DONT FORGET TO NPM INSTALL AND NPM INIT

// Require NPM packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("easy-table");
var converter = require("number-to-words");

// Create sql connection
var connection = mysql.createConnection({
    host: "localhost",
    // specify port
    port: 3306,
    // your username
    user: "root",
    // your password
    password: "root",
    database: "bamazon"
});

// Connect to SQL database
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    // console.log("connected as id " + connection.threadId + "\n");
    console.log('\nManager Mode: "Welcome to manager mode!"');
    mainMenu();
});

function mainMenu() {
    inquirer
        .prompt([
            {
                name: "inq_managermenu",
                type: "list",
                message: "Select an option from the manager menu:",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ]
            }
        ])
        .then(function(answer) {
            switch(answer.inq_managermenu) {
                case "View Products for Sale":
                    displayProducts("all");
                    break;
                case "View Low Inventory":
                    displayProducts("low");
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addProduct();
                    break;
                default:
                    console.log("error!");
            }
        });
}

function displayProducts(inqType) {
    var query;
    if (inqType == "low") {
        query = "SELECT * FROM products WHERE stock_quantity<5";
        console.log('\nManager Mode: "Displaying low inventory products."\n');
    }
    else {
        query = "SELECT * FROM products";
        console.log('\nManager Mode: "Displaying all products for sale."\n');
    }
    
    connection.query(query, function(err, res) {
        if (err) {
            console.log(err);
        }

        var t = new Table;
        res.forEach(function(products) {
            t.cell("Item ID", products.item_id)
            t.cell("Product", products.product_name)
            t.cell("Department", products.department_name)
            t.cell("Price", products.price, Table.number(2))
            t.cell("Qty Remaining", products.stock_quantity)
            t.newRow()
        });

        console.log(t.toString());

    })

    setTimeout(function(){
        mainMenu();
    }, 1000);   
}

function addInventory() {
    console.log('\nManager Mode: "Opening Add To Inventory function."\n');
    inquirer
        .prompt([
            {
                name: "inq_itemid",
                type: "input",
                message: "What is the ID of the product you wish to add inventory for?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                }
            },
            {
                name: "inq_qty",
                type: "input",
                message: "How many of these do you wish to add to the inventory?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            connection.query("SELECT * FROM products WHERE ?", {item_id: answer.inq_itemid}, function(err, res) {                
                
                var res = res[0];
                
                var plural = "";
                if (answer.inq_qty > 1) {
                    plural = "s";
                }
                
                var newTotal = parseFloat(res.stock_quantity) + parseFloat(answer.inq_qty);
                console.log("newTotal is " + newTotal);

                var query = "UPDATE products SET stock_quantity=" + (newTotal) + " WHERE item_id=" + answer.inq_itemid;
                connection.query(query, function(err, res) {
                    connection.query("SELECT * FROM products WHERE ?", {item_id: answer.inq_itemid}, function(err, res) {
                        var res = res[0];
                        console.log('\nManager Mode: "You added ' + converter.toWords(answer.inq_qty) + ' ' + res.product_name + plural + ' to the inventory."');
                        console.log('\nManager Mode: "There is now ' + converter.toWords(res.stock_quantity) + ' ' + res.product_name + plural + ' in stock."\n')
                    });
                });
                
                // Read qty from online
                // connection.query("SELECT * FROM products WHERE item_id=" + answer.inq_itemid, function(err, res) {                
                setTimeout(function(){
                    displayProducts();
                }, 1000);
                // });
            });
        });

    }

function addProduct() {
    console.log('\nManager Mode: "Opening Add Product function."\n');
    inquirer
        .prompt([
            {
                name: "inq_itemname",
                type: "input",
                message: "What is name of the product you wish to add?",
            },
            {
                name: "inq_itemdept",
                type: "input",
                message: "What is name of the department this product should belong to?",
            },
            {
                name: "inq_itemprice",
                type: "input",
                message: "What is price per unit for this product?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "inq_itemqty",
                type: "input",
                message: "How many units of this product are being added?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) {
            
            connection.query('INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("' + answer.inq_itemname + '","' + answer.inq_itemdept + '",' + answer.inq_itemprice + ',' + answer.inq_itemqty + ')', function(err, res) {                
                
                console.log("Product has been added");

                setTimeout(function(){
                    displayProducts();
                }, 1000);

            });
            
        });

    }
    