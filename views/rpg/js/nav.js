function hideSubNav() {
  [].forEach.call(subNav.children, function(el) {
    el.style.display = 'none';
  });
}

function locationNav() {
  if (subNavLocation.style.display === 'block') {
    subNavLocation.style.display = 'none';
  } else {
    hideSubNav();
    subNavLocation.style.display = 'block';
  }
}

function changeBg(value) {
  bgTop.style.backgroundImage
    = `url(/images/rpg/bg${value}/part1.png)`
  ;
  bg.style.backgroundImage
    = `url(/images/rpg/bg${value}/part2.png)`
  ;
}

function userNav() {
  if (subNavUser.style.display === 'block') {
    subNavUser.style.display = 'none';
  } else {
    hideSubNav();
    subNavUser.style.display = 'block';
  }
}

function walk(self) {
  if (self.src.includes('footprint.png')) {
    player.state = 'walking';
    self.src = '/images/icons/footprint-stop.png';
  } else {
    player.state = 'idling';
    self.src = '/images/icons/footprint.png';
  }
}

