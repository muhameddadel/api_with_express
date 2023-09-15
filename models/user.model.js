const mongoose = require('mongoose')
const validator = require('validator')
const role = require('../utils/role')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true
    }, 
    token: {
        type: String
    }, 
    role: {
        type: String,
        enum: [role.USER, role.ADMIN, role.MANAGER],
        default: role.USER
    }
})

module.exports = mongoose.model('User', userSchema)