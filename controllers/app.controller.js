var userService = require('../services/services');
var gentoken = require('../middleware/token');
var sendmail = require('../middleware/sendmail');
var upload = require("../services/awsService")

/**
 * @description : controller for registeration of the user
 */
module.exports.register = (req, res) => {
    /**
     * @description : Validating the data using express-validator
     */
    req.checkBody('firstname', 'firstname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('lastname', 'lastname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 8 }).equals(req.body.cpassword);
    var errors = req.validationErrors();
    var response = {
        success : false,
        message : "Error while registration of the user..",
        data : {}
    };
    try {
        if (errors) {
            response.message = errors;
            return res.status(422).send(response);
        }
        else {
            userService.register(req.body, (err, result) => {
                if (err) {
                    response.message = err;
                    return res.status(404).send(response)
                }
                else {
                    response.success = true;
                    response.message = "Registered successfully.."
                    response.result = result;
            
                    const payload = {
                        user_id: response.result._id
                    }
                    /**
                     * @description : Generate token
                     */
                    const obj = gentoken.GenerateToken(payload);

                    const url = `http://localhost:4200/user/isVerified/${obj.token}`;
                    /**
                     * @description : send mail
                     */
                    sendmail.sendEmailFunction(url, req.body.email);
                    res.status(200).send(response);
                }
            })
        }
    }
    catch (err) {
        return err;
    }
}

/**
 * @description : controller to check verification of the user
 */
exports.isVerified = (req, res) => {
    var responseResult = {
        success : false,
        message : "Unable to verify the user..",
        data : {}
    };
    userService.isVerified(req, (err, result) => {
        try {
            if (err) {
                responseResult.message = err;
                res.status(404).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.message = "User verified successfully.."
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        }
        catch (err) {
            return err;
        }
    })
}

/**
 * @description : controller to login the user
 */
module.exports.login = (req, res) => {
    /**
     * @description : Validating the data using express-validator
     */
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    var errors = req.validationErrors();
    var response = {
        success : false,
        message : "Unable to login.. Please check your email id and password..",
        data : {}
    };
    if (errors) {
        response.message = errors;
        return res.status(422).send(response);
    }
    else {
        userService.login(req.body, (err, data) => {
            try {
                if (err) 
                {
                    response.message = err;
                    return res.status(404).send(response);
                }
                else 
                {
                    response.success = true;
                    response.message = "Login successfully.."
                    response.data = data;
                    
                    const payload = 
                    {
                        user_id: data[0]._id
                    }

                    /**
                     * @description : Generate token
                     */
                    const obj = gentoken.GenerateToken(payload);

                    /**
                     * @description : set token to redis cache
                     */
                    client.set(obj.token, obj.token)
                    response.token=obj.token
                    res.status(200).send(response);

                    /**
                     * @description : get token to redis cache
                     */
                    client.get(obj.token, (err, reply) => 
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
                            return err;
                        }
                    })
                }
            }
            catch (err) 
            {
                return err;
            }
        });
    }

};

/**
 * @description : controller to forget the password
 */
exports.forgetPassword = (req, res) => {
    var responseResult = {
        success : false,
        message : "Please enter registered email id..",
        data : {}
    };
    userService.forgetPassword(req.body, (err, result) => {
        try {
            if (err) {
                responseResult.message = err;
                res.status(404).send(responseResult)
            }
            else 
            {
                responseResult.success = true;
                responseResult.message = "Reset password link has been sent to your registered mail id."
                responseResult.result = result;
                const payload = {
                    user_id: responseResult.result._id
                }
                /**
                 * @description : Generate token
                 */
                const obj = gentoken.GenerateToken(payload);

                const url = `http://localhost:4200/user/resetPassword/${obj.token}`;

                /**
                 * @description : Send Mail
                 */
                sendmail.sendEmailFunction(url, req.body.email);

                /**
                 * @description : Send email using this token generated
                 */
                res.status(200).send(responseResult);
            }
        }
        catch (err) {
            return err;
        }
    })
}

/**
 * @description : controller to reset the password of the user
 */
exports.resetPassword = (req, res) => {
    var responseResult = {
        success : false,
        message : "Unable to reset your password..",
        data : {}
    };
    userService.resetPassword(req, (err, result) => {
        try {
            if (err) {
                
                responseResult.message = err;
                res.status(404).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.message = "Password reset successfully.."
                responseResult.result = result;
                res.status(200).send(responseResult);
            }
        }
        catch (err) {
            return err;
        }
    })
}

/**
 * @description : controller for uploading the image in s3-bucket
 */
exports.upload = (req, res) => {
    var fileUpload = upload.single('image')

    var responseResult = {
        success : false,
        message : "Error while uploading the image..",
        data : {}
    };
    fileUpload(req, res, (err, result) => {
        try {
            //handle error
            if (err) {
                responseResult.message = err;
                res.status(404).send(responseResult)
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
            return err;
        }
    })
}
