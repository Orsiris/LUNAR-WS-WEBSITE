
//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02


var db = require('./databaseConfig.js');

var customerDB = {

    addCustomer: function (store_id, first_name, last_name, email, address_id, callback) { // Method to add a customer

        var conn = db.getConnection();
        conn.connect(function (err) { // starts connection to mysql

            if (err) {

                console.log(err);
                return callback(err, null); // if err returns error
            }

            else {
                console.log("Connected!");
                var sql = 'INSERT INTO customer (store_id, first_name, last_name, email, address_id) VALUES (?, ?, ?, ?,?)'; // Sql statement to add a customer

                conn.query(sql, [store_id, first_name, last_name, email, address_id], function (err, result) { // query sent to mysql
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null); // if err return error
                    } else {

                        console.log(result)
                        console.log(result.insertId);
                        return callback(null, result.insertId + ""); // if no error return the newly inserted id as result
                    }
                });
            }

        });
    }

    , addCustomerAddress: function (address_line1, address_line2, district, city_id, postal_code, phone, callback) { // method to add an address

        var conn = db.getConnection();
        conn.connect(function (err) { // starts connection to mysql

            if (err) {

                console.log(err);
                return callback(err, null); // if err return error
            }

            else {
                console.log("Connected!");

                var sql = 'INSERT INTO address (address, address2, district, city_id, postal_code, phone) VALUES (?, ?, ? ,? ,?, ?)'; // Sql statement to add an address
                conn.query(sql, [address_line1, address_line2, district, city_id, postal_code, phone], function (err, result) { // query sent to mysql
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null); // if err return error
                    } else {

                        console.log(result)
                        console.log(result.affectedRows);
                        return callback(null, result.insertId); // if no error returns the newly inserted id as result
                    }
                });
            }

        });
        
    }

    ,getCountries: function (callback) { // Method to get countries for dropdown


        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {

                console.log(err);
                return callback(err, null); // if err returns error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT country_id, country from country'; // SQL Statement for endpoint 2
                conn.query(sql, [], function (err, result) {
                    if (err) {

                        console.log(err)
                        return callback(err, null); // if err returns error
                    }

                    else {
                        return callback(null, result); // if no error returns the result for the sql statement
                    }
                }); conn.end();
            }
        });
    }

    // Method to get all the cities for the dropdown
    ,getAllCities: function (callback) { 


        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {

                console.log(err);
                return callback(err, null); // if err returns error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT city_id, city FROM city'; // SQL Statement to get all cities
                conn.query(sql, [], function (err, result) {
                    if (err) {

                        console.log(err)
                        return callback(err, null); // if err returns error
                    }

                    else {
                        return callback(null, result); // if no error returns the result for the sql statement
                    }
                }); conn.end();
            }
        });
    }

    // Method to get cities based on their country_id
    ,getCities: function (country_id, callback) { 


        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {

                console.log(err);
                return callback(err, null); // if err returns error
            }
            else {
                console.log("Connected");
                var sql = 'select c.city_id, c.city from city c, country t where c.country_id = t.country_id and c.country_id = ?'; // SQL Statement to get cities based on country_id
                conn.query(sql, [country_id], function (err, result) {
                    if (err) {

                        console.log(err)
                        return callback(err, null); // if err returns error
                    }

                    else {
                        return callback(null, result); // if no error returns the result for the sql statement
                    }
                }); conn.end();
            }
        });
    }

    ,getStore: function (callback) { // Method to get stores for dropdown


        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {

                console.log(err);
                return callback(err, null); // if err returns error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT store_id, address FROM store s, address a WHERE s.address_id = a.address_id;'; // SQL Statement for endpoint 2
                conn.query(sql, [], function (err, result) {
                    if (err) {

                        console.log(err)
                        return callback(err, null); // if err returns error
                    }

                    else {
                        return callback(null, result); // if no error returns the result for the sql statement
                    }
                }); conn.end();
            }
        });
    }


}



module.exports = customerDB // exports the functions