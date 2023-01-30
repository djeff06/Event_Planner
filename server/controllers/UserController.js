const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login the user
const login = async (req, res) => {
  const { email, password, fcmToken } = req.body;
  try {
    const user = await User.login(email, password, fcmToken);

    //Create the JWT
    const token = generateToken(user._id);

    // up

    const { _id } = user._id;
    try {
      const getUser = await User.findById(_id);
      if (!getUser) {
        return res.status(404).json({ err: "user not found!" });
      }
      // await Event.findById({ _id: id });

      if (fcmToken) {
        getUser.fcmToken = fcmToken;
      }
      console.log(getUser);

      await getUser.save();
      return res.status(200).json({
        username: user.username,
        email: user.email,
        token,
        fcmToken: user.fcmToken,
        message: "fcnToken updated",
      });
    } catch (err) {
      res.status(400).json({ err: true, message: err.message });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// Signup the user
const signup = async (req, res) => {
  const { username, email, password, confirmPassword, key, fcmToken } =
    req.body;
  try {
    const user = await User.signup(
      username,
      email,
      password,
      confirmPassword,
      key,
      fcmToken
    );

    //Create the JWT
    const token = generateToken(user._id);

    // generate fcmToken function

    res.status(200).json({
      username: user.username,
      email: user.email,
      token,
      fcmToken: user.fcmToken,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    //get all products from data base
    const allUsers = await User.find({});
    res.status(200).json(
      allUsers.map((user) => {
        return {
          username: user.username,
          id: user._id,
        };
      })
    );
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const getUser = async (req, res) => {
  const { _id } = req.user;
  console.log("_id", _id);
  try {
    //get all products from data base
    const user = await User.findById({ _id });
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//update key

const updateKey = async (req, res) => {
  const { key } = req.body;
  const { _id } = req.user;
  console.log("key", key);
  try {
    const getUser = await User.findById(_id);
    console.log("getuser", getUser);
    if (!getUser) {
      return res.status(404).json({ err: "user not found!" });
    }
    // await Event.findById({ _id: id });

    if (key) {
      getUser.profilePicture = key;
    }
    console.log(getUser);

    await getUser.save();
    return res.status(200).json({ message: "profile picture updated" });
  } catch (err) {
    res.status(400).json({ err: true, message: err.message });
  }
};

module.exports = {
  getUsers,
  login,
  signup,
  updateKey,
  getUser,
};
