bg.style.animationPlayState = 'paused';

const playerStates = {
  idling: {
    counter: 0,
    frames: [-4, -324, -284, -324, -4, -244, -244, -244, -244],
    delay: 2, delayCounter: 0,
  },
  playingGuitar: {
    counter: 0,
    frames: [-404, -444, -404, -444, -404, -444, -404, -444, ],
    delay: 2, delayCounter: 0,
  },
  sleeping: {
    counter: 0,
    frames: [-364, -364, -364, -364, -364, -364, -364, -364, ],
    delay: 2, delayCounter: 0,
  },
};

/* --- Player --- */
let toggle = true;
let togglePlayerIcon = true;
const player = {
  x: -4, y: -4, id: 0, pose: 0, 
  state: "idling"
};
const playerCount = 6;
const poseCount = 5;
idlingCounter = 0;
idlingActivities = [
  'idling', 'playingGuitar', 'idling', 'playingGuitar',
  'sleeping', 'sleeping', 'sleeping',
  'sleeping', 'sleeping', 'sleeping',
];
