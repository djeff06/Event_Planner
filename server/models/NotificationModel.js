const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: Object,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  read: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    index: { expires: '1d' }, // Set TTL index to expire documents after 1 day
  },
});

const Notifications = mongoose.model('Notification', notificationSchema);

module.exports = Notifications;