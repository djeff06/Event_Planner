const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

//signup form
UserSchema.statics.signup = async function (
  username,
  email,
  password,
  confirmPassword
) {
  //Validating username, email and password

  if (!validator.isAlphanumeric(username, "pl-PL")) {
    throw new Error("Name cannot contain special characters.");
  }

  if (!validator.isEmail(email)) {
    throw Error("Credentials must be valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Credentials must be valid");
  }

  if (confirmPassword !== password) {
    throw new Error("Passwords don't match. Try again.");
  }

  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already exists!");
  }
  const usernameExists = await this.findOne({ username });

  if (usernameExists) {
    throw Error("username already exists!");
  }

  //salt
  const salt = await bcrypt.genSalt(12);
  //hashed password
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hashedPassword });

  return user;
};

//login
UserSchema.statics.login = async function (email, password) {
  //Validating email and password

  if (!email || !password) {
    throw Error("You must provide your credentials to login!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Credentials must be valid");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email doesn't exist!");
  }

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) {
    throw Error("Incorrect Credentials");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
