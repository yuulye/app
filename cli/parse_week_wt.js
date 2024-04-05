const fs = require('node:fs');
let raw = "error";
try {
  raw = fs.readFileSync('./data/mlbb/tournaments/MPL/Indonesia/Seasons/13/regular/week01.wikitext', 'utf8');
} catch (err) {
  console.error(err);
}

raw = raw.split("\n");

const data = [];
let dayData = {};
let matchData = {};
let gameData = {};

for (let i = 0; i < raw.length; i++) {
  const line = raw[i];
  console.log(line);

  const day = /\|M[0-9]+header=(.*)/.exec(line);
  if (day) {
    dayData = {date: day[1], matches: []};
    data.push(dayData);
  }

  const match = /\|M[0-9]+=\{\{Match\|bestof=3\|mvp=(.*)/.exec(line);
  if (match) {
    matchData = {mvp: match[1], games: []};
    dayData.matches.push(matchData);
  }

  const time = /\t\|date=(.*)\{\{/.exec(line);
  if (time) {
    matchData.time = time[1];
  }

  const casters = /\|caster1=(.*)\|caster2=(.*)\|caster3=(.*)/.exec(line);
  if (casters) {
    matchData.casters = [casters[1], casters[2], casters[3]];
  }

  const team1 = /\|opponent1=\{\{TeamOpponent\|(.*)\}\}/.exec(line);
  if (team1) {
    matchData.team1 = team1[1];
  }

  const team2 = /\|opponent2=\{\{TeamOpponent\|(.*)\}\}/.exec(line);
  if (team2) {
    matchData.team2 = team2[1];
  }

  const vod = /\|map1=\{\{Map\|vod=(.*)/.exec(line);
  if (vod) {
    gameData = {vod: vod[1]};
    matchData.games.push(gameData);
  }

}

console.log(JSON.stringify(data, null, 2));
