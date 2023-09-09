const express = require("express");
const courseRouter = require('./routes/courses.route')


const mongoose = require('mongoose')

const url = "mongodb+srv://medo:0506450922Nodejs@nodeapi.asov9dz.mongodb.net/Nodejs?retryWrites=true&w=majority"

mongoose.connect(url).then(() => {
    console.log("Connected successfully to database")
})


const app = express()

app.use(express.json())


app.use('/api/courses', courseRouter)




app.listen(5000, () => {
    console.log("listening on port 5000")
})

