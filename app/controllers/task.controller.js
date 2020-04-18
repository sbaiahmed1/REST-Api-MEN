const Task = require("../models/task.model.js");

// Create and Save a new Task
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content && !req.body.title) {
    return res.status(400).send({
      message: "task content can not be empty",
    });
  }

  // Create a task
  const task = new Task({
    title: req.body.title,
    content: req.body.content,
    checked: req.body.checked,
  });

  // Save task in the database
  task
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

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
  Task.find()
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    });
};

// Find a single tasks with a taskID
exports.findOne = (req, res) => {
  Task.findById(req.params.taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "Task not found with id " + req.params.taskId,
        });
      }
      res.send(task);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "task not found with id " + req.params.taskId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving task with id " + req.params.taskId,
      });
    });
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {
  // Validate Request
  var id = req.body.taskId;
  if (!req.body.title && !req.body.content && !req.body.checked) {
    return res.status(404).send("Task cannot be updated with empty values.");
  }

  // Find task and update it with the request body
  if (req.body.title) {
    Task.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title,
        },
      },
      { new: true }
    )
      .then((task) => {
        if (!task) {
          return res.send("Task not found with id " + req.params.taskId);
        }
        res.send(task);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Task not found with id " + req.params.taskId,
          });
        }
        return res.status(500).send({
          message: "Error updating Task with id " + req.params.taskId,
        });
      });
  }
  if (req.body.content) {
    Task.findByIdAndUpdate(
      req.params.taskId,
      {
        $set: {
          content: req.body.content,
        },
      },
      { new: true }
    )
      .then((task) => {
        if (!task) {
          return res.send("Task not found with id " + req.params.taskId);
        }
        res.send(task);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Task not found with id " + req.params.taskId,
          });
        }
        return res.status(500).send({
          message: "Error updating Task with id " + req.params.taskId,
        });
      });
  }
  if (req.body.checked) {
    Task.findByIdAndUpdate(
      id,
      {
        $set: {
          checked: req.body.checked,
        },
      },
      { new: true }
    )
      .then((task) => {
        if (!task) {
          return res.send("Task not found with id " + req.params.taskId);
        }
        res.send(task);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "Task not found with id " + req.params.taskId,
          });
        }
        return res.status(500).send({
          message: "Error updating Task with id " + req.params.taskId,
        });
      });
  }
};

// Delete a Task with the specified taskId in the request
exports.delete = (req, res) => {
  Task.findByIdAndRemove(req.params.taskId)
    .then((task) => {
      if (!task) {
        return res.status(404).send({
          message: "task not found with id " + req.params.taskId,
        });
      }
      res.send({ message: "Task deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "task not found with id " + req.params.taskId,
        });
      }
      return res.status(500).send({
        message: "Could not delete task with id " + req.params.taskId,
      });
    });
};
