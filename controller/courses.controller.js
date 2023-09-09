const {validationResult} = require("express-validator");
const Course = require("../models/course.model")
const httpStatus = require("../utils/httpStatus")


const getAllCourses = async (req, res) => {
    const query = req.query

    const limit = query.limit || 1
    const page = query.page || 1
    const skip = (page - 1) * limit

    const courses = await Course.find({}, {"__v": false}).limit(limit).skip(skip)
    res.json({status: httpStatus.SUCCESS, data: {courses}})
}


const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if(course){
            return res.json({status: httpStatus.SUCCESS, data: {course}})
        }else{
            return res.status(404).json({status: httpStatus.FAIL, data: {course: null}})
        }
    } catch (err) {
        return res.status(400).json({status: httpStatus.ERROR, message: "Invalid Object ID"})
    }
    }


const createCourse = async (req, res) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()){
        return res.status(400).json({status: httpStatus.FAIL, data: errors.array()})
    }

    const newCourse = new Course(req.body)
    await newCourse.save()

    res.status(201).json({status: httpStatus.SUCCESS, data: {course: newCourse}})
    
}


const updateCourse = async (req, res) => {
    const id = req.params.id
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, {$set: {...req.body}})
        res.status(200).json({status: httpStatus.SUCCESS, message: "Course updated successfully"})
    }catch (err) {
        return res.status(400).json({status: httpStatus.ERROR, message: err.message})
    }
}


const deleteCourse = async (req, res) => {
    try {
        await Course.deleteOne({_id: req.params.id})
        return res.status(200).json({status: httpStatus.SUCCESS, data: null})
    }catch (err) {
        return res.status(400).json({status: httpStatus.ERROR, message: err.message, code: 400})
    }
}


module.exports = {
    getAllCourses,
    getCourse, 
    createCourse, 
    updateCourse, 
    deleteCourse
}