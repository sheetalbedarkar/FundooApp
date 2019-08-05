let labelModel = require("../models/labels.model");

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
            return callback(err);
        }
    })
}

/**
 * @description : service for getting all labels from database
 */
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
            return callback(err);
        }
    })
}

/**
 * @description : service for getting a single label from database
 */
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
            return callback(err);
        }
    })
}

/**
 * @description : service for updating a label
 */
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
            return callback(err);
        }
    })
}

/**
 * @description : service for deleting a lable
 */
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
            return callback(err);
        }
    })
}

// getNoteLabels(req, callback)
// {
//     let field = {label : req.label}
//     console.log("field",field)
//     labelModel.getLabel(req, field, (err, data) =>
//     {
//         try
//         {
//             if(err)
//                 throw err
//             else
//             {
//                 return callback(null, data);
//             }
//         }
//         catch(err)
//         {
//             return callback(err);
//         }
//     })
// }

}

const labelServices = new labelService();
module.exports = labelServices;