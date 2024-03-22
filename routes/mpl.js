var express = require('express');
var router = express.Router();

const teams = require(
  "./../data/mlbb/teams/MPL/Indonesia/data.json"
);
const data = require(
  "./../data/mlbb/tournaments/MPL/Indonesia/Seasons/13/data.json"
);
const pickBans = require(
  './../data/mlbb/tournaments/MPL/Indonesia/Seasons/13/regular/'
  + 'weeks/1/heroes.json'
);

router.get('/', function(req, res, next) {
  const weeks = [];
  for (let i = 0; i < data.regular.length; i++) {
    const week = {
      scores: data.regular[i],
      pickBans: pickBans,
    };
    weeks.push(week);
  }
  res.render('mpl', {
    title: ` MLBB - Tournament | MPL`,
    teams: teams,
    data: weeks,
  });
});

module.exports = router;
