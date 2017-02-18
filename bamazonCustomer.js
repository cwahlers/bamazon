// Dependencies
var inquirer = require('inquirer')
var mysql = require("mysql");
var products = [];

// MySQL DB Connection Information (remember to change this with our specific credentials)
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

connection.query("SELECT * FROM products order by id", function(err, result) {
  products = result;
  for (var i = 0; i < result.length; i++){
    console.log("************************************");
    console.log('  ' + result[i].id + ' - ' + result[i].product_name + '  $' + result[i].price );
  };
  console.log("************************************");
  askCustomer();
});


function askCustomer(){
  inquirer.prompt([
    {
    type: "input",
    name: "item",
    message: "Enter the item # you would like to purchase: "},
    ]).then(function(data){
        console.log("The item selected is: ");
        var num = parseInt(data.item);
        console.log("************************************");
        console.log('  ' + products[num-1].id + ' - ' + products[num-1].product_name + '  $' + products[num-1].price );
        console.log("************************************");

      //if (data.guess != 'no') {
          //if( wordObject.updateLetter(data.guess) ) tries--;

          //console.log(wordObject.display());

          //askLetter();
       //}
      inquirer.prompt([
      {
      type: "input",
      name: "qty",
      message: "Enter the quantity to purchase: "},
      ]).then(function(data){
          console.log("The quantity is: " + data.qty);
          if (data.qty != 0){
            //console.log("Thank you for your order");
            checkInventory(num, data.qty);
            // // Place another order
            // inquirer.prompt([
            //   {
            //   type: "input",
            //   name: "add",
            //   message: "Would you like to place another order (yes): "},
            //   ]).then(function(data){
            //     if (data.add == "yes"){
            //       askCustomer();
            //     }else{
            //       console.log("Thank you for ordering with Bamazon");
            //       return;
            //     };
            //   });


          } else { console.log("Your order was canceled");}
          //if (data.guess != 'no') {
              //if( wordObject.updateLetter(data.guess) ) tries--;

              //console.log(wordObject.display());

              //askLetter();
           //}
      }); // Ent Qty input


  }); // End Item input
}

function checkInventory(item, qty){
  console.log("Checking Inventory Levels");
  connection.query("SELECT stock_quantity FROM products WHERE id = ?", [item], function(err, result) { 
    if (err){
      console.log("Product not found")
    } else {
      console.log("Current Stock: " + result[0].stock_quantity);
      var finalInv = result[0].stock_quantity - qty;
      //console.log("final inv: " + finalInv);
      if ( finalInv < 0){
        console.log("Insufficient quantity!");
        //Place another order
        inquirer.prompt([
          {
          type: "input",
          name: "add",
          message: "Would you like to place another order (yes): "},
          ]).then(function(data){
            if (data.add == "yes"){
              askCustomer();
            }else{
              console.log("Thank you for ordering with Bamazon");
              return;
            };
          });
      }else{
        reduceInventory(item, qty, finalInv);
      }

    };
  });
  
}

function reduceInventory(item, qty, finalInv){
  console.log("Item: " + item + "Qty: " + qty);
  connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?", [finalInv, item] , function(err, res) {
    if (err){
      console.log("Unable to update the Inventory");
    }else{
      console.log("Inventory updated");
      insertIntoSales(item, qty);
    }
  });
}

function insertIntoSales(item, qty){
  connection.query("INSERT INTO sales SET ?", {
      product_id: item,
      quantity_purchased: qty
    }, function(err, res) {
      if (err){
        console.log("Unable to process your sales order at this time");
      }else{
        //Place another order
        inquirer.prompt([
          {
          type: "input",
          name: "add",
          message: "Would you like to place another order (yes): "},
          ]).then(function(data){
            if (data.add == "yes"){
              askCustomer();
            }else{
              console.log("Thank you for ordering with Bamazon");
              return;
            };
          });   
      }
    });
}