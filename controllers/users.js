import Users from '../models/users.js'
import jwt from 'jsonwebtoken'



export const me = async (req, res) => {
    try {
        const userInfo = req.userInfo
        const user = await Users.findOne({ email: userInfo.email, _id: userInfo.id }, { password: false })
        if (!user) return res.status(404).json({ error: "user not found" })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await Users.find({}, { password: false }).populate('posts')
        return res.status(200).json(users)
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const updateUser = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const { id } = req.params
        const data = req.body
        if (data.defaultAvatar) data.avatar = `${baseUrl}/uploads/defaults/${data.defaultAvatar}`
        const updatedUser = await Users.findByIdAndUpdate(id, data, { new: true })
        if (!updatedUser) return res.status(404).json({ error: "user with this ID not found" })
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const updateProfilePicture = async (req, res) => {
    try {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const { id } = req.params
        const file = req.file
        const data = {
            avatar: `${baseUrl}/uploads/${file.filename}`
        }

        const updatedUser = await Users.findByIdAndUpdate(id, data, { new: true })
        if (!updatedUser) return res.status(404).json({ error: "user with this ID not found" })
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(400).json(error)
    }
}


export const googleOAuth = async (req, res) => {
    const accessToken = req.body.access_token
    const credentials = req.body.credentials
    let existUser
    let data
    if (accessToken !== '') {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        data = await response.json()

        existUser = await Users.findOne({ email: data.email })
    } else if (credentials !== '') {
        data = jwt.decode(credentials)
        existUser = await Users.findOne({ email: data.email })
    }

    if (existUser) {
        const token = jwt.sign({ id: existUser._id, email: existUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        return res.status(200).json({ user: existUser, token })
    } else {
        const newUser = new Users({
            first_name: data.given_name,
            last_name: data.family_name,
            email: data.email,
            avatar: data.picture,
            is_email_verified: data.email_verified
        })
        const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
        newUser.password = token
        await newUser.save()
        return res.status(200).json({ user: newUser, token })
    }
}

