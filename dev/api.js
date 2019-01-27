const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./Blockchain');

const bitcoin = new Blockchain();
// body parser stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});
 
app.post('/send', function (req, res) {
  console.log(req.body);
  res.send(`the amount is : ${req.body.amount} `);
});
 
app.listen(3000 ,function (){

console.log('server listening...');
});