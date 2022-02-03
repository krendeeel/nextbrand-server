const Order = require('../models/Order')

class orderController {
    async getHistory(req, res) {
        try {
            const orders = await Order.find({ user: req.user._id })
            return res.status(200).json(orders)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(401).json('Not found')
            }
            const order = await Order.findById(id);
            return res.status(200).json(order)
        } catch (error) {
            return res.status(403).json(error)
        }
    }

    async delivered(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(401).json('Not found')
            }
            const order = await Order.findById(id);
            order.isDelivered = true;
            order.deliveredAt = new Date;
            await order.save()
            return res.status(200).json(order)
        } catch (error) {
            return res.status(403).json(error)
        }
    }

    async createOrder(req, res) {
        try {
            const order = new Order({
                ...req.body,
                user: req.user._id
            });
            await order.save()
            return res.status(200).json(order)
        } catch (error) {
            return res.status(403).json(error)
        }
    }
}


module.exports = new orderController()