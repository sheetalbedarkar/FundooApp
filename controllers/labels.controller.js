var labelService = require("../services/labels.service.js");

module.exports.createLabel =  (req, res) =>
{
    req.checkBody("label" , "Invalid").isLength({ min : 3 });

    let errors = req.validationErrors();
    let response = {};

    if(errors)
    {
        response.success = false;
        response.message = "Unble to create label.."
        response.error = errors;
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
                let responseResult = {}
                if(err)
                {
                    responseResult.success = false;
                    responseResult.message = "Error while creating a label..";
                    responseResult.error = err;
                    return res.status(400).send(responseResult);
                }
                else
                {
                    responseResult.success = true;
                    responseResult.message = "Label created successfully..";
                    responseResult.result = result;
                    return res.status(200).send(responseResult);
                }
            }
            catch(err)
            {
                console.log(err);
            }
        })
    }
}

module.exports.getLabel = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id
    }
    labelService.getLabel(obj, (err, result) =>
    {
        try
        {
            let response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while displaying the labels"
                response.error = err;
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
            console.log(err)
        }
    })
}

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
            let response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while displaying a label.."
                response.error = err
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
            console.log(err);
        }
    })
}

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
            let response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while updating a label..."
                response.error = err;
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
        catch
        {
            console.log(err);
        }
    })
}

module.exports.deleteLabel = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id
    }
    labelService.deleteLabel(req.body, (err, result) =>
    {
        try
        {
            let response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while deleting a label.."
                response.error = err;
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
            console.log(err);
        }
    })
}