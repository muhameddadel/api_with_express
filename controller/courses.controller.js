const {validationResult} = require("express-validator");
const Course = require("../models/course.model")
const httpStatus = require("../utils/httpStatus");
const asyncWarpper = require("../middlewares/asyncWarpper");
const appError = require("../utils/appError");


const getAllCourses = asyncWarpper(async (req, res) => {
    const query = req.query

    const limit = query.limit || 1
    const page = query.page || 1
    const skip = (page - 1) * limit

    const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip)
    res.json({status: httpStatus.SUCCESS, data: {courses}})
})


const getCourse = asyncWarpper(async (req, res, next) => {
    const course = await Course.findById(req.params.id)

    if(course){
        return res.json({status: httpStatus.SUCCESS, data: {course}})
    }else{
        const error = appError.create("Course not found", 404, httpStatus.FAIL)
        return next(error)
    }})

const createCourse = asyncWarpper(async (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()){
        const error = appError.create(errors.array(), 400, httpStatus.FAIL)
        return next(error)
    }

    const newCourse = new Course(req.body)
    await newCourse.save()

    res.status(201).json({status: httpStatus.SUCCESS, data: {course: newCourse}})   
})


const updateCourse = asyncWarpper(async (req, res) => {
    const id = req.params.id
    const updatedCourse = await Course.findByIdAndUpdate(id, {$set: {...req.body}})
    res.status(200).json({status: httpStatus.SUCCESS, message: "Course updated successfully"})
})


const deleteCourse = asyncWarpper(async (req, res) => {
    await Course.deleteOne({_id: req.params.id})
    return res.status(200).json({status: httpStatus.SUCCESS, data: null})
})

module.exports = {
    getAllCourses,
    getCourse, 
    createCourse, 
    updateCourse, 
    deleteCourse
}