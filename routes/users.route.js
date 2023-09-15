const express = require("express");
const {validationSchema} = require('../middlewares/validation_schema')
const userController = require('../controller/users.controller');
const verifyToken = require("../middlewares/verifyToken");
const multer  = require('multer');
const appError = require("../utils/appError");

const storage = multer.diskStorage({
        destination: (req, file, cb) => {
                cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
                const extension = file.mimetype.split('/')[1]
                const fileName = `user-${Date.now()}.${extension}`
                cb(null, fileName)
        },
})

const fileFilter = (req, file, cb) => {
        if (file.mimetype.split('/')[1] === "image") {
                return cb(null, tr)
        }else {
                return cb(appError.create("Invalid file format", 400), false)
        }
}
const upload = multer({
        storage, 
        fileFilter
 })

const router = express.Router()

router.route('/')
        .get(verifyToken, userController.getAllUsers)

router.route('/register')
        .post(upload.single('avatar'), userController.register)

router.route('/login')
        .post(userController.login)



module.exports = router;