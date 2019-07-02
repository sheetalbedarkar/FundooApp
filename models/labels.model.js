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
            type : String, require : [true, "label name is required"]
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

createLabel(body, callback)
{
    const newLabel = new labels({
        "userId" : body.userId,
        "label" : body.label
    })

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
            console.log(err);
        }
    })
}

getLabel(req, field, callback)
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
            console.log(err);
        }
    })
}

updateLabel(req, field, callback)
{
    labels.findByIdAndUpdate({_id : req._id}, field, (err, result) =>
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
            console.log(err);
        }
    })
}

deleteLabel(req, callback)
{
    labels.findByIdAndRemove({_id : req._id}, (err, result) =>
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
            console.log(err);
        }
    })
}
}

const labelModels = new labelModel();
module.exports = labelModels;