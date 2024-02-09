toggleShowServiceWorker.addEventListener('click', (event) => {
  const hidden =
    serviceWorkerContent.getAttribute('hidden') !== null;
  if (hidden) {
    setAboutServiceWorkerShown(true);
    serviceWorkerContent.removeAttribute('hidden');
    indicatorShowServiceWorker.classList.replace(
      'square-arrow-down-filled'
      , 'square-arrow-up-filled'
    );
  } else {
    setAboutServiceWorkerShown(false);
    serviceWorkerContent.setAttribute('hidden', '');
    indicatorShowServiceWorker.classList.replace(
      'square-arrow-up-filled'
      , 'square-arrow-down-filled'
    );
  }
});

if (isAboutServiceWorkerShown()) {
  toggleShowServiceWorker.click();
}
