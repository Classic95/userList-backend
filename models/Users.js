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
        type: Boolean,
    },
    avataar: {
        type: Buffer,
        required: true 
    }
});

const Users = mongoose.model('user',UsersSchema);

module.exports = Users;