import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    first_name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    is_email_verified: {
        type: Boolean,
        default: false
    },
    phone_number: {
        type: String,
        default: ""
    }
})


const Users = mongoose.model('Users', usersSchema)

export default Users