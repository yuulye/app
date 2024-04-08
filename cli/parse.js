console.log('parse.js');

const http = require('http');
const fs = require('node:fs');
const cheerio = require('cheerio');
const pretty = require('pretty');

let html = '';
try {
  html = fs.readFileSync('./data/mlbb/heroes/raw.html', 'utf8');
} catch (err) {
  console.error(err);
}

const $ = cheerio.load(html);

const list = $('li');
console.log(list);

const data = [];
list.each(function(idx, el) {
  data.push({
    name: $(el).find('p').text(),
    img: $(el).find('img').attr('src'),
  });
});

console.log(data);

function dl(item) {
  const {name, img} = item;
  const file = fs.createWriteStream(`./public/images/mlbb/heroes/${name}.png`);
  const request = http.get('http:'+img, function(response) {
     response.pipe(file);
     file.on("finish", () => {
         file.close();
         console.log("Download Completed");
     });
  });
}

const result = {};
for (let i = data.length - 1; i >= 0; i--) {
  const hero = data[i];
  result[hero.name.toLowerCase()] = {
    name: hero.name
  };
}

console.log(result);

fs.writeFile(
  './data/mlbb/heroes/data.json'
  , JSON.stringify(result, null, 2)
  , 'utf8'
  , function(){}
);

