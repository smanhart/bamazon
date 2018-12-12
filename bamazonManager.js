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

connection.connect(function(error){
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
               "Add New Product" 
            ]
        }
    ]).then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
                showAllInventory()
                break;

            case "View Low Inventory":
                showLowInventory()
                break;

            case "Add to Inventory":
                break;

            case "Add New Product":
                break;

        }
        
    });
}


function showAllInventory() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(error, data){
        if (error) throw error;

        console.log(`\nHere are the current products for sale.\n`)
       
        table.draw(data);


        // for (var i = 0; i < data.length; i++) {
        //     console.log (`Item ID: ${data[i].item_id}    Description: ${data[i].product_name}    Price: ${data[i].price}`)
            
        // }
        
    })
};

function showLowInventory() {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", function(error, data) {
        if (error) throw error;

        console.log("\nHere are the items with low inventory.\n")
        table = new Tablefy;
        table.draw(data);

    })
}

function addInventory() {
    inquirer.prompt({
        type: "input",
        name: "idChosen",
        message: "Which item would you like to update?"
    })
}