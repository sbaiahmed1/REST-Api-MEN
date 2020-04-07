module.exports = app => {
    const event = require("../controllers/event.controller.js");
    const requireLogin = require("../middlewares/requireLogin");
  
    // Create a new Note
    app.post("/event", event.create);
  
    // Retrieve all Tasks
    app.get("/event", event.findAll);
  
    // Retrieve a single Task with taskId
    app.get("/event/:eventId", event.create);
  
    // Update a task with taskId
    app.put("/event", event.create);
  
    // Delete a Note with noteId
    app.delete("/event/:taskId", event.create);
  };
  