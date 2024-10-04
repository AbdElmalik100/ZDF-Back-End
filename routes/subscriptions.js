import express from 'express'
import { createSubscription, deleteSubscription, getSubscription, getSubscriptions, updateSubscription, updateUserAttendance } from '../controllers/subscriptions.js'

const router = express.Router()

router.route("/")
    .get(getSubscriptions)
    .post(createSubscription)


router.route("/:id")
    .get(getSubscription)
    .patch(updateSubscription)
    .delete(deleteSubscription)

router.route("/:id/attendance")
    .post(updateUserAttendance)

export default router