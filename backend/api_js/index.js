const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const mailchimpRouter = require('./mailchimpRouter.js');


const app = express();
const PORT = process.env.PORT || 5001; // app running on
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
const connection = getConnection();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(mailchimpRouter);

app.get('/users', (req, res) => {
  const GET_USERS = 'SELECT * FROM users;';
  connection.query(GET_USERS, (err, results) => {
    if (err) {
      return res.json({
        status: err
      })
    }
    else {
      return res.json(results);
    }
  })
});

app.post('/user', (req, res) => {
  const { first_name, last_name, email, img_url, subscribe } = req.body;
  const ADD_USER = 'INSERT INTO users (first_name, last_name, email, img_url, subscribe)' + ' VALUES (' +
    connection.escape(first_name) + ', ' +
    connection.escape(last_name) + ', ' +
    connection.escape(email) + ', ' +
    connection.escape(img_url) + ', ' +
    connection.escape(subscribe) + ');';
  connection.query(ADD_USER, (err, results) => {
    if (err) {
      return res.json({
        status: err
      })
    }
    else {
      return res.json({
        status: "success"
      })
    }
  })
});

app.listen(PORT, () => {
});
