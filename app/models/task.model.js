const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: String,
    content: String,
	checked : Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);