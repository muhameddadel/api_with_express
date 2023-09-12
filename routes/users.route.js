const express = require("express");
const {validationSchema} = require('../middlewares/validation_schema')
const userController = require('../controller/users.controller');
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router()

router.route('/')
        .get(verifyToken, userController.getAllUsers)

router.route('/register')
        .post(userController.register)

router.route('/login')
        .post(userController.login)



module.exports = router;