const Event = require("../models/event.model.js");

// Create and Save a new Event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description || !req.body.name || !req.body.date) {
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

exports.findOne = (req, res) => {
  Event.findOne(req.params.eventId)
    .then((event) => {
      if (!task) {
        return res
          .status(404)
          .send("task not found with id : " + req.params.eventId);
      }
      return res.send(event);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "event not found with id " + req.params.eventId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving event with id " + req.params.eventId,
      });
    });
};

exports.update = (req, res) => {
  var id = req.params.eventId;
  if (!req.body.description && !req.body.name && !req.body.date) {
    return res.status(404).send("Event cannot be updated with empty values.");
  }
  if (req.body.name) {
    Event.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body.name,
        },
      }
    )
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            message: "event not found with id " + req.params.taskId,
          });
        }
        res.send(event);
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
  if (req.body.description) {
    Event.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          description: req.body.description,
        },
      }
    )
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            message: "event not found with id " + req.params.taskId,
          });
        }
        res.send(event);
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
  if (req.body.date) {
    Event.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          date: req.body.date,
        },
      }
    )
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            message: "event not found with id " + req.params.taskId,
          });
        }
        res.send(event);
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

exports.delete = (req, res) => {
  var id = req.params.eventId;
  if (!req.params.eventId){
    return res.status(404).send('You should provide an ID')
  }
  else {
    return res.send(id)
  }
};
