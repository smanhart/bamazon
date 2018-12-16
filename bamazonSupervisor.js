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
    menu();

});

function menu() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What action would you like to take?",
            choices: [
                "View Product Sales by Department",
                "Create New Department",
                "Exit"
            ]
        }
    ]).then(function(answer){
        switch (answer.action) {
            case "View Product Sales by Department":
                displayTable();
                break;
                
            case "Create New Department":
                newDepartment();
                break;

            case "Exit":
                exit();
                break;
        }
    });
};

function displayTable() {
    connection.query("SELECT department_id, departments.department_name, over_head_costs, SUM(IFNULL(product_sales,0)) AS product_sales, SUM(IFNULL(product_sales,0)) - over_head_costs AS total_profit  FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY department_name;", function(error, data){

        if (error) throw error;

        console.log("\n");
        table = new Tablefy;
        table.draw(data);
        console.log("\n");

        menu();
    });
};

function newDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the new department?"
        },
        {
            type: "input",
            name: "overhead",
            message: "What are the overhead costs for this department?",
            validate: function(value) {
                if(isNaN(value)) {
                    console.log("Please enter a number.")
                    return false;
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answer) {
        // console.log(answer)
        connection.query("INSERT INTO departments SET ?",
        {
            department_name: answer.deptName,
            over_head_costs: answer.overhead
        },
        function(error){
            if (error) throw error;
            console.log(`The department ${answer.deptName} has been added.\n\n`)
            menu();
        })
    });
};

function exit() {
    console.log("\nHave a nice day!")
    connection.end(function(err) {
        // The connection is terminated now
      });
};