const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    amount: { type: Number, required: true },
    userId: { type: String, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", EventSchema);
