import mongoose from "mongoose";

const workshopsSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        trim: true,      
        lowercase: true,      
    },
    description: {
        type: String,
        trim: true,      
        lowercase: true,      
    },
    lecturer: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    time_from: {
        type: String,
    },
    time_to: {
        type: String,
    },
    location: {
        type: String,
    },
    discount: {
        type: String,
        default: "0"
    },
    price: {
        type: String,
    }
})


const Workshops = mongoose.model("Workshops", workshopsSchema)

export default Workshops