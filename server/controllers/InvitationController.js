const { default: mongoose, Types } = require("mongoose");
const User = require("../models/UserModel");

const postInvitation = (req, res) => {
  const { invitations } = req.body;
  console.log("invitations",invitations)
  // send an invitation to each selected user
  invitations.forEach(async(invitation) => {
    const user = await User.findById({ _id: invitation });
    console.log("user",user)
    sendInvitation(user);
  });

  res.send("Invitations sent!");
};

const admin = require("firebase-admin");

//  Firebase config

/* const firebaseConfig = {
  apiKey: "AIzaSyDqKkaeXh4OcK7t5KHRn_9aWcnSpZ0yr-U",
  authDomain: "event-planner-372620.firebaseapp.com",
  projectId: "event-planner-372620",
  storageBucket: "event-planner-372620.appspot.com",
  messagingSenderId: "1093637141452",
  appId: "1:1093637141452:web:208397bc3f40d47c07a369",
};
admin.initializeApp({
  firebaseConfig,
}); */

function sendInvitation(user) {
  // get the user's push notification token
  const pushToken = user.fcmToken;
  console.log("pushToken", pushToken);

  // create the message to send
  const message = {
    notification: {
      title: "Event Invitation",
      body: "You are invited to an event!",
    },
    token: pushToken,
  };

  // send the message
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

module.exports = {
  postInvitation,
};
