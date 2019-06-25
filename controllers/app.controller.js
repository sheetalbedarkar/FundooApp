var userService = require('../services/services.js'); 
var gentoken = require('../middleware/token');
var sendmail = require('../middleware/sendmail'); 
var upload = require("../services/awsService")
var redis = require('redis');
//creates a new client
var client = redis.createClient();

module.exports.register= (req, res) => 
{
    //Validating the data using express-validator
    req.checkBody('firstname', 'firstname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('lastname', 'lastname is not valid').isLength({ min: 3 }).isAlpha();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 8 }).equals(req.body.cpassword);
    var errors = req.validationErrors();
    var response = {};
    if (errors) 
    {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } 
    else 
    {
        console.log("Register")
        userService.register(req.body, (err, result) => 
        {
            console.log("In controller")
            var responseResult = {};
            if (err) 
            {
                console.log(err);
                return res.status(500).send({
                    message: err
                })
            } 
            else 
            {
            responseResult.success = true;
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
            sendmail.sendEmailFunction(url,req.body.email);
            res.status(200).send(url);
            }
        })
    }
}

exports.isVerified = (req, res) => 
{
    console.log("in verify email controller")
    var responseResult = {}; 
    userService.isVerified(req, (err, result) => 
    {
        if (err) 
        {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else 
        {
            console.log('in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}

module.exports.login = (req, res) => 
{
    console.log("req in controller", req.body);

    //Validating the data using express-validator
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'password is not valid').isLength({ min: 4 });
    var errors = req.validationErrors();
    var response = {};
    if (errors) 
    {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    } 
    else 
    {
        userService.login(req.body, (err, data) => 
        {
            if (err) 
            {
                return res.status(500).send({
                    message: err
                }); 
            }    
            else 
            {     
                res.status(200).send({
                    message: data,
                });   
                console.log(data);
                const payload = {
                    user_id: data._id
                }
                
                //Generate token
                const obj = gentoken.GenerateToken(payload);
                
                //set token to redis cache
                client.set(data._id, obj, (err, reply) =>
                {
                    if(err)
                        return err;
                    else
                    {
                        console.log("Token is SET to the client..", reply)
                    }
                });  

                //get token to redis cache
                client.get(data._id, (err, reply) =>
                {
                    if(err) throw err
                    else
                    {
                        console.log("Token is getting from client...", reply)
                    }
                })  
            }
        });
    }
};

exports.forgetPassword = (req, res) => 
{
    var responseResult = {};
    userService.forgetPassword(req.body, (err, result) => 
    {
        if (err) 
        {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else 
        { 
            responseResult.success = true;
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
            sendmail.sendEmailFunction(url,req.body.email);

            //Send email using this token generated
            res.status(200).send(url);
        }
    })
}

exports.resetPassword = (req, res) => 
{
    console.log("in reset controller")
    var responseResult = {}; 
    userService.resetPassword(req, (err, result) => 
    {
        if (err) 
        {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else 
        {
            console.log('in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}

exports.upload = (req, res) => 
{
    var fileUpload = upload.single('image')

    var responseResult = {}; 
    fileUpload(req,res, (err, result) => 
    {
        //handle error
        if (err) 
        {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        //success
        else 
        {
            console.log('in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = req.file.location;
            res.status(200).send(responseResult);
        }
    })
}
