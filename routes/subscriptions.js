import express from 'express'
import { createSubscription, deleteSubscription, getSubscription, getSubscriptions, updateSubscription } from '../controllers/subscriptions.js'

const router = express.Router()

router.route("/")
    .get(getSubscriptions)
    .post(createSubscription)


router.route("/:id")
    .get(getSubscription)
    .patch(updateSubscription)
    .delete(deleteSubscription)

export default router