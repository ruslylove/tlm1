const pushServerPublicKey = "BIN2Jc5Vmkmy-S3AUrcMlpKxJpLeVRAfu9WBqUbJ70SJOCWGCGXKY-Xzyh7HDr6KbRDGYHjqZ06OcS3BjD7uAm8";

/**
 * checks if Push notification and service workers are supported by your browser
 */
function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
 */
async function askUserPermission() {
  return await Notification.requestPermission();
}
/**
 * shows a notification
 */
function sendNotification() {
  const img = "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg";
  const text = "Take a look at this brand new t-shirt!";
  const title = "New Product Available";
  const options = {
    body: text,
    icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
    vibrate: [200, 100, 200],
    tag: "new-product",
    image: img,
    badge: "https://spyna.it/icons/android-icon-192x192.png",
    actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
  };
  navigator.serviceWorker.ready.then(function (serviceWorker) {
    serviceWorker.showNotification(title, options);
  });
}

/**
 *
 */
function registerServiceWorker() {

  //Check for browser support of service worker
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/sw.js')
  //     .then(function (reg) {
  //       var serviceWorker;
  //       if (reg.installing) {
  //         serviceWorker = reg.installing;
  //         // console.log('Service worker installing');
  //       } else if (reg.waiting) {
  //         serviceWorker = reg.waiting;
  //         // console.log('Service worker installed & waiting');
  //       } else if (reg.active) {
  //         serviceWorker = reg.active;
  //         // console.log('Service worker active');
  //       }

  //       if (serviceWorker) {
  //         console.log("sw current state", serviceWorker.state);
  //         if (serviceWorker.state == "activated") {
  //           //If push subscription wasnt done yet have to do here
  //           console.log("sw already activated - Do watever needed here");
  //         }
  //         serviceWorker.addEventListener("statechange", function (e) {
  //           console.log("sw statechange : ", e.target.state);
  //           if (e.target.state == "activated") {
  //             // use pushManger for subscribing here.
  //             console.log("Just now activated. now we can subscribe for push notification")
  //             // subscribeForPushNotification(reg);
  //           }
  //         });
  //       }


  //     }).catch(function (err) {
  //       // Failed registration, service worker won’t be installed
  //       console.log('Whoops. Service worker registration failed, error:', err);
  //     });
  // }




  return navigator.serviceWorker.register("/sw.js");
}

/**
 *
 * using the registered service worker creates a push notification subscription and returns it
 *
 */
async function createNotificationSubscription() {
  //wait for service worker installation to be ready
  const serviceWorker = await navigator.serviceWorker.ready;
  // subscribe and return the subscription
  return await serviceWorker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: pushServerPublicKey
  });
}

/**
 * returns the subscription if present or nothing
 */
function getUserSubscription() {
  //wait for service worker installation to be ready, and then
  return navigator.serviceWorker.ready
    .then(function (serviceWorker) {
      return serviceWorker.pushManager.getSubscription();
    })
    .then(function (pushSubscription) {
      return pushSubscription;
    });
}

export {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  sendNotification,
  createNotificationSubscription,
  getUserSubscription
};
