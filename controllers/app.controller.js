var userService = require('../services/services.js');
var gentoken = require('../middleware/token');
var sendmail = require('../middleware/sendmail');
var upload = require("../services/awsService")
// var redis = require('redis');
// //creates a new client
// var client = redis.createClient();

module.exports.register = (req, res) => {
    //Validating the data using express-validator
    req.checkBody('firstname', 'firstname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('lastname', 'lastname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 8 }).equals(req.body.cpassword);
    var errors = req.validationErrors();
    var response = {};
    try {
        if (errors) {
            response.success = false;
            response.message = "Error while registration of the user.."
            response.error = errors;
            return res.status(422).send(response);
        }
        else {
            userService.register(req.body, (err, result) => {
                try {
                    var responseResult = {};
                    if (err) {
                        response.success = false;
                        response.message = "Unable to register the user.."
                        response.error = err;
                        return res.status(500).send(response)
                    }
                    else {
                        responseResult.success = true;
                        responseResult.message = "Registered successfully.."
                        responseResult.result = result;
                        const payload = {
                            user_id: responseResult.result._id
                        }
                        console.log(payload);
                        //Generate token
                        const obj = gentoken.GenerateToken(payload);
                        console.log("controller obj", obj);
                        const url = `http://localhost:4000/#!/isVerified/${obj.token}`;
                        //send mail
                        sendmail.sendEmailFunction(url, req.body.email);
                        res.status(200).send(url);
                    }
                }
                catch (err) {
                    console.log(err)
                }
            })
        }
    }
    catch (errors) {
        console.log(errors)
    }
}

exports.isVerified = (req, res) => {
    var responseResult = {};
    userService.isVerified(req, (err, result) => {
        try {
            if (err) {
                responseResult.success = false;
                responseResult.message = "Unable to verify the user.."
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                console.log('in user ctrl token is verified giving response');
                responseResult.success = true;
                responseResult.message = "User verified successfully.."
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        }
        catch (err) {
            console.log(err)
        }
    })
}

module.exports.login = (req, res) => {
    //Validating the data using express-validator
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
        response.success = false;
        response.message = "Unable to login.. Please check your email id and password.."
        response.error = errors;
        return res.status(422).send(response);
    }
    else {
        userService.login(req.body, (err, data) => {
            try {
                if (err) 
                {
                    response.success = false;
                    response.message = "Unable to login.."
                    response.error = err;
                    return res.status(500).send(response);
                }
                else 
                {
                    response.success = true;
                    response.message = "Login successfully.."
                    response.data = data;
                    res.status(200).send(response);
                    console.log(data);
                    const payload = 
                    {
                        user_id: data[0]._id
                    }

                    //Generate token
                    const obj = gentoken.GenerateToken(payload);
                    
                    //set token to redis cache
                    client.set(data[0]._id, obj.token)
                    
                    //get token to redis cache
                    client.get(data[0]._id, (err, reply) => 
                    {
                        try {
                            if (err) throw err
                            else 
                            {
                                console.log("Token is getting from client...", reply)
                            }
                        }
                        catch (err) 
                        {
                            console.log(err);
                        }
                    })
                }
            }
            catch (err) 
            {
                console.log(err)
            }
        });
    }

};

exports.forgetPassword = (req, res) => {
    var responseResult = {};
    userService.forgetPassword(req.body, (err, result) => {
        try {
            if (err) {
                responseResult.success = false;
                responseResult.message = "Please enter registered email id.."
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.message = "Reset password link has been sent to your registered mail id."
                responseResult.result = result;
                const payload = {
                    user_id: responseResult.result._id
                }
                console.log(payload);

                //Generate token
                const obj = gentoken.GenerateToken(payload);
                console.log("controller obj", obj);
                const url = `http://localhost:4000/#!/resetPassword/${obj.token}`;

                //Send Mail
                sendmail.sendEmailFunction(url, req.body.email);

                //Send email using this token generated
                res.status(200).send(url);
            }
        }
        catch (err) {
            console.log(err);
        }
    })
}

exports.resetPassword = (req, res) => {
    var responseResult = {};
    userService.resetPassword(req, (err, result) => {
        try {
            if (err) {
                responseResult.success = false;
                responseResult.message = "Unable to reset your password.."
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.message = "Password reset successfully.."
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        }
        catch (err) {
            console.log(err);
        }
    })
}

exports.upload = (req, res) => {
    var fileUpload = upload.single('image')

    var responseResult = {};
    fileUpload(req, res, (err, result) => {
        try {
            //handle error
            if (err) {
                responseResult.success = false;
                responseResult.message = "Error while uploading the image.."
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            //success
            else {
                responseResult.success = true;
                responseResult.message = "Image uploaded successfully.."
                responseResult.result = req.file.location;
                res.status(200).send(responseResult);
            }
        }
        catch (err) {
            console.log(err)
        }
    })
}
