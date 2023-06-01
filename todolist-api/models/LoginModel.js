const mongoose = require('mongoose');

const checkDetails = new mongoose.Schema({
    email:String,
    password:String
});

module.exports = mongoose.model('LoginDetails', checkDetails);