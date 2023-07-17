
//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02

var db = require('./databaseConfig.js');


var categoryDB = {
	
	// Method to get all the categories for the dropdown
	getCategory: function (callback) {

		var conn = db.getConnection();
		conn.connect(function (err) {
			if (err) {
				console.log(err);
				return callback(err, null);
			}
			else {
				console.log("Connected!");

				var sql = 'SELECT category_id, name FROM category ';
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
	}

};

module.exports = categoryDB;

