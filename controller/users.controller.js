const {validationResult} = require("express-validator");
const User = require("../models/user.model")
const httpStatus = require("../utils/httpStatus");
const asyncWarpper = require("../middlewares/asyncWarpper");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const generateJWT = require("../utils/generateJWT");


const getAllUsers = asyncWarpper(async (req, res) => {
    const query = req.query

    const limit = query.limit || 1
    const page = query.page || 1
    const skip = (page - 1) * limit

    const users = await User.find({}, {password: 0, "__v": false}).limit(limit).skip(skip)
    res.json({status: httpStatus.SUCCESS, data: {users}})
})


const register = asyncWarpper(async (req, res, next) => {
    const {username, email, password} = req.body

    const existedUser = await User.findOne({email: email})
    if (existedUser) {
        const error = appError.create("User already exists", 400, httpStatus.FAIL)
        return next(error)
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    })

    const token = await generateJWT({email: newUser.email, id: newUser._id})
    newUser.token = token


    await newUser.save()

    return res.status(201).json({status: httpStatus.SUCCESS, data: newUser})
})

const login = asyncWarpper(async (req, res, next) => {
    const {email, password} = req.body

    if (!email && !password) {
        const error = appError.create("Email and password are required", 400, httpStatus.FAIL)
        return next(error)
    }

    const user = await User.findOne({email: email})

    if (!user) {
        const error = appError.create("User not found", 400, httpStatus.FAIL)
        return next(error)
    }

    const matchedPassword = await bcrypt.compare(password, user.password)

    if (user && matchedPassword) {
        const token = await generateJWT({email: user.email, id: user._id})
        return res.status(200).json({status: httpStatus.SUCCESS, data: {token}})
    } else {
        const error = appError.create("Wrong password or email", 500, httpStatus.ERROR)
        return next(error)
    }

})


module.exports = {
    getAllUsers,
    register,
    login
}