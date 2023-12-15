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

const roads = [
  'cornelia_road', 'cornelia',
];
function changeBg(value) {
  [].forEach.call(
    document.getElementsByClassName('treeWrapper')
    , function(el) {
    el.style.display = 'none';
  });
  const map = document.getElementById(`map${value}`);
  map.style.display = 'block';
  bg.style.backgroundImage
    = `url(/images/rpg/road/${roads[value]}.png)`
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

