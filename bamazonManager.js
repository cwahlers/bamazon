// Dependencies
var inquirer = require('inquirer');
var mysql = require("mysql");
var products = [];

console.log("test");
//MySQL DB Connection Information (remember to change this with our specific credentials)
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


function mgrSel(){
  inquirer.prompt([
    {
    type: "list",
    name: "selection",
    message: "Enter the menu option: ",
    choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]}
    ]).then(function(answer){
      console.log(answer.selection);
      connection.query("SELECT * FROM products order by id", function(err, result) {
      products = result;
      for (var i = 0; i < result.length; i++){
        console.log("************************************");
        console.log('  ' + result[i].id + ' - ' + result[i].product_name + '  $' + result[i].price );
      };
      console.log("************************************");
    
    });


  }); // End Item input
}

mgrSel();