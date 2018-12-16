const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    info: {type: String},
    list: {type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true},
    active: Boolean
});

module.exports = mongoose.model('Task', taskSchema);