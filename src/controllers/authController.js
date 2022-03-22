const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const bcrypt = require('bcrypt');
const signToken = require('../utils/signToken');

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


    async adminInfo(req, res) {
        try {
            const productsCount = await Product.find().count();
            const ordersCount = await Order.find().count();
            const usersCount = await User.find().count();
            const products = await Product.find().limit(10);
            const orders = await Order.find().limit(10);
            return res.status(200).json({
                productsCount,
                ordersCount,
                usersCount,
                products,
                orders
            })

        } catch (error) {
            return res.status(403).json(error)
        }
    }
}


module.exports = new authController()