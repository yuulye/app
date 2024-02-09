import * as init from './print.js';

init.start(() => {
  console.log('finish loading!');
});

toggleShowServiceWorker.addEventListener('click', (event) => {
  const hidden =
    serviceWorkerContent.getAttribute('hidden') !== null;
  if (hidden) {
    //setAboutServiceWorkerShown(true);
    serviceWorkerContent.removeAttribute('hidden');
    indicatorShowServiceWorker.classList.replace(
      'square-arrow-down-filled'
      , 'square-arrow-up-filled'
    );
  } else {
    //setAboutServiceWorkerShown(false);
    serviceWorkerContent.setAttribute('hidden', '');
    indicatorShowServiceWorker.classList.replace(
      'square-arrow-up-filled'
      , 'square-arrow-down-filled'
    );
  }
});

const navs = document.querySelectorAll("nav > div div");
const mains = document.querySelectorAll("main > div");

let active = 3;
function setActiveNav(i) {
  active = i;
}

function getActiveNav() {
  return active;
}

navs.forEach((nav, i) => {
  nav.onclick = (event) => {
    if (nav.classList.contains('active')) return;
    setActiveNav(i);
    navs.forEach((nav) => { nav.classList.remove('active');});
    mains.forEach((main, j) => {
      if (j !== getActiveNav()) main.style.display = 'none';
      else main.style.display = 'block';
    });
    const el = event.target;
    el.classList.add('active');
  };
});

navs[getActiveNav()].click();

