const mongoose = require("mongoose");
const mongoSchema = mongoose.Schema;
const labelSchema = new mongoSchema(
    {
        "userId" : 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "userSchema"
        },
        "label" :
        {
            type : String, 
            require : [true, "label name is required"]
        },
        "note": 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "noteSchema"
        }
    },
    {
        timestamps : true
    }
)

var labels = mongoose.model('labels', labelSchema);

class labelModel
{
    constructor(){}
/** 
 * @description Create and Save a new label
 */
createLabel(body, callback)
{
    const newLabel = new labels({
        "userId" : body.userId,
        "label" : body.label
    })

        /** 
         * @description : Save label in the database
         */
    newLabel.save((err, result) =>
    {
        try
        {
            if(err)
                throw err;
            else
            {
                return callback(null, result);
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}

/**
 * @description : Retrieve and return labels from the database.
 */
getLabel(data, field, callback)
{
    labels.find(field, (err, result) =>
    {
        try
        {
            if(err)
                throw err;
            else
            {
                return callback(null, result);
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}

/** 
 * @description : update a label
 */
updateLabel(data, field, callback)
{
    labels.findByIdAndUpdate({_id : data._id}, field, (err, result) =>
    {
        try
        {
            if(err)
                throw err
            else
            {
                return callback(null, result);
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}

/** 
 * @description : deleting a label
 */
deleteLabel(data, callback)
{
    labels.findByIdAndRemove({_id : data._id}, (err, result) =>
    {
        try
        {
            if(err)
                throw err
            else
            {
                return callback(null, result)
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}
}

const labelModels = new labelModel();
module.exports = labelModels;