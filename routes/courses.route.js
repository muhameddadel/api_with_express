const express = require("express");

const coursesController = require("../controller/courses.controller")

const {validationSchema} = require('../middlewares/validation_schema')

const router = express.Router()

router.route('/')
        .get(coursesController.getAllCourses)
        .post(validationSchema() ,coursesController.createCourse)


router.route('/:id')
        .get(coursesController.getCourse)
        .patch(coursesController.updateCourse)
        .delete(coursesController.deleteCourse)


module.exports = router;