import mongoose from "mongoose";
import Events from './events.js'
import Users from './users.js'


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
        ref: Events
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Users
    },
    amount: {
        type: String
    },
    attendance: {
        type: Boolean,
        default: false
    }
})


const Subscriptions = mongoose.model("Subscriptions", subscriptionsSchema)
export default Subscriptions