const navs = document.querySelectorAll("nav > div div");
const mains = document.querySelectorAll("main > div");
let active = -1;

navs.forEach((nav, i) => {
  nav.onclick = (event) => {
    if (active === i) return;
    active = i;
    navs.forEach((nav) => { nav.classList.remove('active');});
    mains.forEach((main, j) => {
      if (j !== active) main.style.display = 'none';
      else main.style.display = 'block';
    });
    const el = event.target;
    el.classList.add('active');
  };
});

navs[active===-1?1:active].click();

