var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const uangPath = './../data/uang';
const directoryPath = path.join(__dirname, uangPath);
const dataUang = require(uangPath);

router.get('/', function(req, res, next) {
  const data = dataUang;
  res.render('uang', {
    title: req.app.get('title')
    , data: data
  });
});

module.exports = router;
