const fs = require('node:fs');
const cheerio = require('cheerio');

let html = '';
try {
  html = fs.readFileSync(
    './data/mlbb/tournaments/MPL/Indonesia/Seasons/13/week1.html'
  , 'utf8');
} catch (err) {
  console.error(err);
}

const $ = cheerio.load(html);

const list = $(
  'div.brkts-matchlist-match.brkts-match-has-details.brkts-match-popup-wrapper'
  + ' div.brkts-matchlist-cell-content'
);

separator = 4;
counter = 0;
const matches = [];
let match = {};
list.each(function(idx, el) {
  const val = $(el).text();
  if (counter === 0) {
    match.team = val;
  }
  if (counter === 1) {
    match.score1 = val;
  }
  if (counter === 2) {
    match.score2 = val;
  }
  if (counter === 3) {
    match.opponent = val;
  }
  counter++;

  if (counter === separator) {
    counter = 0;
    matches.push(match);
    match = {};
  }
});

console.log(JSON.stringify(matches, null, 2));
