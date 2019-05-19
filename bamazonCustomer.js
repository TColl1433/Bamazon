// load  products
// ask ask for items

// ask for quantity
// check inventory
// make purchase



var mysql = require("mysql");

//inquirer is used as a query 
var inquirer = require('inquirer');
var Table = require('cli-table2');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "docker",
    database: "bamazon_db",
    port: 3306,
})
connection.connect(function (err) {
    displayProducts()
}
);

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

        console.table(res)
        shopping()

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

};

// displayProducts();


// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   });

//   connection.end();


function shopping(inventory) {
    inquirer.prompt([
        {
            name: "productToBuy",
            type: "input",
            message: "Please enter id number of the item you would like to purchase!",
        }, {
            name: "quantity",
            type: "input",
            message: "Please enter the quantity of items you would like to purchase!"
        }
    ]
    )
        .then(function (answer) {

            var selection = answer.productToBuy;
            var quantity = answer.quantity;
            // console.log("this is the quantity" + quantity)
            // var selectedProduct = checkInventory(selection, inventory)
            connection.query("SELECT * FROM products WHERE id=?", selection, function (err, res) {
                // console.log(res)
                console.log(res[0].stock_quantity)
                if (quantity > res[0].stock_quantity) {
                    console.log("Sorry we don't have that item in stock");
                } else {
                    var inventory = res
                    var selectedProduct = checkInventory(selection, inventory)
                    console.log(selectedProduct)

                    checkQuantity(quantity, selection)

                    if (err) throw err;
                    //below statement handles error if something is not on the list

                    else {
                        console.log("We have your product in stock")

                    }

                }
            })
        })
}

function checkQuantity(quantity, id) {
    connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?', [quantity, id], function (error, results, fields) {
        if (error) throw error;
        console.log("thanks for your business");
    });

}



//checking to see if it exists
function checkInventory(selection, inventory) {
    for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].stock_quantity === selection) {
            return inventory[i]
        };
    }
};






