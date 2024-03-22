const fs = require('node:fs');
const cheerio = require('cheerio');

let html = '';
try {
  html = fs.readFileSync(
    './data/mlbb/teams/MPL/Indonesia/raw.html'
  , 'utf8');
} catch (err) {
  console.error(err);
}

const $ = cheerio.load(html);

const list = $('tr td.grouptableslot');

const data = [];
list.each(function(idx, el) {
  data.push({
    name: $(el).find('span').data('highlightingclass'),
  });
});

console.log(data);
