const { default: mongoose, Types } = require("mongoose");
const User = require("../models/UserModel");

const postInvitation = (req, res) => {
  const { invitations } = req.body;
  console.log("invitations",invitations)
  // send an invitation to each selected user
  invitations.forEach(async(invitation) => {
    const user = await User.findById({ _id : invitation });
    console.log("user",user)
    sendInvitation(user);
  });

  res.send("Invitations sent!");
};

const admin = require("firebase-admin");

const serviceAccount = require("../event-planner-372620-firebase-adminsdk-rta70-491fb04613.json");
console.log("serviceAccount",serviceAccount)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


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
  console.log("message", message)

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