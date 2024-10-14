import mongoose from "mongoose";
import Workshops from "./workshops.js";
import Events from "./events.js";
import Bundles from "./bundles.js";

const attendanceSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
    },
    event: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Events,
        default: null
    },
    workshop: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Workshops,
        default: null
    },
    bundle: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Bundles,
        default: null
    },
    users: {
        type: [Object],
        default: []
    },
    qr_code: {
        type: String,
        default: ""
    },
    is_available: {
        type: Boolean,
        default: true
    }
})


const Attendance = mongoose.model("Attendance", attendanceSchema)
export default Attendance