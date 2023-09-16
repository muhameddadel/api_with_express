const express = require("express");
const {validationSchema} = require('../middlewares/validation_schema')
const userController = require('../controller/users.controller');
const verifyToken = require("../middlewares/verifyToken");
const multer  = require('multer');
const appError = require("../utils/appError");

const diskStorage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function(req, file, cb) {
            const ext = file.mimetype.split('/')[1];
            const fileName = `user-${Date.now()}.${ext}`;
            cb(null, fileName);
        }
})
    
const fileFilter = (req, file, cb) => {
        const imageType = file.mimetype.split('/')[0];
        
        if(imageType === 'image') {
            return cb(null, true)
        } else {
            return cb(appError.create('file must be an image', 400), false)
        }
    }
    
const upload = multer({ 
        storage: diskStorage,
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