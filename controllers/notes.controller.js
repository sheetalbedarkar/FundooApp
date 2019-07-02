var notesService = require("../services/notes.services.js");
var redis = require('redis');
//creates a new client
var client = redis.createClient();


module.exports.createNote = (req, res) =>
{
    req.checkBody("title", "Invalid").isLength({ min: 4 });
    req.checkBody("content", "Invalid").isLength({ min: 4 });

    var errors = req.validationErrors();
    var response = {};
    try
    {
        if(errors)
        {
            response.success = false;
            response.message = "Error while creating a note.."
            response.error = errors;
            return res.status(422).send(response);
        }
        else
        {
            var obj = {
                "userId": req.decoded.payload.user_id,
                "title": req.body.title,
                "content": req.body.content
            }
            notesService.createNote(obj, (err, result) =>
            {
                var responseResult = {};
                if(err)
                {
                    responseResult.success = false;
                    responseResult.message = "Unable to create a note.."
                    responseResult.error = err;
                    return res.status(400).send(responseResult)
                }
                else
                {
                    responseResult.success = true;
                    responseResult.message = "Note created successfully..";
                    responseResult.result = result;
                    return res.status(200).send(responseResult);
                }
            })
        }
    }
    catch(err)
    {
        console.log(err);
    }
}

module.exports.getAllNotes = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id
    }
    notesService.getAllNotes(obj, (err, result) =>
    {
        try
        {
            var response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while displaying all notes..";
                response.error = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "All notes are displayed.."
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

module.exports.getNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id 
    }
    notesService.getNote(obj, (err, result) =>
    {
        try
        {
            var response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while displaying a note..";
                response.error = err
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Mention Note is :: "
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

module.exports.updateNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id,
        "title": req.body.title,
        "content": req.body.content
    }
    notesService.updateNote(obj, (err, result) =>
    {
        try
        {
            var response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while updating a note..";
                response.error = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "Note updated successfully.."
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

module.exports.deleteNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id
    }
    notesService.deleteNote(obj, (err, result) =>
    {
        try
        {
            var response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while deleting a note..";
                response.error = err
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Note deleted successfully.."
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

module.exports.trashNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id,
        "trash" : req.body.trash
    }
    notesService.trashNote(obj, (err, result) =>
    {
        try
        {
            var response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while moving a note to trash..";
                response.error = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "Note has been moved to trash.."
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

module.exports.archiveNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id,
        "archive" : req.body.archive
    }
    notesService.archiveNote(obj, (err, result) =>
    {
        try
        {
            var response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while archiving a note..";
                response.error = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "Note archived successfully.."
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

module.exports.reminderNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body._id,
        "reminder" : req.body.reminder
    }
    notesService.reminderNote(obj, (err, result) =>
    {
        try
        {
            var response = {}
            if(err)
            {
                response.success = false;
                response.message = "Error while setting a reminder to note..";
                response.error = err
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Reminder is set to the Note.."
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

module.exports.searchNoteWithTitle = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "title" : req.body.title
    }
    var response = {}
    notesService.searchNoteWithTitle(obj, (err, result) =>
    {
        try
        {
            if(err)
            {
                response.success = false;
                response.message = "Error while searching a note..";
                response.error = err
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Searched Notes are :: "
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

module.exports.searchNoteWithDescription = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "content" : req.body.content
    }
    var response = {}
    notesService.searchNoteWithDescription(obj, (err, result) =>
    {
        try
        {
            if(err)
            {
                response.success = false;
                response.message = "Error while searching a note..";
                response.error = err
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Searched Notes are :: "
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

module.exports.getNotesWithRedis = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id" : req.body._id,
        "content" : req.body.content
    }
    var response = {}
    notesService.getNotesWithRedis(obj, (err, result) =>
    {
        try
        {
            if(err)
            {
                response.success = false;
                response.message = "Error while getting notes from the redis cache.."
                response.error = err;
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Notes are getting from redis cache.."
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