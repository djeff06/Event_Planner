const express = require("express");
const { login, signup } = require("../controllers/UserController");

const router = express.Router();


// Login route
router.post("/login", login);

// Signup route
router.post("/signup", signup);

module.exports = router;