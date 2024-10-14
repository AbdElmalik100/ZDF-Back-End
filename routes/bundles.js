import express from "express";
import { createBundle, deleteBundle, getBundle, getBundles, updateBundle } from "../controllers/bundles.js";
import upload from "../middlewares/multer.js";


const router = express.Router()


router.route("/")
    .get(getBundles)
    .post(upload.single("image"), createBundle)


router.route("/:id")
    .get(getBundle)
    .patch(upload.single("image"), updateBundle)
    .delete(deleteBundle)

export default router