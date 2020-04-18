module.exports = app => {
  const task = require("../controllers/task.controller.js");
  const requireLogin = require("../middlewares/requireLogin");

  // Create a new Note
  app.post("/task", task.create);

  // Retrieve all Tasks
  app.get("/task", requireLogin, task.findAll);

  // Retrieve a single Task with taskId
  app.get("/task/:taskId", task.findOne);

  // Update a task with taskId
  app.put("/task/", task.update);

  // Delete a Note with noteId
  app.delete("/task/:taskId", task.delete);
};
