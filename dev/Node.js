const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./Blockchain');
const port = process.argv[2];
const uuid = require('uuid/v1');

const nodeAddress = uuid().split('-').join('');

const bitcoin = new Blockchain();
// body parser stuff
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.get('/blockchain', function (req, res) {
  res.send(bitcoin);
});
 
app.post('/transaction', function (req, res) {
  const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender, req.body.recipient);
  res.json(`the transaction will be added in block : ${blockIndex}. `);
});
 
app.get('/mine', function (req, res) {
    const lastBlock = bitcoin.getLastBlock();
    const previousBlockHash = lastBlock['hash'];
    const currentBlockData = {
      transactions : bitcoin.pendingTransactions,
      index: lastBlock['index'] +1 

    };

    const nonce = bitcoin.proofOfWork(previousBlockHash,currentBlockData);
    const blockHash = bitcoin.hashBlock(previousBlockHash,currentBlockData,nonce);
    bitcoin.createNewTransaction(12.5,'00',nodeAddress);
    const newBlock = bitcoin.createNewBlock(nonce , previousBlockHash,blockHash);
    res.json({
      note: 'Block mined',
      block: newBlock

    });


});
app.listen(port ,function (){

console.log(`server listening on ${port}...`);
});