let labelModel = require("../models/labels.model.js");

class labelService
{
    constructor(){}

/**
 * @description : service for creating a label
 */
createLabel(req, callback)
{
    labelModel.createLabel(req, (err, data) =>
    {
        try
        {
            if(err)
                throw err;
            else
            {
                return callback(null, data)
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

getLabel(req, callback)
{
    let field = {}
    labelModel.getLabel(req, field, (err, data) =>
    {
        try
        {
            if(err)
                throw err;
            else
            {
                return callback(null, data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

getLabelById(req, callback)
{
    let field = {_id : req._id}
    labelModel.getLabel(req, field, (err, data) =>
    {
        try
        {
            if(err)
                throw err
            else
            {
                return callback(null, data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

updateLabel(req, callback)
{
    let field = {label : req.label}
    labelModel.updateLabel(req, field, (err, data) =>
    {
        try
        {
            if(err)
                throw err;
            else
            {
                return callback(null, data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

deleteLabel(req, callback)
{
    labelModel.deleteLabel(req, (err, data) =>
    {
        try
        {
            if(err)
                throw err;
            else
            {
                return callback(null, data);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    })
}
}

const labelServices = new labelService();
module.exports = labelServices;