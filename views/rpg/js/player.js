function changePose(pose = true) {
  bg.style.animationPlayState = 'paused';
  if (pose === true) player.pose++;
  else player.pose = pose;
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
      bg.style.animationPlayState = 'running';
    }
  } else {
    changePose(0);
  }
}

setInterval(function() {
  switch (player.state) {
    case 'idling':
    case 'playingGuitar':
    case 'sleeping':
      bg.style.animationPlayState = 'paused';
      break;
    case 'walking':
      bg.style.animationPlayState = 'running';
      playerIcon.style.backgroundImage
        = `none`;
      break;
    default:
      break;
  }
  switch (player.state) {
    case 'idling':
      if (
        playerStates['idling'].delayCounter
          === playerStates['idling'].delay
      ) {
        if (playerStates['idling'].counter
          === playerStates['idling'].frames.length
        ) {
          playerStates['idling'].counter = 0;
          idlingCounter++;
          if (idlingCounter === idlingActivities.length)
            idlingCounter = 0;
          player.state = idlingActivities[idlingCounter];
          return;
        }
        playerEl.style.backgroundPositionX
          = `${
            playerStates['idling'].frames[
              playerStates['idling'].counter
            ]
          }px`;
        if (playerStates['idling'].frames[
            playerStates['idling'].counter
          ]
          === -244
        ) {
          playerIcon.style.backgroundImage
            = `url(images/rpg/icons.png)`;
          playerIcon.style.backgroundPositionX= `320px`;
          playerIcon.style.backgroundPositionY
            = togglePlayerIcon ? `22px` : `42px`;
        } else {
          playerIcon.style.backgroundImage
            = `none`;
        }
        togglePlayerIcon = !togglePlayerIcon;
        playerStates['idling'].counter++;
        playerStates['idling'].delayCounter = 0;
      }
      playerStates['idling'].delayCounter++;
      break;
    case 'playingGuitar':
      if (
        playerStates['playingGuitar'].delayCounter
          === playerStates['playingGuitar'].delay
      ) {
        if (playerStates['playingGuitar'].counter
          === playerStates['playingGuitar'].frames.length
        ) {
          playerStates['playingGuitar'].counter = 0;
          idlingCounter++;
          if (idlingCounter === idlingActivities.length)
            idlingCounter = 0;
          player.state = idlingActivities[idlingCounter];
          return;
        }
        playerEl.style.backgroundPositionX
          = `${
            playerStates['playingGuitar'].frames[
              playerStates['playingGuitar'].counter
            ]
          }px`;
        if (playerStates['playingGuitar'].frames[
            playerStates['playingGuitar'].counter
          ]
          === -444
        ) {
          playerIcon.style.backgroundImage
            = `url(images/rpg/icons.png)`;
          playerIcon.style.backgroundPositionX= `360px`;
          playerIcon.style.backgroundPositionY
            = `22px`;
        } else {
          playerIcon.style.backgroundImage
            = `url(images/rpg/icons.png)`;
          playerIcon.style.backgroundPositionX= `360px`;
          playerIcon.style.backgroundPositionY
            = `42px`;
        }
        playerStates['playingGuitar'].counter++;
        playerStates['playingGuitar'].delayCounter = 0;
      }
      playerStates['playingGuitar'].delayCounter++;
      break;
    case 'sleeping':
      if (
        playerStates['sleeping'].delayCounter
          === playerStates['sleeping'].delay
      ) {
        if (playerStates['sleeping'].counter
          === playerStates['sleeping'].frames.length
        ) {
          playerStates['sleeping'].counter = 0;
          idlingCounter++;
          if (idlingCounter === idlingActivities.length)
            idlingCounter = 0;
          player.state = idlingActivities[idlingCounter];
          return;
        }
        playerEl.style.backgroundPositionX
          = `${
            playerStates['sleeping'].frames[
              playerStates['sleeping'].counter
            ]
          }px`;
        if (togglePlayerIcon) {
          playerIcon.style.backgroundImage
            = `url(images/rpg/icons.png)`;
          playerIcon.style.backgroundPositionX= `280px`;
          playerIcon.style.backgroundPositionY
            = `22px`;
        } else {
          playerIcon.style.backgroundImage
            = `url(images/rpg/icons.png)`;
          playerIcon.style.backgroundPositionX= `280px`;
          playerIcon.style.backgroundPositionY
            = `42px`;
        }
        togglePlayerIcon = !togglePlayerIcon;
        playerStates['sleeping'].counter++;
        playerStates['sleeping'].delayCounter = 0;
      }
      playerStates['sleeping'].delayCounter++;
      break;
    case 'walking':
      playerEl.style.backgroundPositionX = `${toggle?-4:-44}px`;
      break;
    default:
      break;
  }

  /*
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
  */
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
