function getActiveNav() {
  return app.states.nav;
}

function setActiveNav(i) {
  app.states.nav = i;
  save(app);
}

if (localStorage.getItem('app') === null) {
  const appInit = {
    states: {
      nav: 3,
    },
  };
  save(appInit);
}

const app = load();
console.log(app);

function save(data) {
  localStorage.setItem('app', JSON.stringify(data));
}

function load() {
  return JSON.parse(localStorage.getItem('app'));
}

