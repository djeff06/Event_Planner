const { default: mongoose, Types } = require("mongoose");
const User = require("../models/UserModel");
const Notifications = require("../models/NotificationModel");
const jwt = require("jsonwebtoken");

const postInvitation = async (req, res) => {
  const { invitations } = req.body;
  
  const token = req.headers.authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  const sender = _id;

  // send an invitation to each selected user
  invitations.forEach(async (invitation) => {
    const receiver = await User.findById({ _id: invitation });
    sendInvitation(receiver, sender);
  });

  res.send("Invitations sent!");
};


function sendInvitation(receiver, sender) {


  // create the message to send
  const message = {
    notification: {
      title: "Event Invitation",
      body: "You are invited to an event!",
    },
  };
  const newNotification = new Notifications({
    recipient: receiver,
    sender: sender,
    message: message,
  });

  newNotification.save((err, notification) => {
    if (err) {
      console.error(err);
    } else {
      console.log(notification);
    }
  });

  console.log("message", message);

}

const getInvitations = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    const invitation = await Notifications.find({recipient: _id});
    res.status(200).json(invitation);
    console.log("invitation",invitation)
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const updateInvitations = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  try {
    // Find all notifications for the recipient
    const invitations = await Notifications.find({ recipient: _id });

    // Update the 'read' property for all unread notifications that have been selected
    console.log("notification id",req.params.id)
    const selectedInvitations = invitations.filter(invitation => !invitation.read && invitation._id.equals(req.params.id));
    await Notifications.findByIdAndUpdate(
      selectedInvitations.map(invitation => invitation._id),
      { read: true }
    );
console.log("selectedInvitations",selectedInvitations)
    // Filter out disabled notifications and send the remaining ones
    const filteredInvitations = invitations.filter(invitation => !invitation.read);
    console.log("filteredInvitations",filteredInvitations)
    res.status(200).json(filteredInvitations);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  postInvitation,
  getInvitations,
  updateInvitations,
};