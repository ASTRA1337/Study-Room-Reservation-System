/*
NOTE: 
MySQL 8.0.* use new authentication procotol by default which causing error when using 
packages like mysql2 since it does not support the new protocol.
In mysql, ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Password';
    FLUSH PRIVILIGES;
*/

const mysql = require('mysql2');

var config = {
    host: 'yourhostaddress',  //ex: localhost, 127.0.0.1
    user: 'yourusername', //update me
    password: 'yourpassword',  //update me
    database: 'yourdatabase',
    port: 3306,
};
connection = mysql.createConnection(config);
module.exports = connection;
