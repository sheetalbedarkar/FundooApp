const mongoose = require("mongoose");
var bcrypt = require('bcrypt')
var salt = 10;

/**
 * @description : create instance of schema
 */
var mongoschema = mongoose.Schema
var userSchema = new mongoschema({
    "firstname": 
    { 
        type: String, 
        required: [true, "firstname is required"] 
    },
    "lastname": 
    { 
        type: String, 
        required: [true, "lastname is required"] 
    },
    "isVerified": 
    { 
        type: Boolean, 
        default: false 
    },
    "email": 
    { 
        type: String, 
        required: [true, "email is required"] 
    },
    "password": 
    { 
        type: String, 
        required: [true, "password is required"] 
    }
},
    {
        versionKey: '_somethingElse'
    },
    {
        timestamp: true
    });
/** @export */
function usermodel() {

}

var user = mongoose.model('user', userSchema);

/**
 * @description : API for registeration of user
 */
usermodel.prototype.register = (body, callback) => {
    user.find({ 'email': body.email }, (err, data) => {
        try {
            if (err)
                throw err;
            else if (data.length > 0) {
                var response = { "err": true, "message": "Email already exists ", "errorCode": 404 };
                return callback(response);
            }
            else {
                body.password = bcrypt.hashSync(body.password, salt)
                const newUser = new user({
                    "firstname": body.firstname,
                    "lastname": body.lastname,
                    "email": body.email,
                    "password": body.password
                });

                newUser.save((err, result) => {
                    if (err)
                        throw err;
                    else 
                    {
                        callback(null, result);
                    }
                })
            }
        }
        catch (err) {
            return callback(err);
        }
    });
}

/**
 * @description : API to check the verified user
 */
usermodel.prototype.isVerified = (data, callback) => {
    user.updateOne({ _id: data.decoded.payload.user_id }, { $set: { isVerified: true } }, (err, result) => {
        try {
            if (err)
                throw err;
            else {
                return callback(null, result);
            }
        }
        catch (err) {
            return callback(err);
        }
    })
}

/**
 * @description : API for login the verified user
 */
usermodel.prototype.login = (body, callback) => {
    user.find({ "email": body.email }, (err, data) => {
        try {
            if (err)
                throw err;
            else if (data.length > 0) 
            {
                bcrypt.compare(body.password, data[0].password, (err, res) => 
                {
                    if (err)
                        throw err;
                    else if (res) 
                    {
                        if (data[0].isVerified === true) 
                        {
                            callback(null, data);
                        }
                        else 
                        {
                            return callback("Verify your email..")
                        }

                    }
                    else 
                    {
                        return callback("Incorrect password")
                    }
                });
            }
            else 
            {
                return callback("Invalid User");
            }
        }
        catch (err) {
            return callback(err);
        }
    });
}

/**
 * @description : API for the forget password
 */
usermodel.prototype.forgetPassword = (data, callback) => {
    user.findOne({ "email": data.email }, (err, result) => {
        try {
            if (err)
                throw err;
            else {
                if (result !== null && data.email == result.email) {
                    callback(null, result);
                }
                else {
                    callback("inncorrect mail")
                }
            }
        }
        catch (err) {
            return callback(err);
        }
    })
}

/**
 * @description : API for reset password
 */
usermodel.prototype.resetPassword = (data, callback) => {
    let newpassword = bcrypt.hashSync(data.body.password, salt);
    user.updateOne({ _id: data.decoded.payload.user_id }, { $set: { password: newpassword } }, (err, result) => {
        try {
            if (err)
                throw err;
            else {
                callback(null, result);
            }
        }
        catch (err) {
            return callback(err);
        }
    })
}

module.exports = new usermodel();