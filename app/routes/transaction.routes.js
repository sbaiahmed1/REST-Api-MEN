module.exports = (app) => {
  const transaction = require("../controllers/transaction.controller.js");

  // Create a new Note
  app.post("/transaction", transaction.create);
};
