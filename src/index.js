const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./routers/authRouter')
// const bookRouter = require('./bookRouter')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/auth', authRouter)
// app.use('/book', bookRouter)


const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://roman:roman123@cluster0.uq96p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()