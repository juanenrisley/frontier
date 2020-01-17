const express = require('express');
require('dotenv').config()
const app = express();

app.get('/hello', function (req, res) {
  res.send(`Hello World ${process.env.HOSTNAME}`);
})

app.get('/secret', function (req, res) {
  res.send(`The secret is... ${process.env.POC_SECRET}`);
})

console.log('Server starter at 3000');

app.listen(3000);
