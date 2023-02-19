import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from "firebase/app";

export const useFcmToken = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDqKkaeXh4OcK7t5KHRn_9aWcnSpZ0yr-U",
    authDomain: "event-planner-372620.firebaseapp.com",
    projectId: "event-planner-372620",
    storageBucket: "event-planner-372620.appspot.com",
    messagingSenderId: "1093637141452",
    appId: "1:1093637141452:web:208397bc3f40d47c07a369",
  };

  let token = [];
  let messageNotification = {};
  initializeApp(firebaseConfig);
  const messaging = getMessaging();

  const requestPermission = () => {
    return new Promise((resolve) => {
      console.log("Requesting permission...");
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");

          getToken(messaging, {
            vapidKey:
              "BJMw2mDU6-56d8N6iWTNUJT9vX-9fk6ZXrOoPlk0WyryZNCaqvSOsOAvmMXnU5uw3O7MBugMRKAzpWVIQZ570qA",
          })
            .then((currentToken) => {
              if (currentToken) {
                token = currentToken;
                resolve(token);
              } else {
                // Show permission request UI
                console.log(
                  "No registration token available. Request permission to generate one."
                );
                // ...
              }
            })
            .catch((error) => {
              console.log(error);
            });
          return token;
        } else {
          console.log("no permission");
          resolve(null);
        }
        return token;
      });
    });
  };
  const retrieveMessage = () => {
    return new Promise((resolve) => {
      onMessage(messaging, (payload) => {
        console.log("payload", payload);
        messageNotification = payload;
        resolve(payload);
      });
    });
  };

  console.log("messageNotification ", messageNotification) 

  /* onBackgroundMessage(messaging, (payload) => {
      console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload
      );
      // Customize notification here
      const notificationTitle = "Background Message Title";
      const notificationOptions = {
        body: "Background Message body.",
      };
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notificationTitle, notificationOptions);
      });
    }); */

  //   console.log(token);
  return { requestPermission, retrieveMessage };
};
