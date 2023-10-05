const { SlashCommandBuilder } = require('discord.js');

const fs = require('fs');
const path = require('path');
const equipmentPath = './../../../data/mlbb/equipment';
const directoryPath = path.join(__dirname, equipmentPath);
const equipment = require(equipmentPath);

function process(cb) {
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 

    const data = [];
    files.every(file => {
      data.push({
        name: file
        , items: require(`${equipmentPath}/${file}`)
      });
      return true;
    });

    const items = [];
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      data[i].name = path.parse(data[i].name).name;
      for (let j = 0; j < data[i].items.length; j++) {
        data[i].items[j].img = path.parse(
          data[i].items[j].img.replace(`%27`, `-`)
        ).base;
        data[i].items[j].id = count;
        count++;
        items.push(data[i].items[j]);
      }
    }

    for (let k = 0; k < equipment.length; k++) {
      Object.assign(equipment[k], items[k]);
      equipment[k].calculatedPrice = equipment[k].price;
      const clone = JSON.parse(JSON.stringify(equipment[k]));
      Object.assign(items[k], clone);
    }

    for (let k = 0; k < equipment.length; k++) {
      if (!equipment[k].tree) continue;
      equipment[k].totalPrice = 0;
      for (let l = 0; l < equipment[k].tree.length; l++) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].items.length; j++) {
            if (
              data[i].items[j].name == equipment[k].tree[l].item
            ) {
              equipment[k].tree[l] = data[i].items[j];
              if (data[i].items[j].price)
                equipment[k].totalPrice += data[i].items[j].price;
              break;
            }
          }
        }
      }
      equipment[k].calculatedPrice =
        equipment[k].price - equipment[k].totalPrice;
    }

    for (let k = 0; k < equipment.length; k++) {
      if (!equipment[k].builds) continue;
      for (let l = 0; l < equipment[k].builds.length; l++) {
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < data[i].items.length; j++) {
            if (
              data[i].items[j].name == equipment[k].builds[l].item
            ) {
              equipment[k].builds[l] = data[i].items[j];
              break;
            }
          }
        }
      }
    }

    cb(data, equipment);
  });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
    process((data, equipment) => {
      console.log(data, equipment);
    });
    const emojis = [
      `:laylalaugh:1159356821878870216`,
      `:laylacry:1159358890358607904`,
      `:laylalove:1159358858427383898`,
      `:laylawle:1159358828496814081`,
    ];
    const emoji = emojis[
      (Math.floor(Math.random() * emojis.length))
    ];
		return interaction.reply(
      `<${emoji}> | Pong!`
    );
	},
};
