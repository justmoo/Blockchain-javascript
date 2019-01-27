const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./Blockchain');
const port = process.argv[2];
const uuid = require('uuid/v1');
const rp = require('request-promise');

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

    app.post('/register-and-broadcast-node', function (req, res) {
      const newNodeUrl = req.body.newNodeUrl;
     if(bitcoin.newtworkNodes.indexOf(newNodeUrl) == -1) bitcoin.newtworkNodes.push(newNodeUrl);
      const regNodesPromises= [];
     bitcoin.newtworkNodes.forEach(networkNodeUrl =>{
        const requestOptions ={
          uri: newNodeUrl + '/register-node',
          method:'POST',
          body:{newNodeUrl:newNodeUrl},
          json:true

      };
         regNodesPromises.push(rp(requestOptions));
      
     });

     Promise.all(regNodesPromises)
     .then(data=>{
      const bulkRegisterOptions= {
        uri:newNodeUrl + '/register-nodes-bulk',
        method:'POST',
        body:{allNetworkNodes:[...bitcoin.newtworkNodes, bitcoin.currentNodeUrl]},
        json: true

      };
      then(data=>{
        send.json({note:'Node registered.'})

      })
     })
    });

    app.post('/register-node', function (req, res) {
      const newNodeUrl = req.body.newNodeUrl;
      const nodeNotAlreadyPresent = bitcoin.newtworkNodes.indexOf == -1;
      const notCurrentNode = bitcoin.currentNodeUrl !== newNodeUrl;
      if (nodeNotAlreadyPresent && notCurrentNode)bitcoin.newtworkNodes.push(newNodeUrl);
      res.json({note:'new Node registered'});
    });

    app.post('/register-nodes-bulk', function (req, res) {
        
    });


});
app.listen(port ,function (){

console.log(`server listening on ${port}...`);
});