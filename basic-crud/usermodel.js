const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/mongoPractice`);

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
})

module.exports = mongoose.model('user', userSchema)