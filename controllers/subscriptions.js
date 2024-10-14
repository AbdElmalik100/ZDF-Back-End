import Subscriptions from '../models/subscriptions.js'

export const getSubscriptions = async (req, res) => {
    try {
        const { event, workshop, bundle, user, amount, attendance, code, startDate, endDate } = req.query;
        const query = {};

        if (event) query.event = event;
        if (workshop) query.workshop = workshop;
        if (bundle) query.bundle = bundle;
        if (user) query.user = user;
        if (amount) query.amount = amount;
        if (code) query.code = code;


        if (attendance !== undefined) {
            query.attendance = attendance === 'true';
        }

        if (startDate || endDate) {
            query.created_at = {};
            if (startDate) query.created_at.$gte = new Date(startDate);
            if (endDate) query.created_at.$lte = new Date(endDate);
        }

        const subscriptions = await Subscriptions.find(query).sort({ attendance: "desc" })
            .populate('event')
            .populate("workshop")
            .populate('user');

        return res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};


export const createSubscription = async (req, res) => {
    try {
        const data = req.body
        const subscriptions = new Subscriptions(data)
        await subscriptions.save()
        return res.status(201).json(subscriptions)
    } catch (error) {
        res.status(400).json(error)
    }
}
export const getSubscription = async (req, res) => {
    try {
        const { id } = req.params
        const subscriptions = await Subscriptions.findById(id)
        if (!subscriptions) return res.status(404).json({ error: "Subscription with this ID not found" })
        return res.status(200).json(subscriptions)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const subscriptions = await Subscriptions.findByIdAndUpdate(id, data, { new: true })
            .populate("event")
            .populate("workshop")
            .populate("user")
        if (!subscriptions) return res.status(404).json({ error: "Subscription with this ID not found" })
        return res.status(200).json(subscriptions)
    } catch (error) {
        res.status(500).json(error)
    }
}
export const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params
        const subscriptions = await Subscriptions.findByIdAndDelete(id)
        if (!subscriptions) return res.status(404).json({ error: "Subscription with this ID not found" })
        return res.status(200).json(subscriptions)
    } catch (error) {
        res.status(500).json(error)
    }
}