const mysql = require('mysql2');
// import dotenv from "dotenv";
const dotenv = require("dotenv")
dotenv.config()

const dbconn = mysql.createConnection({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBDATABASE,
    port:process.env.DBPORT
});

module.exports = dbconn;