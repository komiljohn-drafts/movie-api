const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        require: true
    }
});

module.exports = mongoose.model('user', UsersSchema);
