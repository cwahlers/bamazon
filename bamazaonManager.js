// Dependencies
var inquirer = require('inquirer');
var mysql = require("mysql");
var products = [];

MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bamazon_db"
});


// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

console.log("test");
inquirer.prompt([
  {
  type: "list-input",
  name: "selection",
  message: "Enter the menu option: "},
  choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
  ]).function(answers){
    console.log(JSON.stringify(answers, null, 30));

  inquirer.prompt([
  {
  type: "input",
  name: "qty",
  message: "Enter the quantity to purchase: "},
  ]).then(function(data){
      console.log("The quantity is: " + data.qty);
      // if (data.qty != 0){
      //   checkInventory(num, data.qty);
      // } else { console.log("Your order was canceled");}
  }); // Ent Qty input
}); // End Item input
