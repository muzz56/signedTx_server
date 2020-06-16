var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {

  const Web3 = require('web3');
  var Tx = require('ethereumjs-tx').Transaction;
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  var accounts = await web3.eth.getAccounts();
  console.log("Accounts:", accounts);

  const contractAddress = '0x395af597f89E3F768cD4EA3a766cE743126849df';
  const ABI = require('./stock_abi.json');
  var TestContract = new web3.eth.Contract(ABI, contractAddress);

  const account = '0x1FC46615FfF8639823882A03Aff68298bc0e3041';
  const privateKey = Buffer.from('49333f80495b7c698bb44168dea3ff4e7a0f6907808ab35f9e0bab9f985407f1', 'hex');
  const newAddress = '0xdb7c4f44e6Db440D7a257b9e1A96aB5AC206d7C3';
  const _data = TestContract.methods.setStock(web3.utils.fromAscii("Lab4"), 18, 214).encodeABI();

  _nonce = await web3.eth.getTransactionCount(account);

    var rawTx = {
      nonce: _nonce,
      gasPrice: '0x20000000000',
      gasLimit: '0x27511',
      to: contractAddress,
      value: 0,
      data: _data
    }
    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();
    
    var _receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    console.log("Receipt:", _receipt);
    

  res.render('index', { title: 'Express', receipt: JSON.stringify(_receipt) });
});

module.exports = router;
