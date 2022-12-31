const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login the user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //Create the JWT
    const token = generateToken(user._id);
    res.status(200).json({username: user.username, email: user.email, token});
  } catch (error) {
    res.status(400).json(error.message);
  }
};


// Signup the user
const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  try {
    const user = await User.signup(username, email, password, confirmPassword);

    //Create the JWT
    const token = generateToken(user._id);

    res.status(200).json({username: user.username, email:user.email, token});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getUsers = async (req, res) => {

  try {
    //get all products from data base
    const allUsers = await User.find({});
    res.status(200).json(allUsers.map(user =>{
      return {
        username: user.username,
        id: user._id,
      }
    }));
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { getUsers, login, signup };