const User = require("../models/User")
const bcrypt = require('bcryptjs')
const { createToken } = require("../utils/jwtHelper")
require('dotenv').config()

const Register = async (req, res) => {
    const {
        fullName, email, password
    } = req.body

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All fields must be filled" })
    }
    const exist = await User.findOne({ email })
    if (exist) {
        return res.status(400).json({ message: "Email already taken" })
    }
    try {
        const salt = await bcrypt.genSalt()
        const hashed = await bcrypt.hash(password, salt)

        const user = await User.create({
            fullName, email, password: hashed
        })
        res.status(201).json({ message: "User succesfully created", user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields must be filled" })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email" })
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        const token = createToken(user.userId)

        const expiryDate = new Date(Date.now() + 3600000 * 24); // 1 day
        res
            .cookie('User', token, {
                httpOnly: true, expires: expiryDate, sameSite: 'None', secure: true
            })
            .status(200)
            .json({ message: "User signed in", expiryDate });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};


const Google = async (req, res) => {
    const { email, name } = req.body
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = createToken(user.userId)
            const expiryDate = new Date(Date.now() + 3600000 * 24); // 1 day
            res
                .cookie('User', token, {
                    httpOnly: true,
                    expires: expiryDate,
                    sameSite: 'None', secure: true
                })
                .status(200)
                .json({ message: "User is signed in" });
        } else {
            const newUser = User.create({
                fullName:
                    name.split(' ').join('').toLowerCase(),
                email
            })

            const token = createToken(newUser.userId)
            const expiryDate = new Date(Date.now() + 3600000 * 24); // 1 day
            res
                .cookie('User', token, {
                    httpOnly: true,
                    expires: expiryDate,
                    sameSite: 'None', secure: true
                })
                .status(200)
                .json({ message: "User is Saved to DB And signed in" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

const Logout = (req, res) => {
    res.clearCookie('User').status(200).json('Logout success!');
};


module.exports = { Register, Google, Login, Logout }