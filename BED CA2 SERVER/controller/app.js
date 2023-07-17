
//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var user = require('../model/user.js');
var category = require('../model/category.js');
var film = require('../model/film.js');
var actor = require('../model/actor.js');
var customer = require('../model/customer.js');
var verifyToken = require('../auth/verifyToken.js');
var cors = require('cors');

app.options('*', cors());
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(bodyParser.json());
app.use(urlencodedParser);

var errMsg = { // Error msg for an internal server error
    "error_msg": "Internal server error"
}

var noData = { // Error msg when there is missing data from the body
    "error_msg": "missing data"
}

var emailExist = { // Error msg for when email already exists
    "error_msg": "email already exist"
}


app.get('/user/:userid', function (req, res) {
    var id = req.params.userid;

    user.getUser(id, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Some error");
        }
    });
});

app.post('/user/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    user.loginUser(email, password, function (err, token, result) {
        if (!err) {
            res.statusCode = 200;
            // res.setHeader('Content-Type', 'application/json');
            delete result[0]['password'];//clear the password in json data, do not send back to client
            res.json({ success: true, UserData: JSON.stringify(result), token: token, status: 'You are successfully logged in!' });
            res.send();
        } else {
            res.status(500);
            res.send(err.statusCode);
        }
    });
});


app.post('/user/logout', function (req, res) {
    console.log("..logging out.");
    res.clearCookie('session-id'); //clears the cookie in the response
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, status: 'Log out successful!' });

});

// get the category names from the database
app.get('/category', function (req, res) {

    category.getCategory(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Searches for films by category name
app.get('/categoryname', function (req, res) {
    category_name = req.query.category
    rental_rate = req.query.maxPrice || 9999

    film.getFilmCategory(category_name, rental_rate, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Searches for films by Title that contain the letters in the query
app.get('/filmtitlecontains', function (req, res) {
    dvd_title = req.query.dvdTitle
    rental_rate = req.query.maxPrice || 9999

    film.getFilmByTitleContains(dvd_title, rental_rate, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Searches for films by Title that start with the letters in the query
app.get('/filmtitlestarts', function (req, res) {
    dvd_title = req.query.dvdTitle
    rental_rate = req.query.maxPrice || 9999

    film.getFilmByTitleStarts(dvd_title, rental_rate, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Searches for films by Title and Category that contain the letters in the query
app.get('/titleAndCategorycontains', function (req, res) {
    dvd_title = req.query.dvdTitle
    rental_rate = req.query.maxPrice || 9999
    category_name = req.query.category

    film.getFilmByTitleAndCategoryContains(category_name, dvd_title, rental_rate, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Searches for films by Title and Category that start with the letters in the query
app.get('/titleAndCategorystarts', function (req, res) {
    dvd_title = req.query.dvdTitle
    rental_rate = req.query.maxPrice || 9999
    category_name = req.query.category

    film.getFilmByTitleAndCategoryStarts(category_name, dvd_title, rental_rate, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Gets the actors for a film based on the film_id
app.get('/filmActors', function (req, res) {
    film_id = req.query.film_id

    actor.getActors(film_id, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Adds an actor into the database
app.post('/actor', verifyToken, function (req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    actor.addActor(firstName, lastName, function (err, result) {
        if (!err) {
            res.status(200);
            res.send(result);


        }

        else if (err.errno == 1048) {
            res.status(400).send("Missing Data") // Sends no missing data msg if data is missing from the body
        }

        else {
            res.status(500);
            res.send("{\"message\":\"Some error!\"}");
        }
    });



});

// Gets the countries from the database for the dropdown
app.get('/country', function (req, res) {


    customer.getCountries(function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Gets all the cities from the database for the dropdown
app.get('/allCity', function (req, res) {

    customer.getAllCities(function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Gets the cities from the database for the dropdown based on the country_id
app.get('/city', function (req, res) {

    var country_id = req.query.country_id

    customer.getCities(country_id, function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Gets the store names from the databse for the dropdown
app.get('/store', function (req, res) {


    customer.getStore(function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Gets the languages from the database for the dropdown
app.get('/language', function (req, res) {


    film.getLanguage(function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Add customer to database
app.post('/customers', verifyToken, function (req, res) { // Endpoint 8 to insert a customer and their address

    var store_id = req.body.store_id; // Stores the store_id
    var first_name = req.body.firstName; // Stores the first_name
    var last_name = req.body.lastName; // Stores the last_name
    var email = req.body.email; // Stores the email
    var address_line1 = req.body.add1; // Stores the address_line1
    var address_line2 = req.body.add2; // Stories the address_line2
    var district = req.body.district; // Stores the district
    var city_id = req.body.city; // Stores the city_id
    var postal_code = req.body.postal; // Stores the postal_code
    var phone = req.body.phone; // Stores the phone number



    customer.addCustomerAddress(address_line1, address_line2, district, city_id, postal_code, phone, function // Passes the details as parameters into the addCustomerAddress
        (err, result) {
        if (!err) {
            console.log(result)
            var address_id = result; // Stores the auto increment number returned by the addCustomerAddress function to be used in the addCustomer function since it is a foreign key for the customer table

            customer.addCustomer(store_id, first_name, last_name, email, address_id, function // Executes this function if addCustomerAddress was successful
                (err, result) {

                if (!err) {
                    let toReturn = {

                        "customer_id": result

                    };

                    res.status(201).send(toReturn) // Returns the customer_id of the newly inserted customer if successful
                }

                else if (err.errno == 1048) {
                    res.status(400).send(noData) // Returns an error message if there is missing information from the body
                }

                else if (err.errno == 1062) {
                    res.status(409).send(emailExist) // Returns error message if the email already exists in the database
                }

                else {
                    res.status(500).send(errMsg) // Returns internal server error
                }

            })

        }

        else if (err.errno == 1048) {
            res.status(400).send(noData) // Returns an error message is there is missing information from the body
        }

        else {

            res.status(500).send(errMsg); // Returns internal server error

        }

    });
})

// Gets all the actors from the database for the dropdown
app.get('/allActors', function (req, res) {

    actor.getAllActors(function (err, result) {
        if (!err) {
            console.log(result)
            res.send(result);
        } else {
            console.log(err)
            res.status(500).send(null);
        }
    });
});

// Adds a film into the database
app.post('/film', verifyToken, function (req, res) { //Additional Endpoint 1
    //initialize the variables for the data
    var title = req.body.title
    var category_id = req.body.category_id
    var description = req.body.description
    var release_year = req.body.release_year
    var language_id = req.body.language_id
    var original_language_id = req.body.original_language_id
    var rental_duration = req.body.rental_duration
    var rental_rate = req.body.rental_rate
    var length = req.body.length
    var replacement_cost = req.body.replacement_cost
    var rating = req.body.rating
    var special_features = req.body.special_features

    var actors = req.body.actors

    // Method to add a film into the database
    film.addFilm(title, description, release_year, language_id, original_language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features, function (err, result) { // Passes in the new details into the function

        if (!err) {

            var film_id = result // stores the auto increment film_id returned by the function

            film.addFilmCategory(film_id, category_id, function // Executes this function if addFilm was successful
                (err, result) {

                if (!err) {

                    if (!err) {

                        console.log(result)
                        actor.addFilmActor(actors, film_id, function // Executes this function if addFilmCategory was successful
                            (err, result) {

                            if (!err) {
                                let toReturn = {

                                    "success": result

                                };

                                res.status(201).send(toReturn) // Returns the customer_id of the newly inserted customer if successful
                            }

                            else if (err.errno == 1048) {
                                res.status(400).send(noData) // Returns an error message if there is missing information from the body
                            }

                            else {
                                res.status(500).send(errMsg) // Returns internal server error
                            }

                        })

                    }

                }

                else if (err.errno == 1048) {
                    res.status(400).send(noData) // Returns an error message if there is missing information from the body
                }


                else {
                    res.status(500).send(errMsg) // Returns internal server error
                }

            })

        }

        else if (err.errno == 1048) {
            res.status(400).send(noData) // Sends no missing data msg if data is missing from the body
        }

        else {

            res.status(500).send(errMsg); // If error within the system or server return an internal server error msg

        }

    });

});


module.exports = app;