var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// body parser stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/', function (req, res) {
  res.send('welcome');
});
 
app.post('/send', function (req, res) {
  console.log(req.body);
  res.send(`the amount is : ${req.body.amount} `);
});
 
app.listen(3000 ,function (){

console.log('server listening...');
});