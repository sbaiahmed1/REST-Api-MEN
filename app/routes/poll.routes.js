module.exports = (app) => {
    const poll = require("../controllers/poll.controller.js");
  
    // Create a new Note
    app.post("/poll", poll.create);
    app.get("/poll",poll.findAll)
  };
  