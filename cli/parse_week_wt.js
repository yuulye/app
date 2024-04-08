const fs = require('node:fs');
let raw = "error";
try {
  raw = fs.readFileSync(
    './data/mlbb/tournaments/MPL/Indonesia/Seasons/13/regular/week01.wikitext'
    , 'utf8'
  );
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

  const vod = /\|map[0-9]=\{\{Map\|vod=(.*)/.exec(line);
  if (vod) {
    gameData = {vod: vod[1]};
    matchData.games.push(gameData);
  }

  const gameInfo = /\|team1side=(.*)\|team2side=(.*)\|length=(.*)\|winner=(.)/.exec(line);
  if (gameInfo) {
    gameData.info = {
      team1: gameInfo[1],
      team2: gameInfo[2],
      time: gameInfo[3],
      winner: gameInfo[4],
    };
  }

  const heroes_ = line.match(/\|t[0-9]h[0-9]=(\w+)/g);
  if (heroes_) {
    const heroes = heroes_.map((x) => x.replace(/\|t[0-9]h[0-9]=/, ''));
    if (!gameData.heroes) gameData.heroes = [];
    gameData.heroes.push(heroes);
  }

  const bans_ = line.match(/\|t[0-9]b[0-9]=(\w+)/g);
  if (bans_) {
    const bans = bans_.map((x) => x.replace(/\|t[0-9]b[0-9]=/, ''));
    if (!gameData.bans) gameData.bans = [];
    gameData.bans.push(bans);
  }

}

console.log(JSON.stringify(data, null, 2));
