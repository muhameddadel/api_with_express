require('dotenv').config()
const express = require("express");
const courseRouter = require('./routes/courses.route')
const httpStatus = require("./utils/httpStatus")
const cors = require("cors")

const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url).then(() => {
    console.log("Connected successfully to database")
})


const app = express()


app.use(cors())
app.use(express.json())


app.use('/api/courses', courseRouter)

app.all("*", (req, res) => {
    res.status(404).json({status: httpStatus.ERROR, message: "This resource is not available"})
})



app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

