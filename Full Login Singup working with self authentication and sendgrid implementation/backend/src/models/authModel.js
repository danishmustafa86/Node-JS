const mongoose = require('mongoose');


const authSchema = new mongoose.Schema({
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
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
        select: false,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password!`
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'userAdmin'],
        default: 'user',
    },
    

})

const AuthUser = mongoose.model('AuthUser', authSchema);

module.exports = AuthUser;  