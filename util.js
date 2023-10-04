const fs = require('fs');

function checkFileExistsSync(filepath) {
  console.log(`checking filepath ${filepath}`);
  if (fs.existsSync(filepath)) return true;
  return false;
}

const localConfigPath = 'config.json';

exports.config = () => {
  let data = {
    discord: {
      bot: {
        token: "yangmrogramorangnyaganteng"
      }
    }
  };
  if (!checkFileExistsSync(`./${localConfigPath}`)) {
    console.log(`File config.json is not exists!`);
    console.log(`Checking process.env.config...`);
    if (process.env.config) {
      console.log(`Using process.env.config...`);
      data = process.env.config;
    } else {
      console.log(`couldn't find any config!`);
    }
  } else {
    console.log(`Using config.json...`);
    data = require(`./${localConfigPath}`);
  }
  console.log(data);
  return  data;
};

