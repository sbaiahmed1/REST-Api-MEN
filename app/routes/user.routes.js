module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/user', user.create);

    // Retrieve all Notes
    app.post('/login', user.authenticate);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', user.findOne);

    // Update a Note with noteId
    app.put('/user/', user.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', user.delete);
}