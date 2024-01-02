let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  installPrompt = null;
  installButton.setAttribute("hidden", "");
});

function logState(state) {
  var liElement = document.createElement('li');
  liElement.textContent = state;
  document.querySelector('#states').appendChild(liElement);
}

if ('serviceWorker' in navigator) {
  document.querySelector('#availability').textContent = 'are';

  document.querySelector('#controlled').textContent
    = navigator.serviceWorker.controller ? 'is' : 'is not';

  navigator.serviceWorker.register('sw.js', {scope: './'}).then(
    function(registration) {
      document.querySelector('#register').textContent = 'succeeded';

      var serviceWorker;
      if (registration.installing) {
        serviceWorker = registration.installing;
        document.querySelector('#kind').textContent = 'installing';
      } else if (registration.waiting) {
        serviceWorker = registration.waiting;
        document.querySelector('#kind').textContent = 'waiting';
      } else if (registration.active) {
        serviceWorker = registration.active;
        document.querySelector('#kind').textContent = 'active';
      }

      if (serviceWorker) {
        logState(serviceWorker.state);
        serviceWorker.addEventListener('statechange', function(e) {
          logState(e.target.state);
        });
      }
    }).catch(function(error) {
      document.querySelector('#register').textContent
        = 'failed: ' + error;
    });
} else {
  document.querySelector('#availability').textContent = 'are not';
}

if (navigator.setAppBadge) {
  console.log("The App Badging API is supported!");
  navigator.setAppBadge(42).then(() => {
    console.log("The badge was added");
  }).catch(e => {
      console.error("Error displaying the badge", e);
  });
}
if ("Notification" in window) {
  console.log("The Notifications API is supported");
}
