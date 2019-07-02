var userModel = require('../models/app.model.js');

/** 
 * @description : Register purpose
 */
exports.register = (req, callback) => 
{
    userModel.register(req, (err, data) => 
    {
        try
        {
            if (err) 
            {
                return callback(err);
            } 
            else 
            {
                console.log("services register");
                return callback(null, data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

/** 
 * @description : Email verification purpose
 */
exports.isVerified = (req, callback) => 
{
    userModel.isVerified(req, (err, data) => 
    {
        try
        {
            if (err) 
            {
                return callback(err);
            } 
            else 
            {
                console.log("services verfication");
                return callback(null, data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}
    
/**
 * @description : Login purpose
 */
exports.login = (req, callback) => 
{
    userModel.login(req, (err, data) => 
    {
        try
        {
            if (err) 
            {
                return callback(err);
            } 
            else 
            {
                console.log("services login");
                return callback(null, data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

/** 
 * @description : forget purpose
 */
exports.forgetPassword=(data,callback)=>
{
    userModel.forgetPassword(data,(err,result)=>
    {
        try
        {
            if(err)
            {
                callback(err);
            }
            else 
            {
                console.log("services forgetPassword")
                callback(null,result)      
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

/**
 * @description : reset purpose
 */
exports.resetPassword=(req,callback)=>
{
    console.log("in reset services")
    userModel.resetPassword(req,(err,result)=>
    {
        try
        {
            if(err)
            {
                callback(err);
            }
            else 
            {
                console.log("services resetPass")
                callback(null,result)
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
} 
