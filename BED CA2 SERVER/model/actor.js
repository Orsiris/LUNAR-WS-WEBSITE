//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02


var db = require('./databaseConfig.js');

var actorDB = {


    getActors: function (film_id, callback) { // Method  to get list of actors based on the film_id


        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {

                console.log(err);
                return callback(err, null); // if err returns error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT first_name, last_name FROM actor a, film_actor f WHERE (a.actor_id = f.actor_id and f.film_id = ?)'; // SQL Statement for endpoint 2
                conn.query(sql, [film_id], function (err, result) {
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

    , getAllActors: function (callback) { // Method to get all actors

        var conn = db.getConnection();
        conn.connect(function (err) { // Start connection to mysql

            if (err) {

                console.log(err);
                return callback(err, null); // if err returns error
            }

            else {
                console.log("Connected!");
                var sql = 'SELECT actor_id, first_name, last_name FROM actor'; // SQL Statement for endpoint 3 

                conn.query(sql, [], function (err, result) {  // Query sent to mysql
                    conn.end(); // Ends mysql connection
                    if (err) {
                        console.log(err);
                        return callback(err, null); // if err returns error
                    } else {

                        return callback(null, result); // if no error returns the actor_id of the newly inserted actor
                    }
                });
            }

        });
    }

    , addActor: function (first_name, last_name, callback) { // Method to add an actor

        var conn = db.getConnection();
        conn.connect(function (err) { // Start connection to mysql

            if (err) {

                console.log(err);
                return callback(err, null); // if err returns error
            }

            else {
                console.log("Connected!");
                var sql = 'INSERT INTO actor (first_name, last_name) VALUES (?, ?)'; // SQL Statement for endpoint 3 

                conn.query(sql, [first_name, last_name], function (err, result) {  // Query sent to mysql
                    conn.end(); // Ends mysql connection
                    if (err) {
                        console.log(err);
                        return callback(err, null); // if err returns error
                    } else {

                        console.log(result.affectedRows);
                        return callback(null, result.insertId + ""); // if no error returns the actor_id of the newly inserted actor
                    }
                });
            }

        });
    }

    // Method to add a an actor into the film_actor table
    , addFilmActor: function (actor_ids, film_id, callback) {
        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log("Connected");
                var sql = "INSERT INTO film_actor (actor_id, film_id) VALUES ?";
                var values = [];
                actor_ids.forEach(function (actor_ids) {
                    values.push([actor_ids, film_id]);
                });
                conn.query(sql, [values], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result.insertId + "");
                    }
                });
                conn.end();
            }
        });
    },



}



module.exports = actorDB // exports the functions