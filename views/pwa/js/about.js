toggleShowServiceWorker.addEventListener('click', (event) => {
  const hidden =
    serviceWorkerContent.getAttribute('hidden') !== null;
  if (hidden) {
    serviceWorkerContent.removeAttribute('hidden');
    indicatorShowServiceWorker.classList.replace(
      'square-arrow-down-filled'
      , 'square-arrow-up-filled'
    );
  } else {
    serviceWorkerContent.setAttribute('hidden', '');
    indicatorShowServiceWorker.classList.replace(
      'square-arrow-up-filled'
      , 'square-arrow-down-filled'
    );
  }
});
