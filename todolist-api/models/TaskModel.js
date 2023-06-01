const mongoose = require('mongoose');

const checkDetails = new mongoose.Schema({
    title:String,
    description:String,
    state: Boolean
});

module.exports = mongoose.model('TaskList', checkDetails);