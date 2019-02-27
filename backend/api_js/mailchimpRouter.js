const express = require('express');
const request = require('superagent');
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
const mailchimpInstance   = process.env.MCINSTANCE;
const listUniqueId        = process.env.MCLIST;
const mailchimpApiKey     = process.env.MCAPI;

const router = express.Router();

router.get('/mailchimp', (req, res) => {
  res.send(`Hello from port 5001 mailchimp`);
});

router.post('/mailchimp/subscribe', (req, res) => {
  const { email, first_name, last_name } = req.body;
  request
  .post('https://' + mailchimpInstance + '.api.mailchimp.com/3.0/lists/' + listUniqueId + '/members/')
  .set('Content-Type', 'application/json;charset=utf-8')
  .set('Authorization', 'Basic ' + new Buffer('any:' + mailchimpApiKey ).toString('base64'))
  .send({
    'email_address': email,
    'status': 'subscribed',
    'merge_fields': {
      'FNAME': first_name,
      'LNAME': last_name
    }
  })
  .end(function(err, response) {
    if (response.status === 200 || (response.status === 400 && response.body.title === "Member Exists")) {
      return res.json({
        status: 'Success'
      });
    } else {
      return res.json({
        error: err
      });
    }
  });
});

module.exports = router;
