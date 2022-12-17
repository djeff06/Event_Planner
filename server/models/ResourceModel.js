const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const resourceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    postedBy: {
      type: String, 
      required: true
    },
    likes: {
      type: String, 
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);