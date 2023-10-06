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
      //console.log(data, equipment);
    });
    const emojis = [
      /*
      */
      `a:star:751817179053424704`,
      `a:one:764910636974604328`,
      `a:cross:751443454244159519`,
      `a:checkmark1:751806451474890752`,
      `a:trophy:751819076757749860`,
      `a:switchArrows:751815223635214416`,
      `a:sbc:751850029358121000`,
      `a:processing:751443517678813245`,
      `a:pingPong:751821635199172638`,
      `a:pepeMaskJam:751443538532892783`,
      `a:peepoJam:751428076285722665`,
      `a:market:752814593159725106`,
      `a:loading:751443495104938014`,
      `a:hero:752812855358783560`,
      `a:game:752811402866982952`,
      `a:football:751811132834054255`,
      `a:crabDance:751080988250996736`,
      `a:coin:751813392989290546`,
      `a:chess1:751820693959868517`,
      `a:chess:751820618890084412`,
      `a:checkmark:751443477417426964`,
      `a:announcement:751806445254606928`,
      `a:8ball:751810566661734460`,
      `a:diamond:1159623409169350748`,
      /*
      */
      `:nanaWow:1159633715333435392`,
      `:lolitaWle:1159633686740877403`,
      `:chou:1159633645145964695`,
      `:aluCool:1159633608542257153`,
      `:laylalaugh:1159356821878870216`,
      `:laylacry:1159358890358607904`,
      `:laylalove:1159358858427383898`,
      `:laylawle:1159358828496814081`,
      /*
      */
    ];
    const emoji = emojis[
      (Math.floor(Math.random() * emojis.length))
    ];
		return interaction.reply(
      `> ## [__***Pong !***__](https://eruditio.onrender.com/)`
      + `   <${emoji}>`
    );
	},
};
