const bgPos = {x: -10, y: -10, id: 0};
const bgWidth = 490;
const bgHeight = 266;
const bgCount = 38;
const bgCol = 5;
function changeBG() {
  const bg = document.getElementById('bg');
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
    bgPos.x = bgPos.y = -10;
  }
  bg.style.backgroundPositionX = `${bgPos.x}px`;
  bg.style.backgroundPositionY = `${bgPos.y}px`;
  console.log(bgPos, bg.style);
}

let toggle = true;
const playerEl = document.getElementById('char');
const player = {x: -4, y: -4, id: 0, pose: 0};
const playerCount = 6;

const poseCount = 4;
function changePose() {
  player.pose++;
  if (player.pose < poseCount) {
    if (player.pose == 1) {
      player.x = -240;
    } else if (player.pose == 2) {
      player.x = -360;
    }
  } else {
    player.pose = 0;
  }
}

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

setInterval(function() {
  if (player.pose == 0) {
    playerEl.style.backgroundPositionX = `${toggle?-4:-44}px`;
  } else if (player.pose == 1 || player.pose == 2) {
    playerEl.style.backgroundPositionX = `${player.x}px`;
  } else if (player.pose == 3) {
    playerEl.style.backgroundPositionX = `${toggle?-404:-444}px`;
  }
  toggle = !toggle;
}, 500);
