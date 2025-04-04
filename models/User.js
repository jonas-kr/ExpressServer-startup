const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema({
    userId: {
        type: Number
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    }

}, { timestamps: true })

UserSchema.plugin(AutoIncrement, { inc_field: 'userId', start_seq: 1 });

const User = mongoose.model("User", UserSchema)

module.exports = User