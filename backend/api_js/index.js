const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const mailchimpRouter = require('./mailchimpRouter.js');


const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5001; // app running on

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(mailchimpRouter);

app.listen(PORT, () => {
});
