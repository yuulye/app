const fs = require('node:fs');
const cheerio = require('cheerio');

let html = '';
try {
  html = fs.readFileSync(
    './data/mlbb/tournaments/MPL/Indonesia/Seasons/'+
    '13/stats/heroes.html'
  , 'utf8');
} catch (err) {
  console.error(err);
}

const $ = cheerio.load(html);

const list = $(
  'td'
);

const data = [];
let hero = {};

counter = 0;
list.each(function(idx, el) {
  let val = '';
  if ($(el).find('b').text()) {
    val = $(el).find('b').text();
  } else {
    val = $(el).text();
  }
  if (counter === 0) {
    hero.name = val;
  }
  if (counter === 1) {
    hero.pick = parseInt(val);
  }
  if (counter === 2) {
    hero.ban = parseInt(val);
  }
  if (counter === 3) {
    hero.win = parseInt(val);
  }
  if (counter === 4) {
    hero.winRate = parseInt(val);
  }
  counter++;
  if (counter >= 5) {
    if (
      hero.pick > 0 ||
      hero.ban > 0
    ) data.push(hero);
    hero = {};
    counter = 0;
  }
});

console.log(JSON.stringify(data, null, 2));
