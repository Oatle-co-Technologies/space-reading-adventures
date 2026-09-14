if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "Oatle Kids service worker registered:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error(
          "Oatle Kids service worker registration failed:",
          error
        );
      });
  });
}