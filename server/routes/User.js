const express = require("express");
const { getUsers, login, signup, updateKey, getUser } = require("../controllers/UserController");
const AuthMiddleware = require("../middleware/Auth")

const router = express.Router();

// Login route
router.post("/login", login);

// Signup route
router.post("/signup", signup);

// Get all user
router.get("/",AuthMiddleware, getUsers)
//  Get one user
router.get("/profile",AuthMiddleware, getUser)

//Update key
router.post("/",AuthMiddleware, updateKey)


module.exports = router;