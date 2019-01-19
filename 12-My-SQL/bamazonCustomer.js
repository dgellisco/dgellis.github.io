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
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
    }
    // console.log("connected as id " + connection.threadId + "\n");
    console.log('\nMysterious Ware Vendor: "Welcome to my store!"');
    displayProducts();
});

function displayProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) {
            console.log(err);
        }

        console.log('\nMysterious Ware Vendor: "Here are my goods..."\n');

        var t = new Table;
        res.forEach(function (products) {
            t.cell("Item ID", products.item_id)
            t.cell("Product", products.product_name)
            t.cell("Department", products.department_name)
            t.cell("Price", products.price, Table.number(2))
            t.cell("Qty Remaining", products.stock_quantity)
            t.newRow()
        });

        console.log(t.toString());

    })

    setTimeout(function () {
        chooseProduct();
    }, 1000);

}

function chooseProduct() {
    console.log('\nMysterious Ware Vendor: "Would you like to purchase any of my wares?"\n');

    inquirer
        .prompt([{
            name: "inq_newsearch",
            type: "confirm",
            message: "Would you like to buy something?",
        }])
        .then(function (answer) {

            if (answer.inq_newsearch) {
                makePurchase();
            } else {
                console.log('Mysterious Ware Vendor: "Are you sure?  This is pretty cool stuff!  Have another look."');
                setTimeout(function () {
                    displayProducts();
                }, 1500);
            }
        });


    function makePurchase() {
        inquirer
            .prompt([{
                    name: "inq_itemid",
                    type: "input",
                    message: "What is the ID of the product you wish to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                },
                {
                    name: "inq_qty",
                    type: "input",
                    message: "How many of these do you wish to purchase?",
                    validate: function (value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ])
            .then(function (answer) {

                connection.query("SELECT * FROM products WHERE ?", {
                    item_id: answer.inq_itemid
                }, function (err, res) {
                    if (err) {
                        console.log(err);
                    }

                    var res = res[0];
                    // console.log(res.RowDataPacket.item_id);

                    var cost = answer.inq_qty * res.price;

                    var plural = "";
                    if (answer.inq_qty > 1) {
                        plural = "s";
                    }

                    console.log('Mysterious Ware Vendor: "The total cost for ' + converter.toWords(answer.inq_qty) + ' ' + res.product_name + plural + ' would be $' + cost + '"');
                    console.log('Mysterious Ware Vendor: "Let me check my stock..."');
                    console.log('\n');

                    if (res.stock_quantity <= 0) {
                        console.log("  But unfortuantely, there is no stock remaining.  Purchase declined.");
                        console.log("  Are you interested in any other products?");
                    } else if (res.stock_quantity < answer.inq_qty) {
                        console.log("  It looks like I do not have enough stock.  Purchase declined.");
                        console.log("  There are " + res.stock_quantity + " remaining.  Try reducing your order quantity.");
                    } else if (res.stock_quantity >= answer.inq_qty) {
                        console.log("  Purchase succesful!");
                        console.log("  You purchased " + converter.toWords(answer.inq_qty) + ' ' + res.product_name + plural + ' for $' + cost + '.');
                        // Remove quantity from stock
                        var query = "UPDATE products SET stock_quantity=" + (res.stock_quantity - answer.inq_qty) + " WHERE item_id=" + answer.inq_itemid;
                        connection.query(query, function (err, res) {});
                        // Read qty from online
                        connection.query("SELECT * FROM products WHERE ?", {
                            item_id: answer.inq_itemid
                        }, function (err, res) {
                            console.log("  There are now " + converter.toWords(res[0].stock_quantity) + ' ' + res[0].product_name + plural + ' remaining in stock')
                        });
                    } else {
                        console.log("error");
                    }

                    setTimeout(function () {
                        console.log("\n");
                        inquirer
                            .prompt([{
                                name: "inq_newsearch",
                                type: "confirm",
                                message: "Would you like to buy something else?",
                            }])
                            .then(function (answer) {

                                if (answer.inq_newsearch) {
                                    console.log("  OK!  Checking stock again, and...")
                                    setTimeout(function () {
                                        displayProducts();
                                    }, 1500);
                                } else {
                                    console.log("  See you again soon!")
                                    process.exit();
                                }
                            });
                    }, 1500);
                });
            });
    }
}