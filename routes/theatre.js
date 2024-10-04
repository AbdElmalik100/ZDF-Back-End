import express from 'express'
import { checkUserSeat, createTheatre, deleteTheatre, getTheatre, getTheatres, updateTheatre, updateUserSeat } from '../controllers/theatre.js'

const router = express.Router()

router.route('/')
    .get(getTheatres)
    .post(createTheatre)

router.route('/:id')
    .get(getTheatre)
    .patch(updateTheatre)
    .delete(deleteTheatre)

router.route("/:id/seats")
    .post(checkUserSeat)
    .patch(updateUserSeat)

export default router