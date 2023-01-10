const { default: mongoose, Types } = require("mongoose");
const Event = require("../models/EventModel");
const User = require("../models/UserModel");

const getAndCheckOwnership = async (id, username) => {


  console.log("id",id)
  console.log("username",username)
  /* try {
    const events = await Event.findById({id});
    console.log("events found", events);
    if (!events) {
      return res.status(404).json({ message: "product not found!" });
      // throw new Error("Product not found!");
    }

    // Check whether this resource belongs to the signed in user
    if (!(events.postedBy == user_username)) {
      throw new Error("You're not authorized to do this!");
    }
    console.log("product to be returned", events);
    return events;
  } catch (error) {
    console.log(error)
  } */
};

// Create a Event
const createEvent = async (req, res) => {
  const { title, date, duration, description, participants, postedBy } = req.body;
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
    console.log(event)
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Read all Events
const getEvents = async (req, res) => {
  const {username} = req.user;
  console.log("username",username);

  try {
    const events = await Event.find({ postedBy: username });
    console.log("events",events)
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
  const { id } = req.params;
  const update = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found!" });
  }
  try {
    const event = await Event.findById({ _id: id });

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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found!" });
  }

  const event = await Event.findByIdAndDelete(id);

  if (!event) {
    return res.status(404).json({ error: "Event not found!" });
  }

  res.status(200).json(event);
};

module.exports = {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
};
