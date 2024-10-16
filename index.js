import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import usersRouter from './routes/users.js'
import eventsRouter from './routes/events.js'
import theatresRouter from './routes/theatre.js'
import workshopsRouter from './routes/workshops.js'
import bundlesRouter from './routes/bundles.js'
import attendanceRouter from './routes/attendance.js'
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
        origin: ['http://localhost:3000', 'http://localhost:3001', 'zdf-eg.com', 'admindashboard.zdf-eg.com']
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
app.use('/api/theatres', theatresRouter)
app.use('/api/workshops', workshopsRouter)
app.use('/api/bundles', bundlesRouter)
app.use('/api/attendances', attendanceRouter)
app.use('/api/subscriptions', subscriptionsRouter)


io.on('connection', socket => {
    console.log('user has been connected: ', socket.id);

    socket.on("seat_submit", seatData => {
        socket.broadcast.emit("recieve_seat", seatData)
    })
    socket.on("submit_attendance", userAttendanceData => {
        socket.broadcast.emit("recieve_attendance", userAttendanceData)
    })

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
    });
})

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})

