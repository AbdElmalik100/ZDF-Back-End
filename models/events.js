import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        lowercase: true,
        trim: true
    },
    sessions: {
        type: [String],
        default: []
    },
    venue: {
        type: String,
        trim: true,
    },
    date: {
        type: Date
    },
    time_from: {
        type: String
    },
    time_to: {
        type: String
    },
    ticket_price: {
        type: String,
    },
    image: {
        type: String,
    },
    is_available: {
        type: Boolean,
        default: true
    }
})

const Events = mongoose.model("Events", eventsSchema)

export default Events