var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const datapath = './../data/mlbb/equipment/';
const directoryPath = path.join(__dirname, datapath);

router.get('/', function(req, res, next) {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    const data = [];
    files.every(file => {
      data.push({
        name: file
        , items: require(`${datapath}${file}`)
      });
      return true;
    });
    for (let i = 0; i < data.length; i++) {
      data[i].name = path.parse(data[i].name).name;
      for (let j = 0; j < data[i].items.length; j++) {
        data[i].items[j].img = path.parse(
          data[i].items[j].img.replace(`%27`, `-`)
        ).base;
      }
    }
    res.render('index', {
      title: 'Express'
      , data: data
      , equipment: require('./../data/mlbb/equipment')
    });
  });
});

module.exports = router;
