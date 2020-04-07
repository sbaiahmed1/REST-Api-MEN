const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    name: String,
    description: String,
	date : Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);