if (Notification.permission === "granted") {
  notificationIndicator
    .classList.remove('brand-x-filled', 'danger');
  notificationIndicator
    .classList.add('check', 'success');
} else {
  notificationIndicator
    .classList.remove('check', 'success');
  notificationIndicator
    .classList.add('brand-x-filled', 'danger');
}

function randomNotification() {
  const randomItem = Math.floor(Math.random() * games.length);
  const notifTitle = games[randomItem].name;
  const notifBody = `Created by ${games[randomItem].author}.`;
  const notifImg = `data/img/${games[randomItem].slug}.jpg`;
  const options = {
    body: notifBody,
    icon: notifImg,
  };
  new Notification(notifTitle, options);
  setTimeout(randomNotification, 30000);
}

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

if (navigator.onLine) {
  onlineIndicator.classList.remove('danger');
  onlineIndicator.classList.add('success');
} else {
  onlineIndicator.classList.remove('success');
  onlineIndicator.classList.add('danger');
}
window.addEventListener("online", () => {
  onlineIndicator.classList.remove('danger');
  onlineIndicator.classList.add('success');
});
window.addEventListener("offline", () => {
  onlineIndicator.classList.remove('success');
  onlineIndicator.classList.add('danger');
});

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

<%- include('service-worker.js') %>
