const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    user: Number,
    active: Boolean
});

module.exports = mongoose.model('List', listSchema);