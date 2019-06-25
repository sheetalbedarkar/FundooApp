var notesService = require("../services/notes.services.js");

module.exports.createNote = (req, res) =>
{
    req.checkBody("title", "Invalid").isLength({ min: 4 });
    req.checkBody("content", "Invalid").isLength({ min: 4 });

    var errors = req.validationErrors();
    var response = {};

    if(errors)
    {
        response.success = false;
        response.error = errors;
        return res.status(422).send(response);
    }
    else
    {
        notesService.createNote(req.body, (err, result) =>
        {
            console.log("--------Create a note in controller-----------");
            var responseResult = {};
            if(err)
            {
                return res.status(400).send({
                    message : err
                })
            }
            else
            {
                response.success = true;
                response.result = result;
                return res.status(200).send(responseResult);
            }
        })
    }
}

module.exports.getAllNotes = (req, res) =>
{
    notesService.getAllNotes(req.body, (err, result) =>
    {
        var response = {}
        if(err)
        {
            return res.status(400).send({
                message: err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })
}

module.exports.getNote = (req, res) =>
{
    notesService.getNote(req.body, (err, result) =>
    {
        var response = {}
        if(err)
        {
            return res.status(400).send({
                message : err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })
}

module.exports.updateNote = (req, res) =>
{
    notesService.updateNote(req.body, (err, result) =>
    {
        var response = {}
        if(err)
        {
            return res.status(400).send({
                message : err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })
}

module.exports.deleteNote = (req, res) =>
{
    notesService.deleteNote(req.body, (err, result) =>
    {
        var response = {}
        if(err)
        {
            return res.status(400).send({
                message : err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })
}

module.exports.trashNote = (req, res) =>
{
    notesService.trashNote(req.body, (err, result) =>
    {
        var response = {}
        if(err)
        {
            return res.status(400).send({
                message : err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })
}

module.exports.archiveNote = (req, res) =>
{
    notesService.archiveNote(req.body, (err, result) =>
    {
        var response = {}
        if(err)
        {
            return res.status(400).send({
                message : err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })
}

module.exports.reminderNote = (req, res) =>
{
    notesService.reminderNote(req.body, (err, result) =>
    {
        var response = {}
        if(err)
        {
            return res.status(400).send({
                message : err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })
}

module.exports.searchNoteWithTitle = (req, res) =>
{
    var response = {}
    notesService.searchNoteWithTitle(req.body, (err, result) =>
    {
        if(err)
        {
            return res.status(400).send({
                message : err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })  
}

module.exports.searchNoteWithDescription = (req, res) =>
{
    var response = {}
    notesService.searchNoteWithDescription(req.body, (err, result) =>
    {
        if(err)
        {
            return res.status(400).send({
                message : err
            })
        }
        else
        {
            response.success = true;
            response.result = result;
            return res.status(200).send(response);
        }
    })
}