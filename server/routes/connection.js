var express = require('express');
var router = express.Router();


const mysql = require('mysql');

console.log(process.env.DATABASE)

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    database: process.env.DATABASE,
    password: process.env.DBPASSWORD,
    multipleStatements: true, //for more than one query in a get route
    debug: false
});

module.exports = pool; 