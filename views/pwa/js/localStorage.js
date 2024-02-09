function isAboutServiceWorkerShown() {
  return app.states.main.about.serviceWorker.shown;
}

function setAboutServiceWorkerShown(flag) {
  app.states.main.about.serviceWorker.shown = flag;
  save(app);
}

function getActiveNav() {
  return app.states.nav;
}

function setActiveNav(i) {
  app.states.nav = i;
  save(app);
}

const previousAppInit = {
  states: {
    nav: 3,
  },
};
const appInit = {
  states: {
    nav: 3,
    main: {
      about: {
        serviceWorker: {
          shown: false,
        }
      }
    }
  },
};
if (localStorage.getItem('app') === null) {
  console.log('initial install');
  save(appInit);
}
if (load().states.main === undefined) {
  console.log('update localStorage');
  appInit.states.nav = load().states.nav;
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

