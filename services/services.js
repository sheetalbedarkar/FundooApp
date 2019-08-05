var userModel = require('../models/app.model');

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
                return callback(null, data);
            }
        }
        catch(err)
        {
            return callback(err);
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
                return callback(null, data);
            }
        }
        catch(err)
        {
            return callback(err);
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
                return callback(null, data);
            }
        }
        catch(err)
        {
            return callback(err);
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
                callback(null,result)      
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}

/**
 * @description : reset purpose
 */
exports.resetPassword=(req,callback)=>
{
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
                callback(null,result)
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
} 
