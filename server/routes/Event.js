const express = require("express");
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/EventController");

const AuthMiddleware = require("../middleware/Auth")

const router = express.Router();
const Event = require("../models/EventModel");

router.use(AuthMiddleware)


// GET all resource
router.get("/", getEvents);

// GET a single resource by it's ID
router.get("/:id", getEvent);

// POST Create a new resource
router.post("/", createEvent);

// PATCH Update a resource by it's id
router.patch("/:id", updateEvent);

// DELETE delete a resource by it's ID
router.delete("/:id", deleteEvent);

module.exports = router;