import mongoose from "mongoose";
import Workshops from "./workshops.js";

const bundlesSchema = new mongoose.Schema({
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
    },
    description: {
        type: String,
    },
    workshops: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: Workshops,
        default: []
    },
    price: {
        type: String,
    },
    is_available: {
        type: Boolean,
        default: true
    },
    limit: {
        type: String,
        default: "0"
    }
})


const Bundles = mongoose.model("Bundles", bundlesSchema)
export default Bundles