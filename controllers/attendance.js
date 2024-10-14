import Attendance from "../models/attendance.js";
import Subscriptions from "../models/subscriptions.js";
import Workshops from "../models/workshops.js";

export const getAttendances = async (req, res) => {
    try {
        const attendances = await Attendance.find().sort({ created_at: "desc" })
            .populate("event")
            .populate("workshop")
            .populate("bundle")
            .lean()

        for (let attendance of attendances) {
            if (attendance.bundle && attendance.bundle.workshops) {
                const workshops = await Workshops.find({
                    _id: { $in: attendance.bundle.workshops }
                });
                attendance.bundle.workshops = workshops
            }
        }
        return res.status(200).json(attendances)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createAttendance = async (req, res) => {
    try {
        const data = req.body
        let users = []

        if (data.event) {
            const eventSubscriptions = await Subscriptions.find({ event: data.event }).populate("user", { password: false })
            eventSubscriptions.forEach(el => {
                users.push({ ...el.user.toObject(), attendance: false, code: el.code })
            })
            data.users = users
        } else if (data.workshop) {
            const workshopSubscriptions = await Subscriptions.find({ event: data.workshop }).populate("user", { password: false })
            workshopSubscriptions.forEach(el => {
                users.push({ ...el.user.toObject(), attendance: false, code: el.code })
            })
            data.users = users
        } else if (data.bundle) {
            const bundleSubscriptions = await Subscriptions.find({ event: data.bundle }).populate("user", { password: false })
            bundleSubscriptions.forEach(el => {
                users.push({ ...el.user.toObject(), attendance: false, code: el.code })
            })
            data.users = users
        }

        const attendance = new Attendance(data)
        attendance.qr_code = `${process.env.ZDF_LINK}/attendance/${attendance._id}`
        await attendance.save()
        await attendance.populate("event")
        await attendance.populate("bundle")
        await attendance.populate("workshop")
        return res.status(200).json(attendance)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getAttendance = async (req, res) => {
    try {
        const { id } = req.params
        const attendance = await Attendance.findById(id)
            .populate("event")
            .populate("workshop")
            .populate("bundle")
            .lean()
        
        if (attendance.bundle && attendance.bundle.workshops) {
            const workshops = await Workshops.find({
                _id: { $in: attendance.bundle.workshops }
            });
            attendance.bundle.workshops = workshops
        }

        if (!attendance) return res.status(404).json({ error: "Attendance with this ID not found" })
        return res.status(200).json(attendance)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const attendance = await Attendance.findByIdAndUpdate(id, data, { new: true })
            .populate("event")
            .populate("workshop")
            .populate("bundle")
        if (!attendance) return res.status(404).json({ error: "Attendance with this ID not found" })
        return res.status(200).json(attendance)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params
        const attendance = await Attendance.findByIdAndDelete(id)
        if (!attendance) return res.status(404).json({ error: "Attendance with this ID not found" })
        return res.status(200).json(attendance)
    } catch (error) {
        return res.status(500).json(error)
    }
}


export const applyAttendance = async (req, res) => {
    try {
        const { id } = req.params
        const user = req.body
        const attendance = await Attendance.findById(id)

        const isUserAttendant = attendance.users.some(el => (user._id == el._id && el.attendance))
        if (isUserAttendant) return res.status(400).json({ error: "Your have already submitted your attendance" })

        attendance.users = attendance.users.map(el => el._id == user._id ? { ...el, attendance: true } : el).sort((a, b) => b.attendance - a.attendance)
        const updatedAttendance = await Attendance.findByIdAndUpdate(id, attendance, { new: true })
        return res.status(200).json({ updatedAttendance: updatedAttendance, user: user })
    } catch (error) {
        return res.status(500).json(error)
    }
}