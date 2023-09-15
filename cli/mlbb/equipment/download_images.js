const path = require('path');
const fs = require('fs');
const datapath = './../../../data/mlbb/equipment/';
const directoryPath = path.join(__dirname, datapath);
const https = require('https');

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  files.every(file => {
    console.log(file); 
    const items = require(`${datapath}${file}`);
    items.every(item => {
      download(`https://liquipedia.net/${item.img}`);
      return true;
    });
    return true;
  });
});

function download(url) {
  const clean = url.replace(`%27`, `-`);
  if (clean !== url) {
    console.log(`!!!`, clean, url);
  }
  const imageName = `./public/images/mlbb/equipment/${
    path.basename(clean)
  }`;
  const file = fs.createWriteStream(imageName);

  https.get(url, response => {
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Image downloaded as ${imageName}`);
    });
  }).on('error', err => {
    fs.unlink(imageName);
    console.error(`Error downloading image: ${err.message}`);
  });
}
