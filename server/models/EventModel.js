const { default: mongoose } = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: false,
    },
    duration: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    participants: {
      /* ref: "User", */
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

EventSchema.statics.cardEvents = async function (
  title,
  date,
  duration,
  description,
  participants
){
  //Validating username, email and password

  if (!validator.isAlphanumeric(title, description, "pl-PL")) {
    throw new Error("Name cannot contain special characters.");
  }

  if (!validator.isDate(date)) {
    throw Error("Please use a valid date");
  }

  if (!validator.isNumber(duration)) {
    throw Error("Please use a strong password");
  }

/*   if (!validator.isArray(participants)) {
    throw new Error("Please use a valid character");
  } */

/*   const userExists = await this.findOne({ participants });

  if (userExists) {
    throw Error("user already exists!");
  } */

  

  const event = await this.create({ title, date, duration, description, participants});

  return event;
};

module.exports = mongoose.model("Event", EventSchema);