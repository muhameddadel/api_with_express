require('dotenv').config()
const express = require("express");
const courseRouter = require('./routes/courses.route')
const usersRouter = require('./routes/users.route')
const httpStatus = require("./utils/httpStatus")
const cors = require("cors")
const path = require("path")

const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url).then(() => {
    console.log("Connected successfully to database")
})


const app = express()


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(cors())
app.use(express.json())


app.use('/api/courses', courseRouter)
app.use('/api/users', usersRouter)

app.all("*", (req, res) => {
    res.status(404).json({status: httpStatus.ERROR, message: "This resource is not available"})
})

app.use((err, req, res, next) => {
    res.status(err.code || 500).json({status: err.text || httpStatus.ERROR, message: err.message, code: err.code || 500, data: null})
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})

