const bgEl = document.getElementById('bg');
const bgPos = {x: -10, y: -60, id: 0};
const bgWidth = 490;
const bgHeight = 266;
const bgCount = 38;
const bgCol = 5;

bgEl.style.animationPlayState = 'paused';

function changeBG() {
  console.log(bg);
  bgPos.x -= bgWidth;
  if (bgPos.id < bgCount - 1) {
    bgPos.id++;
    if (bgPos.id % bgCol == 0) {
      bgPos.x = -10;
      bgPos.y -= bgHeight;
    }
  } else {
    bgPos.id = 0;
    bgPos.x = -10;
    bgPos.y = -60;
  }
  bg.style.backgroundPositionX = `${bgPos.x}px`;
  bg.style.backgroundPositionY = `${bgPos.y}px`;
  console.log(bgPos, bg.style);
}

let toggle = true;
const playerEl = document.getElementById('char');
const player = {x: -4, y: -4, id: 0, pose: 0};
const playerCount = 6;
const poseCount = 5;
const idlePose = {
  counter: 0, pos: [
    -4, -324, -284, -324, -4, -244, -244, -244, -244
  ],
  delay: 2, delayCounter: 0
};

function walk(self) {
  console.log(self);
  const text = self.getElementsByTagName('h3')[0].innerHTML;
  if (text === 'Walk') {
    self.getElementsByTagName('h3')[0].innerHTML = 'Stop';
    changePose(4);
  } else {
    self.getElementsByTagName('h3')[0].innerHTML = 'Walk';
    changePose(0);
  }
}

function changePose(pose = true) {
  bgEl.style.animationPlayState = 'paused';
  if (pose === true) player.pose++;
  else player.pose = pose;
  console.log(pose);
  if (player.pose < poseCount) {
    if (player.pose == 0) {
      player.x = -4;
      idlePose.counter = 0;
      idlePose.delayCounter = 0;
    } else if (player.pose == 1) {
      player.x = -244;
    } else if (player.pose == 2) {
      player.x = -364;
    } else if (player.pose == 4) {
      bgEl.style.animationPlayState = 'running';
    }
  } else {
    changePose(0);
  }
}

setInterval(function() {
  if (player.pose == 0) {
    if (idlePose.delayCounter === idlePose.delay) {
      if (idlePose.counter === idlePose.pos.length) {
        idlePose.counter = 0;
      }
      playerEl.style.backgroundPositionX
        = `${idlePose.pos[idlePose.counter]}px`;
      idlePose.counter++;
      idlePose.delayCounter = 0;
    }
    idlePose.delayCounter++;
  } else if (player.pose == 1 || player.pose == 2) {
    playerEl.style.backgroundPositionX = `${player.x}px`;
  } else if (player.pose == 3) {
    playerEl.style.backgroundPositionX = `${toggle?-404:-444}px`;
  } else if (player.pose == 4) {
    playerEl.style.backgroundPositionX = `${toggle?-4:-44}px`;
  }
  toggle = !toggle;
}, 500);

function changePlayer() {
  player.id++;
  if (player.id < playerCount) {
    player.y -= 40;
  } else {
    player.y = -4;
    player.id = 0;
  }
  playerEl.style.backgroundPositionY = `${player.y}px`;
}
