const appError = require("../utils/appError");

module.exports = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.currentUser.role)){
            const error = appError.create("You do not have permission to do this", 500)
            return next(error)
        }
        next()
    }
};