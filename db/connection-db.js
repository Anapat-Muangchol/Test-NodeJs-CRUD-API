const mysql = require('mysql');

// connection to mysql database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'user1',
    password: 'P@ssw0rd',
    database: 'nodejs_api'
});
con.connect();

module.exports = {
    con
}