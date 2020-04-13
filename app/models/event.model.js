const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    name: { type:String, required: true },
    description: { type: String, required: true },
    date: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", EventSchema);
