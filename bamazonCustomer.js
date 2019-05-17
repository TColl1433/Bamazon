var mysql = require("mysql");

var inquirer = require('inquirer');
var Table = require('cli-table2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "docker",
    database: "bamazon_db",
    port: 3306,
})
connection.connect();

//the function used in the variable will display the tables neatly in the CLI using cli-table2
function displayProducts() {
    //the below line connects us to the database through a query
    connection.query("SELECT * FROM products", function (error, res) {
        if (error) throw error;
        

        console.log("---------------------------------------------");
        console.log("            Welcome to Bamazon               ");
        console.log("---------------------------------------------");
        console.log("");
        console.log("Find Your Product Below");
        console.log("")
    
    });
    var table = new Table({
        head: ["product id", "product name", "cost", "stock quantity"]
        , colWidths: [12, 50, 8, 8],
        colAligns: ["center", "left", "right"],
        style: {
            head: ["blue"],
            compact: true
        }
    });

    // for (var i = 0; i < results.length; i++) {
    //     table.push([
    //         results[i].id,
    //         results[i].product_name,
    //         results[i].price,
    //         results[i].stock_quantity,
    //     ]);
    // }
    console.log(table.toString());
    console.log("")
    console.table(res)
};

displayProducts();


// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   });
   
//   connection.end();



// var shopping = function() {
//     inquirer.prompt({
//     name: "productToBuy",
//     type: "input",
//     message: "Please enter the name of the item you wish to purchase!",
//     }).then(function(answer1){

//         var selection = answer1.productToBuy;
//         connection.query("SELECT * FROM products WHERE Id=?", selection, function (err, res){
//             if (err) throw err;
//             //below statement handles error if something is not on the list
//             if (res.length === 0){
//                 console.log("that product does not exist, please enter a product from the list above")

//                 shopping()
//             }else{
//                 console.log("you're good to go")
//             }
//         })
//     })
//     }






