import express from "express";
import { getAllUser, googleOAuth, me, updateProfilePicture, updateUser } from "../controllers/users.js";
import authMiddleWare from '../middlewares/auth.js'
import upload from "../middlewares/multer.js";
const router = express.Router()


router.route('/me')
    .get(authMiddleWare, me)

router.route('/')
    .get(getAllUser)

router.route('/:id')
    .patch(updateUser)
    
router.route('/:id/avatar')
    .patch(upload.single('avatar'), updateProfilePicture)

router.route('/googleOAuth')
    .post(googleOAuth)


export default router