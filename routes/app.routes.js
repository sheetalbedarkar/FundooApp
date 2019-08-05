const contuser = require('../controllers/app.controller')
const express = require('express')
const router = express.Router();
const authRoute=require('../Authentication/checkToken')

router.post('/register', contuser.register);

router.post('/isVerified/:token', authRoute.checkToken,contuser.isVerified)

router.post('/login',contuser.login);

router.post('/forgetPassword',contuser.forgetPassword);

router.post('/resetPassword/:token',authRoute.checkToken,contuser.resetPassword);

router.post('/upload', contuser.upload)

//export router to use in our server.js
module.exports = router;