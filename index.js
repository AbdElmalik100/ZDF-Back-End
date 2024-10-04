import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import usersRouter from './routes/users.js'
import eventsRouter from './routes/events.js'
import TheatresRouter from './routes/theatre.js'
import subscriptionsRouter from './routes/subscriptions.js'
import { fileURLToPath } from 'url';
import cors from 'cors'
import { createServer } from 'http';
import { Server } from 'socket.io';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mongooseUrl = process.env.MONGOOSE_URL
const port = process.env.PORT

const app = express()
const server = createServer(app)
export const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001']
    }
})

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to our Memories web application API, Feel free to use it."
    })
})

mongoose.connect(mongooseUrl)
    .then(() => {
        console.log("MongoDB is running");
    }).catch(error => {
        console.log("MongoDB connection error: ", error);
    })

app.use('/api/users', usersRouter)
app.use('/api/events', eventsRouter)
app.use('/api/theatres', TheatresRouter)
app.use('/api/subscriptions', subscriptionsRouter)


io.on('connection', socket => {
    console.log('user has been connected: ', socket.id);
    socket.on("seat_submit", seatData => {
        socket.broadcast.emit("recieve_seat", seatData)
    })

    socket.on("event_attendance", userSubscriptionData => {
        socket.broadcast.emit("recieve_event_attendance", userSubscriptionData)
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
    });
})

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})

