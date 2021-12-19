const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
const UsersSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    country: {
        type: String,
    },
    dob: {
        type: String,
    },
    avatar: {
        type: String,
    },
    address: {
        type: String,
    }
});

const Users = mongoose.model('user', UsersSchema);

module.exports = Users;