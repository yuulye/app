if ('serviceWorker' in navigator) {
  availability.textContent = 'are';
  controlled.textContent
    = navigator.serviceWorker.controller ? 'is' : 'is not';
  navigator.serviceWorker.register('sw.js', {scope: '/pwa/'}).then(
    function(registration) {
      register.textContent = 'succeeded';
      var serviceWorker;
      if (registration.installing) {
        serviceWorker = registration.installing;
        kind.textContent = 'installing';
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;
        kind.textContent = 'waiting';
      } else if (registration.active) {
        serviceWorker = registration.active;
        kind.textContent = 'active';
      }
      if (serviceWorker) {
        logState(serviceWorker.state);
        serviceWorker.addEventListener('statechange', function(e) {
          logState(e.target.state);
        });
      }
    }
  ).catch(function(error) {
    register.textContent = 'failed: ' + error;
  });
  navigator.serviceWorker.addEventListener("message", (event) => {
    console.log(
      `The service worker sent me a message:`, event.data
    );
    appVersion.textContent = event.data.version
      ? event.data.version : 'unknown';
  });
  navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage("Hi service worker");
  });
} else {
  availability.textContent = 'are not';
}

function logState(state) {
  var liElement = document.createElement('li');
  liElement.textContent = state;
  states.appendChild(liElement);
}
