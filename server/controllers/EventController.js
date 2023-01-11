const { default: mongoose, Types } = require("mongoose");
const Event = require("../models/EventModel");
const User = require("../models/UserModel");

const getAndCheckOwnership = async (id, username) => {

  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "event not found!" });
    }

    // Check whether this resource belongs to the signed in user
    if (event.postedBy !== username) {
      throw new Error("You're not authorized to do this!");
    }
    return event;
  } catch (error) {
    throw new Error(error);
  }
};

// Create a Event
const createEvent = async (req, res) => {
  const { title, date, duration, description, participants } = req.body;
  const {username}=req.user

  //add to a database
  try {
    const event = await Event.create({
      title,
      date,
      duration,
      description,
      participants: participants.map((part) => new Types.ObjectId(part)),
      postedBy: username,
      /* user_id: req.user._id, */
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Read all Events
const getEvents = async (req, res) => {
  const {username, id} = req.user;
  try {
    const events = await Event.find({$or:[{postedBy: username}, {participants: id}]}).populate("participants", "username _id");
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//Read on Event by it's ID
const getEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found!" });
  }

  const event = await Event.findById(id);

  if (!event) {
    return res.status(404).json({ error: "Event not found!" });
  }

  res.status(200).json(event);
};

const updateEvent = async (req, res) => {
  const { id } = req.params;1
  const { username } = req.user;

  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found!" });
  }
  try {
    const updateEvent = await getAndCheckOwnership(id, username);
    if (!updateEvent) {
      return res.status(404).json({ err: "event not found!" });
    }
    await Event.findById({ _id: id });


    if (update.title) {
      updateEvent.title = update.title;
    }
    if (update.date) {
      updateEvent.date = update.date;
    }

    if (update.duration) {
      updateEvent.duration = update.duration;
    }
    if (update.description) {
      updateEvent.description = update.description;
    }
    if (update.participants) {
      updateEvent.participants = update.participants;
    }

    await updateEvent.save();
    return res.status(200).json(updateEvent);
  } catch (err) {
    res.status(400).json({ err: true, message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { username } = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found!" });
  }

  try {
    const eventDelete = await getAndCheckOwnership(id, username);
    if (!eventDelete) {
      return res.status(404).json({ err: "event not found!" });
    }
  await Event.findByIdAndDelete(id);
  return res.status(200).json({ message: "event deleted success" });
} catch (err) {
  res.status(400).json({ err: true, message: err.message });
}
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
