
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


/* ----- */
const listBlueRed = $(
  'div.brkts-popup-body-element.brkts-popup-body-game'
  + ' div > div'
);

const colors = [];
let colorsCounter = 0;
const colorsLimit = 4;
listBlueRed.each(function(idx, el) {
  const val = $(el).attr('class').split("-")[4];
  //console.log(val);
  colorsCounter++;
  if (colorsCounter >= colorsLimit) {
    colorsCounter = 0;
    colors.push(val);
  }
});

//console.log(colors);
/* ----- */



/* ----- */
const list = $(
  'div.brkts-popup-body-element.brkts-popup-body-game'
  + ' div > div'
);

counter = 0;
till = 5;

let heroes = [];
const groups = [];
const bans = [];

list.each(function(idx, el) {
  const val = $(el).find('a').attr('title');
  //console.log(val);
  heroes.push(val);
  counter++;
  if (counter === till) {
    //console.log('----------');
    counter = 0;
    groups.push(heroes);
    heroes = [];
  }
});
/* ----- */

// bans
//console.log('\n######## bans\n');

const listBan = $(
  'div.brkts-popup-mapveto'
  + ' td > div > div'
);

listBan.each(function(idx, el) {
  const val = $(el).find('a').attr('title');
  //console.log(val);
  heroes.push(val);
  counter++;
  if (counter === till) {
    //console.log('----------');
    counter = 0;
    bans.push(heroes);
    heroes = [];
  }
});

console.log(JSON.stringify({
  picks: groups, bans: bans, colors: colors,
}, null, 2));
