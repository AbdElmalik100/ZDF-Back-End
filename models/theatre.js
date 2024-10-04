import mongoose from "mongoose";
import Events from "./events.js";

const theatreSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    event: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Events
    },
    title: {
        type: String,
        trim: true,
        lowercase: true
    },
    qr_code: {
        type: String
    },
    rows: {
        type: String,
    },
    columns: {
        type: String,
    },
    seats: {
        type: [Object],
    },
})

const Theatre = mongoose.model("Theatre", theatreSchema)

export default Theatre