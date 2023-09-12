const express = require("express");
const coursesController = require("../controller/courses.controller")
const verifyToken = require("../middlewares/verifyToken");
const {validationSchema} = require('../middlewares/validation_schema')

const router = express.Router()

router.route('/')
        .get(coursesController.getAllCourses)
        .post(verifyToken, validationSchema() ,coursesController.createCourse)


router.route('/:id')
        .get(coursesController.getCourse)
        .patch(verifyToken, coursesController.updateCourse)
        .delete(verifyToken, coursesController.deleteCourse)


module.exports = router;