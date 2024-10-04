import express from 'express'
import { createEvent, deleteEvent, getEvent, getEvents, updateEvent } from '../controllers/events.js'
import upload from '../middlewares/multer.js'

const router = express.Router()

router.route("/")
    .get(getEvents)
    .post(upload.single('image'), createEvent)

router.route("/:id")
    .get(getEvent)
    .patch(upload.single('image'), updateEvent)
    .delete(deleteEvent)


export default router