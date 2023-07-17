
//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02

var db = require('./databaseConfig.js');

var filmDB = {
    getFilmCategory: function (category_name, rental_rate, callback) { // Method to get film based on the category

        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {
                console.log(err);
                return callback(err, null); // if err return error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT f.film_id, f.title, l.name, f.release_year, f.description, f.rating FROM film f, category l, film_category c WHERE (l.category_id = c.category_id and f.film_id = c.film_id and l.name = ? and f.rental_rate <= ?)'; // sql statement to get film details from a category
                conn.query(sql, [category_name, rental_rate], function (err, result) { // query sent to mysql
                    if (err) {
                        return callback(err, null); // if err return error
                    }

                    else {
                        console.log(result)
                        return callback(null, result); // if no error returns the result
                    }
                }); conn.end();
            }
        });
    },

    getFilmByTitleContains: function (dvd_title, rental_rate, callback) { // Method to get film details containing the title from the query

        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {
                console.log(err);
                return callback(err, null); // if err return error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT f.film_id, f.title, l.name, f.release_year, f.description, f.rating FROM film f, category l, film_category c WHERE (l.category_id = c.category_id and f.film_id = c.film_id and LOCATE(?, f.title) and f.rental_rate <= ?)'; // sql statement to get film details from a category
                conn.query(sql, [dvd_title, rental_rate], function (err, result) { // query sent to mysql
                    if (err) {
                        return callback(err, null); // if err return error
                    }

                    else {
                        console.log(result)
                        return callback(null, result); // if no error returns the result
                    }
                }); conn.end();
            }
        });
    },

    getFilmByTitleStarts: function (dvd_title, rental_rate, callback) { // Method to get film details starting with the title from the query

        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {
                console.log(err);
                return callback(err, null); // if err return error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT f.film_id, f.title, l.name, f.release_year, f.description, f.rating FROM film f, category l, film_category c WHERE (l.category_id = c.category_id and f.film_id = c.film_id and f.title LIKE ? and f.rental_rate <= ?)'; // sql statement to get film details from a category
                conn.query(sql, [dvd_title + "%", rental_rate], function (err, result) { // query sent to mysql
                    if (err) {
                        return callback(err, null); // if err return error
                    }

                    else {
                        console.log(result)
                        return callback(null, result); // if no error returns the result
                    }
                }); conn.end();
            }
        });
    },

    getFilmByTitleAndCategoryContains: function (category_name, dvd_title, rental_rate, callback) { // Method to get film details containing the title from the query and category

        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {
                console.log(err);
                return callback(err, null); // if err return error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT f.film_id, f.title, l.name, f.release_year, f.description, f.rating FROM film f, category l, film_category c WHERE (l.category_id = c.category_id and f.film_id = c.film_id and l.name = ? and LOCATE(?, f.title) and f.rental_rate <= ?)'; // sql statement to get film details from a category
                conn.query(sql, [category_name, dvd_title, rental_rate], function (err, result) { // query sent to mysql
                    if (err) {
                        return callback(err, null); // if err return error
                    }

                    else {
                        console.log(result)
                        return callback(null, result); // if no error returns the result
                    }
                }); conn.end();
            }
        });
    },

    getFilmByTitleAndCategoryStarts: function (category_name, dvd_title, rental_rate, callback) { // Method to get film details starting with the title from the query and category

        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {
                console.log(err);
                return callback(err, null); // if err return error
            }
            else {
                console.log("Connected");
                var sql = 'SELECT f.film_id, f.title, l.name, f.release_year, f.description, f.rating FROM film f, category l, film_category c WHERE (l.category_id = c.category_id and f.film_id = c.film_id and l.name = ? and f.title LIKE ? and f.rental_rate <= ?)'; // sql statement to get film details from a category
                conn.query(sql, [category_name, dvd_title + "%", rental_rate], function (err, result) { // query sent to mysql
                    if (err) {
                        return callback(err, null); // if err return error
                    }

                    else {
                        console.log(result)
                        return callback(null, result); // if no error returns the result
                    }
                }); conn.end();
            }
        });
    },

    addFilm: function (title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features, callback) { // Method to add a film into the database

        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {
                console.log(err);
                return callback(err, null); // if err return error
            }
            else {
                console.log("Connected");
                var sql = 'INSERT INTO film (title, description , release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) VALUES (?,?,? ,?, ?,?,?,?,?,?,?)'; // sql statement 
                conn.query(sql, [title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features], function (err, result) { // query sent to mysql
                    if (err) {
                        console.log(err)
                        return callback(err, null); // if err return error
                    }

                    else {
                        console.log(result)
                        return callback(null, result.insertId + ""); // if no error returns the result
                    }
                }); conn.end();
            }
        });
    }, 
    
    addFilmCategory: function (film_id, category_id, callback) { // Method to add a film_id and category_id into the film_category table

        var conn = db.getConnection();
        conn.connect(function (err) { // starts the connection to mysql
            if (err) {
                console.log(err);
                return callback(err, null); // if err return error
            }
            else {
                console.log("Connected");
                var sql = 'INSERT INTO film_category (film_id, category_id) VALUES (?, ?)'; // sql statement for additional endpoint 1
                conn.query(sql, [film_id, category_id], function (err, result) { // query sent to mysql
                    if (err) {
                        console.log(err)
                        return callback(err, null); // if err return error
                    }

                    else {
                        console.log(result)
                        return callback(null, result.insertId + ""); // if no error returns the result
                    }
                }); conn.end();
            }
        });
    }, // end of method for additional endpoint 1

    // Method to get the language_id and name from the language table to use in dropdown
    getLanguage: function (callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("Connected!");

				var sql = 'SELECT language_id, name FROM language ';
				conn.query(sql, [], function (err, result) {
					conn.end();
					if (err) {
						console.log(err);
						return callback(err, null);
					} else {
                        console.log(result)
						return callback(null, result);
					}
				});
			}
		});
	},

    

};




module.exports = filmDB;

