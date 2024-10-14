import mongoose from "mongoose";
import Events from './events.js'
import Users from './users.js'
import Workshops from "./workshops.js";
import Bundles from "./bundles.js";


const generateRandomNumber = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const randomNumber = []
    for (let counter = 0; counter < 4; counter++) {
        const random = Math.floor(numbers.length * Math.random())
        randomNumber.push(numbers[random])
    }
    return randomNumber.join("")
}


const subscriptionsSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now
    },
    code: {
        type: String,
        default: generateRandomNumber
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
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Users,
        required: true
    },
    amount: {
        type: String
    },
})


const Subscriptions = mongoose.model("Subscriptions", subscriptionsSchema)
export default Subscriptions