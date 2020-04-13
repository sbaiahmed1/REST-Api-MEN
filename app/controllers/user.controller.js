const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create and Save a new USER
exports.create = async function create(req, res) {
  // Validate request
  if (req.body.email && req.body.username && req.body.password) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    //use schema.create to insert data into the db
    userData.password = await bcrypt.hashSync(userData.password, 10);

    User.create(userData)
      .then((response) => {
        return res.status(200).json({ msg: "USER INSERTED" });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  Note.find()
    .then((notes) => {
      res.send(notes);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes.",
      });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId,
      });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  // if (!req.body.content) {
  //   return res.status(400).send({
  //     message: "Note content can not be empty",
  //   });
  // }

  // Find note and update it with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      $set: { role: req.body.role, type: req.body.type },
    },
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.userId,
      });
    });
};

// Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
};
// authenticate user
exports.authenticate = (req, res) => {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (
      error,
      user
    ) {
      if (error || !user) {
        var err = { message: "", status: "" };
        err.message = "Wrong email or password.";
        err.status = 401;
        return res.status(err.status).json(err.message);
      } else {
        const payload = {
          user: {
            id: user._id,
          },
        };
        var userData = user;
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              token,
              userData,
            });
          }
        );
      }
    });
  }
};
