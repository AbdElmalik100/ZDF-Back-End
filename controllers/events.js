import { validationResult } from "express-validator";
import Events from "../models/events.js";


export const getEvents = async (req, res) => {
    try {
        const events = await Events.find().sort({created_at: "desc"})
        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createEvent = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get("host")}`
        const data = req.body
        if (req.file) data.image = `${baseUrl}/uploads/${req.file.filename}`
        data.sessions = data.sessions.split(",")
        const event = new Events(data)
        event.qr_code = `${process.env.ZDF_LINK}/attendance/events?event=${event._id}`
        await event.save()
        return res.status(201).json(event)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Events.findById(id)
        if (!event) return res.status(404).json({ error: "event with this ID not found" })
        return res.status(200).json(event)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateEvent = async (req, res) => {    
    try {
        const baseUrl = `${req.protocol}://${req.get("host")}`
        const { id } = req.params
        const data = req.body

        if (req.file) data.image = `${baseUrl}/uploads/${req.file.filename}`
        if(data.sessions) data.sessions = data.sessions.split(",")

        const event = await Events.findByIdAndUpdate(id, data, { new: true })
        if (!event) return res.status(404).json({ error: "event with this ID not found" })
        return res.status(200).json(event)
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(error)
    }
}
export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params
        const event = await Events.findByIdAndDelete(id)
        if (!event) return res.status(404).json({ error: "event with this ID not found" })
        return res.status(200).json(event)
    } catch (error) {
        return res.status(500).json(error)
    }
}
