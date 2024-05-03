const jwt = require("jsonwebtoken")
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        //extracting jwt token
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'token not found'
            })
        }

        //verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode)
            req.user = decode;
            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: 'token not valid'
            })
        }
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: 'somthing went wrong'
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'this is protected route for students'
            })
        }
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: 'role is not matching'
        })
    }
}

exports.isAdmim = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'this is protected rout for Admin'
            })
        }
        next();
    }
    catch (err) {
        res.status(401).json({
            success: false,
            message: 'role is not matching'
        })
    }
}