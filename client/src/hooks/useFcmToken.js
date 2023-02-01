import { getMessaging, getToken } from "firebase/messaging";
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
  initializeApp(firebaseConfig);

  const requestPermission = () => {
    return new Promise((resolve) => {
      console.log("Requesting permission...");
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");

          const messaging = getMessaging();
          getToken(messaging, {
            vapidKey:
              "BJMw2mDU6-56d8N6iWTNUJT9vX-9fk6ZXrOoPlk0WyryZNCaqvSOsOAvmMXnU5uw3O7MBugMRKAzpWVIQZ570qA",
          })
            .then((currentToken) => {
              if (currentToken) {
                token = currentToken;
                resolve(currentToken);
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

  //   console.log(token);
  return { requestPermission };
};
