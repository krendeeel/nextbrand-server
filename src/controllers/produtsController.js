const Product = require('../models/Product');

class productsController {
    async getAll(req, res) {
        try {
            let { category, sort, type, currentPage, count } = req.query;
            const offset = count * (currentPage - 1);
            switch (sort) {
                case 'popular': {
                    const count = await Product.count({ category, for: type });
                    const products =
                        await Product.find({ category, for: type })
                            .skip(offset)
                            .limit(6)
                            .sort({ 'rating': -1 });
                    return res.status(200).json({ products, count });
                }
                case 'price': {
                    const count = await Product.count({ category, for: type });
                    const products =
                        await Product.find({ category, for: type })
                            .skip(offset)
                            .limit(6)
                            .sort({ 'price': 1 });
                    return res.status(200).json({ products, count });
                }
                case 'alphabet': {
                    const count = await Product.count({ category, for: type });
                    const products =
                        await Product.find({ category, for: type })
                            .skip(offset)
                            .limit(6)
                            .sort({ 'name': 1 });
                    return res.status(200).json({ products, count });
                }
                default: {
                    return res.status(200).json([]);
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getOne(req, res) {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(401).json('Not found');
            }
            const product = await Product.findById(id);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(403).json(error);
        }
    }

    async addProduct(req, res) {
        try {
            const product = new Product(req.body);
            await product.save();
            return res.send();
        } catch (error) {
            return res.status(403).json(error);
        }
    }

    async removeProduct(req, res) {
        try {
            const id = req.params.id;
            await Product.findByIdAndRemove(id);
            return res.send();
        } catch (error) {
            return res.status(403).json(error);
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            await Product.findByIdAndUpdate(id, { ...req.body });
            return res.send();
        } catch (error) {
            return res.status(403).json(error);
        }
    }
}


module.exports = new productsController()