function addCloud(wrapper, type, x, y) {
  const cloud = document.createElement('div');
  cloud.className = `cloud cloud${type}`;
  wrapper.appendChild(cloud);
  cloud.style.left = `${x}px`;
  cloud.style.top = `${y}px`;
}

wrappers = document.getElementsByClassName('cloudWrapper');
wrapperPos = -480;
for (let j = 0; j < wrappers.length; j++) {
  const pool = [...Array(6).keys()];
  const posYs = [-10, 0, 10, 20, 30, 40];
  let pos = 0;
  for (let i = 0; i < 4; i++) {
    id = Math.floor(Math.random() * pool.length);
    picked = pool.splice(id, 1)[0];
    y = Math.floor(Math.random() * posYs.length);
    pickedY = posYs.splice(y, 1)[0];
    addCloud(wrappers[j], picked, pos, pickedY);
    pos+=120;
  }
  wrappers[j].pos = wrapperPos;
  wrappers[j].style.left = `${wrapperPos}px`;
  wrapperPos += 480;
}

setInterval(function() {
  for (let i = 0; i < wrappers.length; i++) {
    const wrapper = wrappers[i];
    wrapper.style.left = `${wrapper.pos}px`;
    wrapper.pos += .4;
    if (wrapper.pos > 480) wrapper.pos = -480;
  }
}, 50);
