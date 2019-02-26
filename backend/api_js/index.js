const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');


const app = express();
const router = express.Router();
const HOST = process.env.HOST;
const PORT = process.env.PORT || 5001; // app running on
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const connection = getConnection();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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

app.get('/', (req, res) => {
  res.send(`Hello from port ${PORT}`)
})

router.post('/user', (req, res) => {
  const { name, parent_id, updated_by, active, points } = req.body;
  const QUERY = 'INSERT INTO users (first_name, last_name)' + ' VALUES (' +
    connection.escape(first_name) + ', ' +
    connection.escape(last_name) + ');';
  connection.query(QUERY, (err, results) => {
    if (err) {
      return res.json({
        status: err
      });
    }
    else {
      return res.json({
        status: "success"
      });
    }
  });
});

app.listen(PORT, () => {
});
