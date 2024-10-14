import express from 'express'
import { createWorkshop, deleteWorkshop, getWorkshop, getWorkshops, updateWorkshop } from '../controllers/workshops.js'
import upload from "../middlewares/multer.js";

const router = express.Router()

router.route("/")
    .get(getWorkshops)
    .post(upload.single("image"), createWorkshop)


router.route("/:id")
    .get(getWorkshop)
    .patch(upload.single("image"), updateWorkshop)
    .delete(deleteWorkshop)

export default router