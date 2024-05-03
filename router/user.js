const express = require("express");
const router = express.Router();

const { login, signup } = require('../controller/Auth');
const { auth, isStudent, isAdmim } = require("../middlewares/auth");

router.post('/login', login);
router.post('/signup', signup);


//testing purpose route
router.get('/test', auth, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for test"
    })
});



//proctected routes
router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for students"
    })
});

router.get('/admin', auth, isAdmim, (req, res) => {
    res.json({
        success: true,
        message: "welcome to the protected route for Admin"
    })
});
module.exports = router;