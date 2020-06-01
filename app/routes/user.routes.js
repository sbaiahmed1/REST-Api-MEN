module.exports = (app) => {
  const user = require("../controllers/user.controller.js");

  // Create a new Note
  app.post("/users", user.create);

  // Login
  app.post("/login", user.authenticate);
  // Get all users
  app.get("/users", user.findAll);
  // Retrieve a single Note with noteId
  app.get("/notes/:noteId", user.findOne);

  // Update a Note with noteId
  app.put("/user/", user.update);

  // Delete a user with UserID
  app.delete("/user/:noteId", user.delete);
};
