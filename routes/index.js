var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const equipmentPath = './../data/mlbb/equipment';
const directoryPath = path.join(__dirname, equipmentPath);
const equipment = require(equipmentPath);

router.get('/', function(req, res, next) {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 

    const data = [];
    files.every(file => {
      data.push({
        name: file
        , items: require(`${equipmentPath}/${file}`)
      });
      return true;
    });

    const items = [];
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      data[i].name = path.parse(data[i].name).name;
      for (let j = 0; j < data[i].items.length; j++) {
        data[i].items[j].img = path.parse(
          data[i].items[j].img.replace(`%27`, `-`)
        ).base;
        data[i].items[j].id = count;
        count++;
        items.push(data[i].items[j]);
      }
    }

    for (let k = 0; k < equipment.length; k++) {
      Object.assign(equipment[k], items[k]);
      if (!equipment[k].tree) continue;
      for (let l = 0; l < equipment[k].tree.length; l++) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].items.length; j++) {
            if (
              data[i].items[j].name == equipment[k].tree[l].item
            ) {
              equipment[k].tree[l] = data[i].items[j];
              break;
            }
          }
        }
      }
    }

    for (let k = 0; k < equipment.length; k++) {
      Object.assign(equipment[k], items[k]);
      if (!equipment[k].builds) continue;
      for (let l = 0; l < equipment[k].builds.length; l++) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].items.length; j++) {
            if (
              data[i].items[j].name == equipment[k].builds[l].item
            ) {
              equipment[k].builds[l] = data[i].items[j];
              break;
            }
          }
        }
      }
    }

    res.render('index', {
      title: 'Express'
      , data: data
      , equipment: equipment
    });
  });
});

module.exports = router;
