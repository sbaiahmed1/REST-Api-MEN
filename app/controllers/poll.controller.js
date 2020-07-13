const  Poll = require("../models/poll.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
  // Create a task
  const poll = new Poll({
    question: req.body.question,
    answers: req.body.answers,
    userIds: req.body.userId,
  });

  // Save task in the database
  poll
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the poll.",
      });
    });
};
exports.findAll = (req, res) => {
    Poll.find()
      .then((polls) => {
        res.send(polls);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving polls.",
        });
      });
  };
