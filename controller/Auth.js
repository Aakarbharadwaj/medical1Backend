const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv").config();


exports.signup = async (req, res) => {
    try {
        //fetch data from req body
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });

        //check for already registered user
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'user already exist',
            });
        }

        //password hashing
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "error in hashing",
            })
        }

        const user = await User.create({ name, email, password: hashedPassword, role });
        return res.status(200).json({
            success: true,
            message: "user registered successfully",
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "user not registered",
        })
    }
}



//login

exports.login = async (req, res) => {
    try {
        //data fetch
        const { email, password } = req.body;
        //validation on email and password 
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "email or password missing"
            });
        }
        //check for registered user
        const user = await User.findOne({ email });

        //if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "no user found"
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).json({
                success: false,
                message: "password incorrect"
            });
        }
        //verify password and generate jwt token
        const payLoad = {
            email: user.email,
            id: user._id,
            role: user.role,
        }
        const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: "1m",
        });

        // user = user.toObject();
        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "user logged in successfully"
        })
    }



    catch (error) {
        console.error("error in loginng in", error)
        return res.status(500).json({
            success: false,
            message: "Login Faliure",
            error: error.message
        })
    }
}


// Make sure to import the User model

// exports.login = async (req, res) => {
//     try {
//         //data fetch
//         const { email, password } = req.body;
//         //validation on email and password
//         if (!email || !password) {
//             res.status(400).json({
//                 success: false,
//                 message: "email or password missing"
//             });
//             return; // Add this return statement
//         }
//         //check for registered user
//         const user = await User.findOne({ email });

//         //if not a registered user
//         if (!user) {
//             res.status(401).json({
//                 success: false,
//                 message: "no user found"
//             });
//             return; // Add this return statement
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (!passwordMatch) {
//             return res.status(403).json({
//                 success: false,
//                 message: "password incorrect"
//             });
//         }
//         //verify password and generate jwt token
//         const payLoad = {
//             email: user.email,
//             id: user._id,
//             role: user.role,
//         }
//         const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
//             expiresIn: "2h",
//         });

//         // user = user.toObject();
//         user.token = token;
//         user.password = undefined;
//         const options = {
//             expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
//             httpOnly: true
//         }
//         res.cookie("token", token, options).status(200).json({
//             success: true,
//             token,
//             user,
//             message: "user logged in successfully"
//         })
//     } catch (error) {
//         console.error("error in loginng in", error)
//         return res.status(500).json({
//             success: false,
//             message: "Login Faliure",
//             error: error.message
//         })
//     }
// }

