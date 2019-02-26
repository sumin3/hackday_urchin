const express = require('express');
const mysql = require('mysql');
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

function getConnection (){
  return mysql.createPool({
    host: HOST,
    port: 3306,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    connectionLimit: 100
  })
}

const router = express.Router();
const connection = getConnection();

router.get('/mailchimp', (req, res) => {
  res.send(`Hello from port ${PORT} mailchimp`);
})

module.exports = router;
