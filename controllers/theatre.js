import Theatre from "../models/theatre.js";

export const getTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.find().populate("event")
        return res.status(200).json(theatres)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createTheatre = async (req, res) => {
    try {
        const data = req.body
        const theatre = new Theatre(data)
        theatre.qr_code = `${process.env.ZDF_LINK}/theatre/${theatre._id}`
        await theatre.populate("event")
        await theatre.save()
        return res.status(201).json(theatre)
    } catch (error) {
        return res.status(400).json(error)
    }
}
export const getTheatre = async (req, res) => {
    try {
        const { id } = req.params
        const theatre = await Theatre.findById(id).populate("event")
        if (!theatre) return res.status(404).json({ error: "theatre with this ID not found" })
        return res.status(200).json(theatre)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateTheatre = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const theatre = await Theatre.findByIdAndUpdate(id, data, { new: true }).populate("event")
        if (!theatre) return res.status(404).json({ error: "theatre with this ID not found" })
        return res.status(200).json(theatre)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deleteTheatre = async (req, res) => {
    try {
        const { id } = req.params
        const theatre = await Theatre.findByIdAndDelete(id)
        if (!theatre) return res.status(404).json({ error: "theatre with this ID not found" })
        return res.status(200).json(theatre)
    } catch (error) {
        return res.status(500).json(error)
    }
}


export const updateUserSeat = async (req, res) => {
    try {
        const { id } = req.params
        const { user, seatNumber } = req.body
        const theatres = await Theatre.findById(id)
        if(seatNumber === '') return res.status(400).json({error: "Please fill the input with your seat number"})
        if(seatNumber > theatres.seats.length) return res.status(400).json({error: "Invalid seat number"})
        for (let seat of theatres.seats) {
            if (seat.user?._id && seatNumber == seat.code) {
                return res.status(400).json({ error: "This seat is already taken" });
            }
        }

        theatres.seats = theatres.seats.map(seat => seat.code == seatNumber ? { ...seat, user: user, is_active: true } : seat)
        await Theatre.findByIdAndUpdate(id, theatres, { new: true })
        return res.status(200).json({ message: "Your seat number has been submitted", theatres })
    } catch (error) {
        console.log(error);

        return res.status(500).json(error)
    }
}

export const checkUserSeat = async (req, res) => {
    try {
        const { id } = req.params
        const user = req.body

        const theatres = await Theatre.findById(id)
        for (let seat of theatres.seats) {            
            if (seat.user?._id === user._id) {
                return res.status(200).json({ message: "This user already has a seat in this theatre" })
            }
        }
        return res.status(204).json({ message: "This user didn't submit yet" })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
}
