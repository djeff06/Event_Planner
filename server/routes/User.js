const express = require("express");
const { getUsers, login, signup } = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/Auth")

const router = express.Router();

// Login route
router.post("/login", login);

// Signup route
router.post("/signup", signup);

// Get all user
router.get("/",AuthMiddleware, getUsers)
module.exports = router;