const { default: mongoose } = require("mongoose");
const Event = require("../models/EventModel");
const User = require("../models/UserModel");

// Create a Event


const createEvent = async (req, res) => {
  const { title, date, duration,description,tags } = req.body;
  console.log(req.body)

  //add to a database
  try {
    const event = await Event.create({
      title,
      date,
      duration,
      description,
      tags,
      /* user_id: req.user._id, */
    });
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Read all Events
const getEvents = async (req, res) => {
  const id = req.user;
  const events = await Event.find({user_id: id}).populate("tags", "username _id");
  console.log(events)

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
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Event not found!" });
  }

  const event = await Event.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!event) {
    return res.status(404).json({ error: "Event not found!" });
  }

  res.status(200).json(event);
};

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