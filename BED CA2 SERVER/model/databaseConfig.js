//Name: Wong Wei Jun Daniel
//Admin Num: p2243564
//Class: DIT/FT/1B/02

var mysql = require('mysql');

var dbconnect = {
getConnection: function() {
    var conn = mysql.createConnection({
    host: "localhost",
    user: "bed_dvd_root",
    password: "pa$$woRD123",
    database: "bed_dvd_db"
});
return conn;
}
};

module.exports = dbconnect