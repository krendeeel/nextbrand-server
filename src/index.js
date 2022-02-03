const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
const productRouter = require('./routers/productRouter')
const orderRouter = require('./routers/orderRouter')

const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('/orders', orderRouter)



const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://roman:roman123@cluster0.uq96p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()