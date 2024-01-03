function logState(state) {
  var liElement = document.createElement('li');
  liElement.textContent = state;
  states.appendChild(liElement);
}

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
    }).catch(function(error) {
      register.textContent
        = 'failed: ' + error;
    });
} else {
  availability.textContent = 'are not';
}
