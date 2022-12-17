const express = require("express");
const {
  createResource,
  getResources,
  getResource,
  updateResource,
  deleteResource
} = require("../controllers/ResourceController");

const AuthMiddleware = require("../middleware/Auth")

const router = express.Router();
const Resource = require("../models/ResourceModel");

router.use(AuthMiddleware)

// GET all resource
router.get("/", getResources);

// GET a single resource by it's ID
router.get("/:id", getResource);

// POST Create a new resource
router.post("/", createResource);

// PATCH Update a resource by it's id
router.patch("/:id", updateResource);

// DELETE delete a resource by it's ID
router.delete("/:id", deleteResource);

module.exports = router;