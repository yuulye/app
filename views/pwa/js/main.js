if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/pwa/sw.js', { scope: '/pwa/' });
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
