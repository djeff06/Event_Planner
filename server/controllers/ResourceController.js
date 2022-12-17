const { default: mongoose } = require("mongoose");
const Resource = require("../models/ResourceModel");

// Create a resource
const createResource = async (req, res) => {
  const { title, description, postedBy,tags,likes } = req.body;

  //add to a database
  try {
    const resource = await Resource.create({
      title,
      description,
      tags,
      postedBy,
      likes,
      /* user_id: req.user._id, */
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: true, message: error.message });
  }
};

// Read all resources
const getResources = async (req, res) => {
  const id = req.user;
  const resources = await Resource.find({user_id: id});

  res.status(200).json(resources);
};

//Read on resource by it's ID
const getResource = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Resource not found!" });
  }

  const resource = await Resource.findById(id);

  if (!resource) {
    return res.status(404).json({ error: "Resource not found!" });
  }

  res.status(200).json(resource);
};

const updateResource = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Resource not found!" });
  }

  const resource = await Resource.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!resource) {
    return res.status(404).json({ error: "Resource not found!" });
  }

  res.status(200).json(resource);
};

const deleteResource = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Resource not found!" });
  }

  const resource = await Resource.findByIdAndDelete(id);

  if (!resource) {
    return res.status(404).json({ error: "Resource not found!" });
  }

  res.status(200).json(resource);
};

module.exports = {
  createResource,
  getResources,
  getResource,
  updateResource,
  deleteResource,
};