const Event = require("../models/event.model.js");

// Create and Save a new Event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description && !req.body.name && !req.body.date) {
    return res.status(400).send({
      message: "dude please input a well formatted event",
    });
  }

  // Create a Event
  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
  });

  // Save task in the database
  event
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the event.",
      });
    });
};
exports.findAll = (req, res) => {
  Event.find()
    .then((event) => {
      res.send(event);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

exports.findOne = (req, res)=>{
    Event.findOne()
}
