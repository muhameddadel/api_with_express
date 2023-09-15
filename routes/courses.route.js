const express = require("express");
const coursesController = require("../controller/courses.controller")
const verifyToken = require("../middlewares/verifyToken");
const {validationSchema} = require('../middlewares/validation_schema');
const allowedTo = require("../middlewares/allowedTo");
const role = require("../utils/role");

const router = express.Router()

router.route('/')
        .get(coursesController.getAllCourses)
        .post(verifyToken, validationSchema(), allowedTo([role.MANAGER]), coursesController.createCourse)


router.route('/:id')
        .get(coursesController.getCourse)
        .patch(verifyToken, allowedTo([role.ADMIN, role.MANAGER]), coursesController.updateCourse)
        .delete(verifyToken, allowedTo([role.ADMIN, role.MANAGER]), coursesController.deleteCourse)


module.exports = router;