const  Transaction = require("../models/transaction.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
  // Create a task
  const transaction = new Transaction({
    amount: req.body.amount,
    date: req.body.date,
    userId: req.body.userId,
  });

  // Save task in the database
  transaction
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the task.",
      });
    });
};
