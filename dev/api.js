var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// body parser stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/', function (req, res) {
  res.send('Hello World1111');
});
 
app.post('/test', function (req, res) {
  console.log(req.body);
  res.send('Hello World');
});
 
app.listen(3000 ,function (){

console.log('server listening...');
});