const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
    
    //Generate token
    GenerateToken(payload) {
        const token = jwt.sign({ payload }, process.env.SECRET_KEY, { expiresIn: '1d' }) //expires in one day
        const obj = {
            success: true,
            message: 'Token Generated ',
            token: token
        }
        return obj;
    }
}