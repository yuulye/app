var express = require('express');
var router = express.Router();
const data = require(
  './../data/mlbb/tournaments/MPL/Indonesia/Seasons/'
  + '13/stats/heroes.json'
);

router.get('/', function(req, res, next) {
  res.render('mplStats', {
    title: `MPL ID - Stats`,
    data: data,
  });
});

module.exports = router;
