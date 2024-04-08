var express = require('express');
var router = express.Router();

const teams = require(
  "./../data/mlbb/teams/MPL/Indonesia/data.json"
);
const heroes = require(
  "./../data/mlbb/heroes/data.json"
);
const data = require(
  "./../data/mlbb/tournaments/MPL/Indonesia/Seasons/13/"
  + "regular/week01.json"
);

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].matches.length; j++) {
    data[i].matches[j].team1 = teams[data[i].matches[j].team1];
    data[i].matches[j].team2 = teams[data[i].matches[j].team2];
    for (let k = 0; k < data[i].matches[j].games.length; k++) {
      if (k == 0) {
        data[i].matches[j].team1Score = 0;
        data[i].matches[j].team2Score = 0;
      }
      const winner = data[i].matches[j].games[k].info['winner'];
      data[i].matches[j][`team${winner}Score`] += 1;
      if (data[i].matches[j][`team${winner}Score`] === 2) {
        data[i].matches[j].winner = winner;
      }
      for (
        let l = 0;
        l < data[i].matches[j].games[k].heroes.length;
        l++
      ) {
        for (
          let m = 0;
          m < data[i].matches[j].games[k].heroes[l].length;
          m++
        ) {
          data[i].matches[j].games[k].heroes[l][m]
          = heroes[data[i].matches[j].games[k].heroes[l][m]];
          data[i].matches[j].games[k].bans[l][m]
          = heroes[data[i].matches[j].games[k].bans[l][m]];
        }
      }
    }
  }
}

router.get('/', function(req, res, next) {
  res.render('mpl', {
    title: ` MLBB - Tournament | MPL`,
    teams: teams,
    data: data,
  });
});

module.exports = router;
