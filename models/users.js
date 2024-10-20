import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
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
    education: {
        type: String,
        default: ""
    },
    school: {
        type: String,
        default: ""
    },
    phone_number: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    zip_code: {
        type: String,
        default: ""
    },
})


const Users = mongoose.model('Users', usersSchema)

export default Users