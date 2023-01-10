const { default: mongoose, Types } = require("mongoose");
const Event = require("../models/EventModel");
const User = require("../models/UserModel");

// check creator
const getAndCheckOwnership = async (id, username) => {
  try {
    const event = await Event.findById(id);
    console.log("event found", event);
    if (!event) {
      return res.status(404).json({ message: "event not found!" });
      throw new Error("event not found!");
    }

    // Check whether this resource belongs to the signed in user
    if (!(event.postedBy == username)) {
      throw new Error("You're not authorized to do this!");
    }
    console.log("event to be returned", event);
    return event;
  } catch (error) {
    throw new Error(error);
  }
};

// Create a Event
const createEvent = async (req, res) => {
  const { title, date, duration, description, participants } = req.body;

  //add to a database
  try {
    const event = await Event.create({
      title,
      date,
      duration,
      description,
      participants: participants.map((part) => new Types.ObjectId(part)),
      /* user_id: req.user._id, */
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Read all Events
const getEvents = async (req, res) => {
  const id = req.params;
  const username = req.user
  const events = await getAndCheckOwnership({ id, username });
  if (events) {
    res.status(200).json(events);
  }
  await Event.find({ user_id: id }).populate("participants", "username _id");
  res.status(200).json(events);
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
  const { id  } = req.params;
  const update = req.body;
  const { username } = req.user;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found!" });
  }
  try {
    const event = await getAndCheckOwnership(id, username);

    if (!event) {
      return res.status(404).json({ error: "Event not found!" });
    }

    if (update.title) {
      event.title = update.title;
    }
    if (update.date) {
      event.date = update.date;
    }

    if (update.duration) {
      event.duration = update.duration;
    }
    if (update.description) {
      event.description = update.description;
    }
    if (update.participants) {
      event.participants = update.participants;
    }

    await event.save();
    console.log("updated event", event);
    return res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ err: true, message: err.message });
  }
};

/* if (!event) {
    return res.status(404).json({ error: "Event not found!" });
  }

  res.status(200).json(event);
}; */

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const { username } = req.user;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found!" });
  }

  const event = await getAndCheckOwnership(id, username);

  if (!event) {
    return res.status(404).json({ error: "Event not found!" });
  }
  await Event.deleteOne({ _id: id });
  res.status(200).json(event);
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
