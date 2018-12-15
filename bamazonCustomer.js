var mysql = require("mysql");
var inquirer = require("inquirer");
var Tablefy = require("tablefy")
var table = new Tablefy();

var noStock = [
    'background: red',
    'color: white',
    'display: block',
    'text-align: center'
].join(';');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

connection.connect(function(error){
    if (error) throw error;

    console.log(`\nWelcome to Bamazon, take a look around.\n`)
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

    //pull the inventory data based on the item id to compare stock level to order request
    connection.query("SELECT item_id, price, stock_quantity FROM products WHERE item_id = ?",[answer.productSelection], function(error, data){
        if (error) throw error;

        // console.log(answer.unitSelection);
        // console.log(data[0].item_id)

        if(answer.unitSelection > data[0].stock_quantity){
            console.log(`\nWe only have ${data[0].stock_quantity} in stock, please try again.\n`)
            table = new Tablefy();
            showInventory()
        } else {
            // console.log("You can buy this!")
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + (price * ?) WHERE item_id = ?", [answer.unitSelection, answer.unitSelection, data[0].item_id])
            console.log("\nThank your for your order. Your total is $" + (answer.unitSelection * data[0].price) + ".\n")

            inquirer.prompt({
                type: "confirm",
                name: "continue",
                message: "Would you like to continue shopping?",
                default: true
            }).then(function(answer){

                if (answer.continue == true) {
                    table = new Tablefy();
                    showInventory()
                } else if (answer.continue == false) {
                    console.log("Come back soon!")
                    connection.end(function(err) {
                        // The connection is terminated now
                      });
                }
            })

            
        }
    })

})
}

function showInventory() {
    connection.query("SELECT item_id, product_name, price FROM products", function(error, data){
        if (error) throw error;

        // console.log(`\nWelcome to Bamazon, take a look around.\n`)
       
        table.draw(data);


        // for (var i = 0; i < data.length; i++) {
        //     console.log (`Item ID: ${data[i].item_id}    Description: ${data[i].product_name}    Price: ${data[i].price}`)
            
        // }
        console.log("\n\n")
        questions()
    })
};


// put in a quit option ex: press Q to quit, i bet its a function that runs the stop server code