const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
    fullname: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Person', PersonSchema);