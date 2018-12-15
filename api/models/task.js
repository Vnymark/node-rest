const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    info: String,
    active: Boolean
});

module.exports = mongoose.model('Task', taskSchema);