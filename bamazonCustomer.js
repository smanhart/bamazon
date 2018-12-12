var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(error){
    if (error) throw error;
    showInventory()
    
});

function questions() {
    inquirer.prompt([
    {
        type: "input",
        name: "productSelection",
        message: "What is the ID number of the product you would like to buy?",
        validate: function(value) {
            if(isNaN(value)) {
                console.log("Please enter a number")
                return false;
            }else {
                return true;
            }
        }
    },
    {
        type: "input",
        name: "unitSelection",
        message: "How many units would you like to buy of that product?",
        validate: function(value) {
            if(isNaN(value)) {
                console.log("Please enter a number")
                return false;
            } else {
                return true;
            }
        }
    }
]).then(function(answer){
    // console.log(answer);

    connection.query("SELECT item_id, stock_quantity FROM products WHERE item_id = ?",[answer.productSelection], function(error, data){
        if (error) throw error;

        // console.log(answer.unitSelection);
        // console.log(data[0].item_id)

        if(answer.unitSelection > data[0].stock_quantity){
            console.log("Insufficient Quantity!")
        } else {
            console.log("You can buy this!")
        }
    })

})
}

function showInventory() {
    connection.query("SELECT item_id, product_name, price FROM products", function(error, data){
        if (error) throw error;

        for (var i = 0; i < data.length; i++) {
            console.log (`Item ID: ${data[i].item_id} | Description: ${data[i].product_name} | Price: ${data[i].price}`)
        }
        questions()
    })
};

// function checkInventory() {
//     connection.query("SELECT item_id, stock_quantity FROM products", function(error, data){
//         if (error) throw error;

//         else if()
//     })
// }

// put in a quit option ex: press Q to quit, i bet its a function that runs the stop server code