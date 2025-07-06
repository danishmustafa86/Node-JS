const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    }
})

const User = mongoose.model('User', schema);


module.exports = User;