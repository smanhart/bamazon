var mysql = require("mysql");
var inquirer = require("inquirer");
var Tablefy = require("tablefy")
var table = new Tablefy();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function (error) {
    if (error) throw error;
    menu()

});

function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What action would you like to take?",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product",
                "Exit"
            ]
        }
    ]).then(function (answer) {
        switch (answer.action) {
            case "View Products for Sale":
                showAllInventory()
                break;

            case "View Low Inventory":
                showLowInventory()
                break;

            case "Add to Inventory":
                addInventory()
                break;

            case "Add New Product":
                addNewProduct()
                break;
            case "Exit":
                exit()
                break;

        }

    });
}


function showAllInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (error, data) {
        if (error) throw error;

        console.log(`\nHere are the current products for sale.\n`)
        table = new Tablefy;
        table.draw(data);
        console.log("\n\n")
        menu()
    })
};

function showLowInventory() {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", function (error, data) {
        if (error) throw error;

        console.log("\nHere are the items with low inventory.\n")
        table = new Tablefy;
        table.draw(data);
        console.log("\n\n")
        menu()
    })
}

function addInventory() {
    inquirer.prompt([{
        type: "input",
        name: "idChosen",
        message: "What is the item id of the product you would like to update?",
        validate: function (value) {
            if (isNaN(value)) {
                console.log("Please enter a number")
                return false;
            } else {
                return true;
            }
        }
    },
        {
            type: "input",
            name: "unitsToAdd",
            message: "How many units would you like to add to the inventory",
            validate: function (value) {
                if (isNaN(value)) {
                    console.log("Please enter a number")
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(function (answer) {
            connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [answer.unitsToAdd, answer.idChosen], function (error) {
                if (error) throw error;
                console.log(`\nYou have updated your inventory!\n`);
                menu()
            })
        })
}

function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your new product?"
        },
        {
            type: "input",
            name: "dept",
            message: "In which department does this product belong?"
        },
        {
            type: "input",
            name: "price",
            message: "What is the price per unit of this product?",
            validate: function (value) {
                if (isNaN(value)) {
                    console.log("Please enter a number")
                    return false;
                } else {
                    return true;
                }
            }
        },
        {
            type: "input",
            name: "stock",
            message: "How many units would you like to add to inventory?",
            validate: function (value) {
                if (isNaN(value)) {
                    console.log("Please enter a number")
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer) {
        connection.query("INSERT INTO products SET ?",
        {
            product_name: answer.name,
            department_name: answer.dept,
            price: answer.price,
            stock_quantity: answer.stock
        },
        function(error){
            if(error) throw error;
            console.log(`\nYou have added ${answer.name} to your inventory.\n`)
            menu()
        } )
    })
}

function exit() {
    console.log("\nHave a nice day!")
    connection.end(function(err) {
        // The connection is terminated now
      });
}