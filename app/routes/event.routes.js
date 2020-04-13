module.exports = app => {
    const event = require("../controllers/event.controller.js");
    const requireLogin = require("../middlewares/requireLogin");
  
    // Create a new Note
    app.post("/event", event.create);
  
    // Retrieve all Tasks
    app.get("/event", event.findAll);
  
    // Retrieve a single Task with taskId
    app.get("/event/:eventId", event.findOne);
  
    // Update a task with taskId
    app.patch("/event/:eventId", event.update);// fel patch ab3ath zokomhom m3a query na3n din zeby
    // asber nayek khalih kima houa zab 
    
    // Delete a Note with noteId
    app.delete("/event/:eventId", event.delete);
  };
  