const mongoose = require("mongoose");
var bcrypt = require('bcrypt')
var salt = 10;

//create instance of schema
var mongoschema = mongoose.Schema
var userSchema = new mongoschema({
    "firstname": { type: String, required: [true, "firstname is required"] },
    "lastname": { type: String, required: [true, "lastname is required"] },
    "isVerified": { type: Boolean, default:false},
    "email": { type: String, required: [true, "email is required"] },
    "password": { type: String, required: [true, "password is required"] },
},
{ 
    versionKey: '_somethingElse' 
},
{
    timestamp : true
});
    
function usermodel() {

}

var user = mongoose.model('user', userSchema);

function hash(password) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
    
}

//API for registeration of user
usermodel.prototype.register = (body, callback) => 
{
    user.find({ 'email': body.email }, (err, data) => 
    {
        if (err) 
        {
            console.log("Error in register schema");
            return callback(err);
        }
        else if (data.length > 0) 
        {
            response = { "error": true, "message": "Email already exists ", "errorCode": 404 };
            return callback(response);
        } 
        else 
        {
           body.password = bcrypt.hashSync(body.password,salt)
            const newUser = new user({
                "firstname": body.firstname,
                "lastname": body.lastname,
                "email": body.email,
                "password": body.password
            });
            
            newUser.save((err, result) => 
            {
                if (err) 
                {
                    console.log("error came");
                    console.log("error in model file", err);
                    return callback(err);
                }
                else 
                {
                    console.log(body.firstname);
                    console.log("Data saved successfully", result);
                    callback(null, result);
                    console.log("No return statements.. Registered successfully");
                }
            })

        }
    });
}

//API to check the verified user
usermodel.prototype.isVerified = (req,callback) =>
{
    console.log("in controller verified");
    
    user.updateOne({ _id:req.decoded.payload.user_id},{$set:{isVerified:true}}, (err, result) =>
    {
        if(err) 
        {
            return callback(err);
        }
        else 
        {
                return callback(null,result);
        }
    })
}

//API for login the verified user
usermodel.prototype.login = (body, callback) => 
{   
    user.find({ "email": body.email }, (err, data) => 
    {
        if (err) 
        {
            return callback(err);
        } 
        else if (data.length > 0) 
        {
            bcrypt.compare(body.password, data[0].password, (err, res) => 
            { 
                if (err) 
                {
                    return callback(err);
                } 
                else if (res) 
                {
                    if(data[0].isVerified === true)
                    {
                        console.log(data);
                        console.log("login successfully......!");
                        callback(null, data);
                        
                    }
                    else
                    {
                        console.log(data);
                        console.log("user is not verified.. please verify..")
                        return callback("Verify your email..").status(500)
                    }
                               
                }
                else 
                {
                    console.log("incorrect password please check it once ");
                    return callback("Incorrect password").status(500);
                }
            });
        }
        else 
        {
            console.log(body.firstname);
            console.log(body.password);
            console.log("username is not in database please check it.")
            return callback("Invalid User");
        }
    });
}

//API for the forget password
usermodel.prototype.forgetPassword=(data,callback)=>
{
    user.findOne({"email":data.email},(err,result)=>
    {
        if(err) 
        {
            callback(err);
        }
        else 
        {
            if(result!==null && data.email==result.email) 
            {
                callback(null,result);
            }
            else 
            {
                callback("inncorrect mail")
            }
        }
    })
}

//API for reset password
usermodel.prototype.resetPassword=(req,callback)=> 
{
    console.log("in user models")
    console.log('in model--data:--',req.decoded);
    console.log('in model--body:--',req.body);
    let newpassword=bcrypt.hashSync(req.body.password,salt);
    console.log(('new pass bcrypt--',newpassword));
    user.updateOne({ _id:req.decoded.payload.user_id},{$set: {password:newpassword}},(err,result)=>
    {
        if(err) 
        {
            callback(err);
        }
        else 
        {
            callback(null,result);
        }  
    })   
}

module.exports = new usermodel();