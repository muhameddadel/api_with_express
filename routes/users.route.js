const express = require("express");
const {validationSchema} = require('../middlewares/validation_schema')
const userController = require('../controller/users.controller')

const router = express.Router()

router.route('/')
        .get(userController.getAllUsers)

router.route('/register')
        .post(userController.register)

router.route('/login')
        .post(userController.login)



module.exports = router;