const User = require('../models/User')
const bcrypt = require('bcrypt')
const signToken = require('../utils/signToken')

class authController {
    async registration(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = new User({ name, email, password: bcrypt.hashSync(password, 5) })
            await user.save()
            const token = signToken(user);
            return res.status(200).json({
                ...user._doc,
                token
            })
        } catch (error) {
            res.status(400).json(error)
        }
    }

    async login(req, res) {
        try {
            const user = await User.findOne({ email: req.body.email })
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                const token = signToken(user);
                return res.status(200).json({
                    ...user._doc,
                    token
                })
            }
            return res.status(403).json('Not found')


        } catch (error) {
            res.status(400).json(error)
        }
    }

    async getUser(req, res) {
        try {
            const { user } = req;
            if (!user) {
                return res.status(401).json({ message: "Пользователь не авторизован!" })
            }
            return res.status(200).json(user)
        } catch (error) {
            return res.status(403).json(error)
        }
    }

    async update(req, res) {
        try {
            const user = await User.findById(req.user._id)
            if (!user) {
                return res.status(401).json('Not Found')
            }
            user.name = req.body.name
            user.email = req.body.email
            user.password = req.body.password ? bcrypt.hashSync(req.body.password, 5) : user.password
            await user.save()
            const token = signToken(user);
            return res.status(200).json({
                ...user._doc,
                token
            })
        } catch (error) {
            return res.status(403).json(error)
        }
    }
}


module.exports = new authController()