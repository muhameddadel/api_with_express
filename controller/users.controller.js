const {validationResult} = require("express-validator");
const User = require("../models/user.model")
const httpStatus = require("../utils/httpStatus");
const asyncWarpper = require("../middlewares/asyncWarpper");
const appError = require("../utils/appError");


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
    const newUser = new User({
        username,
        email,
        password
    })

    await newUser.save()

    return res.status(201).json({status: httpStatus.SUCCESS, data: newUser})
})

const login = () => {}


module.exports = {
    getAllUsers,
    register,
    login
}