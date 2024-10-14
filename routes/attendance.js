import express from 'express'
import { applyAttendance, createAttendance, deleteAttendance, getAttendance, getAttendances, updateAttendance } from '../controllers/attendance.js'


const router = express.Router()

router.route("/")
    .get(getAttendances)
    .post(createAttendance)

router.route("/:id")
    .get(getAttendance)
    .patch(updateAttendance)
    .delete(deleteAttendance)

router.route("/:id/submit_attendance")
    .post(applyAttendance)

export default router