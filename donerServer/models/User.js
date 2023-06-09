const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match:[
            /^[a-zA-Z0-9]+@\w+.[A-Za-z]{2,4}$/i,
            "Not valid email"
        ],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[A-z0-9]+$/i,
            "Username may contain only letters and numbers"
        ],
    },
    hashedPassword: {type: String, required: true}
});

userSchema.index({username: 1}, {
    collation: {
        locale: "en",
        strength:2
    },
});

userSchema.index({ email: 1}, {
    collation: {
        locale: "en",
        strength: 2
    },
});

const User = model('User', userSchema);

module.exports = User;

