const mongoose = require("mongoose");

const PollsSchema = mongoose.Schema(
  {
    question: { type: String, required: true },
    answers: { type: Array, required: true },
    userIds: String
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Poll", PollsSchema);
