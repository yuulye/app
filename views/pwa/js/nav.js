const navs = document.querySelectorAll("nav > div div");
const mains = document.querySelectorAll("main > div");

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

