const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    InStock: { type: Boolean, required: true, default: true },
    for: { type: String, required: true, default: 'men' },
    sizes: [
        { type: String }
    ],
    description: { type: String, required: true }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product;