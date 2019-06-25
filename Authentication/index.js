const jwt = require('jsonwebtoken')
require('dotenv').config();

exports.checkToken = (req, res, next) => {
    var token1 = req.header('token'); //decode token
    if (token1) 
    {       
        //verify secret and checks exp 
        jwt.verify(token1, process.env.SECRET_KEY, (err, decoded) => 
        {
            
            if (err) 
            {
                return res.send({
                    sucess: false,
                    message: "token is not valid"
                })
            }

            //req decoded and next will pass the controller
            else
            {
                req.decoded = decoded;
                 next();
            }
            });
    }
    else 
    {       
        //if there is no token return an error
        return res.send(
        {
            sucess: false,
            message: "No token provided"
        })
    }
}
    