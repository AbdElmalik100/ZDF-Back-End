import Workshops from "../models/workshops.js"




export const getWorkshops = async (req, res) => {
    try {
        const { limit } = req.query;
        
        const workshops = await Workshops.find().sort({ created_at: "desc" }).limit(limit)
        return res.status(200).json(workshops)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createWorkshop = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get("host")}`
        const data = req.body
        const file = req.file
        if (file) data.image = `${baseUrl}/uploads/${file.filename}`
        const workshop = new Workshops(data)
        workshop.qr_code = `${process.env.ZDF_LINK}/attendance/workshops?workshop=${workshop._id}`
        await workshop.save()
        return res.status(201).json(workshop)
    } catch (error) {        
        return res.status(500).json(error)
    }
}
export const getWorkshop = async (req, res) => {
    try {
        const { id } = req.params
        const workshop = await Workshops.findById(id)
        if (!workshop) return res.status(404).json({ error: "Workshop with this ID not found" })
        return res.status(200).json(workshop)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateWorkshop = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get("host")}`
        const { id } = req.params
        const data = req.body
        const file = req.file
        if (file) data.image = `${baseUrl}/uploads/${file.filename}`
        const workshop = await Workshops.findByIdAndUpdate(id, data, { new: true })
        if (!workshop) return res.status(404).json({ error: "Workshop with this ID not found" })
        return res.status(200).json(workshop)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteWorkshop = async (req, res) => {
    try {
        const { id } = req.params
        const workshop = await Workshops.findByIdAndDelete(id)
        if (!workshop) return res.status(404).json({ error: "Workshop with this ID not found" })
        return res.status(200).json(workshop)
    } catch (error) {
        return res.status(500).json(error)
    }
}