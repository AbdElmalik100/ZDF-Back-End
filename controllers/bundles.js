import Bundles from "../models/bundles.js"


export const getBundles = async (req, res) => {
    try {
        const {limit} = req.query
        const bundles = await Bundles.find().populate("workshops").limit(limit)
        return res.status(200).json(bundles)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createBundle = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get("host")}`
        const data = req.body
        const file = req.file

        data.workshops = data.workshops.split(",")
        if (file) data.image = `${baseUrl}/uploads/${file.filename}`

        const bundle = new Bundles(data)
        await bundle.populate("workshops")
        await bundle.save()
        return res.status(201).json(bundle)
    } catch (error) {
        return res.status(400).json(error)
    }
}
export const getBundle = async (req, res) => {
    try {
        const { id } = req.params
        const bundle = await Bundles.findById(id).populate("workshops")
        if (!bundle) return req.status(404).json({ error: "Bundle with this ID not found" })
        return res.status(200).json(bundle)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateBundle = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get("host")}`
        const { id } = req.params
        const data = req.body
        const file = req.file

        if (data.workshops) data.workshops = data.workshops.split(",")
        if (file) data.image = `${baseUrl}/uploads/${file.filename}`

        const bundle = await Bundles.findByIdAndUpdate(id, data, { new: true }).populate("workshops")
        if (!bundle) return res.status(404).json({ error: "Bundle with this ID not found" })
        return res.status(200).json(bundle)
    } catch (error) {
        return res.status(400).json(error)
    }
}
export const deleteBundle = async (req, res) => {
    try {
        const { id } = req.params
        const bundle = await Bundles.findByIdAndDelete(id)
        if (!bundle) return req.status(404).json({ error: "Bundle with this ID not found" })
        return res.status(200).json(bundle)
    } catch (error) {
        return res.status(500).json(error)
    }
}