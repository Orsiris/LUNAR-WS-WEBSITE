
//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02

var db = require('./databaseConfig.js');
var config = require('../config.js');
var jwt = require('jsonwebtoken');

var userDB = {
	
	// Method to login the admin
	loginUser: function (email, password, callback) {

		var conn = db.getConnection();

		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("Connected!");

				var sql = 'select * from staff where email=? and password=?'; // queries the staff table with login credentials

				conn.query(sql, [email, password], function (err, result) {
					conn.end();

					if (err) {
						console.log("Err: " + err);
						return callback(err, null, null);
					} else {
						var token = "";
						var i;
						if (result.length == 1) {

							token = jwt.sign({ id: result[0].staff_id, }, config.key, {
								expiresIn: 86400 //expires in 24 hrs
							});
							console.log("@@token " + token);
							return callback(null, token, result);


						} else {
							var err2 = new Error("UserID/Password does not match.");
							err2.statusCode = 500;
							return callback(err2, null, null);
						}
					}  //else
				});
			}
		});
	},

	

};

module.exports = userDB;

