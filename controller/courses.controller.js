const {validationResult} = require("express-validator");
const Course = require("../models/course.model")


const getAllCourses = async (req, res) => {
    const courses = await Course.find()
    res.json(courses)
}


const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)

        if(course){
            return res.json(course)
        }else{
            return res.status(404).json({msg:"This id is not found"})
        }
    } catch (err) {
        return res.status(400).json({msg: "invaild Object ID"})
    }
    }


const createCourse = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }

    const newCourse = new Course(req.body)
    await newCourse.save()

    res.status(201).json(newCourse)
    
}


const updateCourse = async (req, res) => {
    const id = req.params.id
    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, {$set: {...req.body}})
        res.status(200).json({msg: "Updated successfully"})
    }catch (err) {
        return res.status(400).json({error: err})
    }
}


const deleteCourse = async (req, res) => {
    try {
        const data = await Course.deleteOne({_id: req.params.id})
        return res.status(200).json({success: true, msg: data})
    }catch (err) {
        return res.status(400).json({error: err})
    }
}


module.exports = {
    getAllCourses,
    getCourse, 
    createCourse, 
    updateCourse, 
    deleteCourse
}