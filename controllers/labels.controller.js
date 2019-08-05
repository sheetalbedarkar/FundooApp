var labelService = require("../services/labels.service");

/**
 * @description : controller for creating a label
 */
module.exports.createLabel =  (req, res) =>
{
    let response = {
        success: false,
        message: "Error while creating a label..",
        data: {}
    }

    req.checkBody("label" , "Invalid").isLength({ min : 3 });

    let errors = req.validationErrors();
    if(errors)
    {
        response.message = errors
        return res.status(422).send(response);
    }
    else
    {
        var obj = {
            "userId": req.decoded.payload.user_id,
            "label": req.body.label
        }
        labelService.createLabel(obj, (err, result) =>
        {
            try
            {
                if(err)
                {
                    response.message = err
                    return res.status(400).send(response);
                }
                else
                {
                    response.success = true;
                    response.message = "Label created successfully..";
                    response.data = result;
                    return res.status(200).send(response);
                }
            }
            catch(err)
            {
                return err;
            }
        })
    }
}

/**
 * @description : controller for displaying all labels
 */
module.exports.getLabel = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id
    }
    labelService.getLabel(obj, (err, result) =>
    {
        try
        {
            let response = {
                success : false,
                message : "Error while displaying the labels",
                data : {}
            }
            if(err)
            {
                response.message = err;
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Labels are displayed..";
                response.result = result;
                return res.status(200).send(response);
            }
        }
        catch(err)
        {
            return err;
        }
    })
}

/**
 * @description : controller for displaying a single label
 */
module.exports.getLabelById = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id
    }
    labelService.getLabelById(obj, (err, result) =>
    {
        try
        {
            let response = {
                success : false,
                message : "Error while displaying a label..",
                data : {}
            }
            if(err)
            {
                response.message = err
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Specified label is displayed.."
                response.result = result;
                return res.status(200).send(response);
            }
        }
        catch(err)
        {
            return err;
        }
    })
}

/**
 * @description : controller for updating a label
 */
module.exports.updateLabel = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id,
        "label": req.body.label
    }
    labelService.updateLabel(obj, (err, result) =>
    {
        try
        {
            let response = {
                success : false,
                message : "Error while updating a label...",
                data : {}
            }
            if(err)
            {
                response.message = err;
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Note Updated successfully..";
                response.result = result;
                return res.status(200).send(response);
            }
        }
        catch(err)
        {
            return err;
        }
    })
}

/**
 * @description : controller for deleting a label
 */
module.exports.deleteLabel = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id
    }
    labelService.deleteLabel(obj, (err, result) =>
    {
        try
        {
            let response = {
                success : false,
                message : "Error while deleting a label..",
                data : {}
            }
            if(err)
            {
                response.message = err;
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Label deleted successfully.."
                response.result = result;
                return res.status(200).send(response);
            }
        }
        catch(err)
        {
            return err;
        }
    })
}

// module.exports.getNoteLabels = (req, res) =>
// {
//     var obj = {
//         "userId": req.decoded.payload.user_id,
//         "note" : req.body.note,
//         "label" : req.body.label
//     }
//     labelService.getNoteLabels(obj, (err, result) =>
//     {
//         try
//         {
//             var response = {
//                 success : false,
//                 message : "Error while getting labels of note..",
//                 data : {}
//             }
//             if(err)
//             {
//                 response.message = err
//                 return res.status(400).send(response)
//             }
//             else
//             {
//                 response.success = true;
//                 response.message = "all labels of notes are displayed.."
//                 response.result = result;
//                 return res.status(200).send(response);
//             }
//         }
//         catch(err)
//         {
//             return err;
//         }
//     })
// }