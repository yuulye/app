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
