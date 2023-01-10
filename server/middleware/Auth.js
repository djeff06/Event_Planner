const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const checkAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization header missing!" });
  }

  const token = authorization.split(" ")[1];

  const { _id } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const user = await User.findById({ _id }).select("username _id");
    req.user = user;
    console.log(user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Unauthorized request!" });
  }
};

module.exports = checkAuth;
