const { Schema, model } = require('mongoose')
const userSchema = new Schema({
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    passworld: {
        type: String,
        require: true
    }
}, { timestamps: true })
exports.UserModel = model('user', userSchema)
