const packageJson = require('./package');
const debug = require('debug')(`${packageJson.name}:util`);
const fs = require('fs');
const merge = require('deepmerge');

function checkFileExistsSync(filepath) {
  debug(`checking filepath ${filepath}`);
  if (fs.existsSync(filepath)) return true;
  return false;
}

const localConfigPath = 'config.json';

let config = false;

function init() {
  if (config) return config;
  let data = {
    app: {
      name: packageJson.name,
    },
    discord: {
      bot: {
        token: "yangmrogramorangnyaganteng"
      }
    },
  };
  if (!checkFileExistsSync(`./${localConfigPath}`)) {
    debug(`File config.json is not exists!`);
    debug(`Checking process.env.config...`);
    if (process.env.config) {
      debug(`Using process.env.config...`);
      data = merge(data, JSON.parse(process.env.config));
    } else {
      debug(`couldn't find any config!`);
    }
  } else {
    debug(`Using config.json...`);
    data = merge(data, require(`./${localConfigPath}`));
  }
  config = data;
  return config;
}

exports.config = () => {
  return init();
};

