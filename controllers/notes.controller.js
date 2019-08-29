var notesService = require("../services/notes.services");

/**
 * @description : controller for creating a note
 */
module.exports.createNote = (req, res) =>
{
    req.checkBody("title", "Invalid").isLength({ min: 4 });
    req.checkBody("content", "Invalid").isLength({ min: 4 });

    var errors = req.validationErrors();
    var response = {
        success : false,
        message : "Error while creating a note..",
        data : {}
    };
    try
    {
        if(errors)
        {
            response.message = errors;
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
                if(err)
                {
                    response.message = err;
                    return res.status(400).send(response)
                }
                else
                {
                    response.success = true;
                    response.message = "Note created successfully..";
                    response.result = result;
                    return res.status(200).send(response);
                }
            })
        }
    }
    catch(err)
    {
        return err;
    }
}

/**
 * @description : controller for displaying all notes
 */
module.exports.getAllNotes = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id
    }
    notesService.getAllNotes(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while displaying all notes..",
                data : {}
            }
            if(err)
            {
                response.message = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "All notes are displayed.."
                response.result = result;
                console.log("response",response);
                console.log("result",result)
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
 * @description : controller for displaying a note
 */
module.exports.getNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body.id 
    }
    notesService.getNote(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while displaying a note..",
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
                response.message = "Mention Note is :: "
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
 * @description : controller for updating a note
 */
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
            var response = {
                success : false,
                message : "Error while updating a note..",
                data : {}
            }
            if(err)
            {
                response.message = err
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
            return err;
        }
    })
}

/**
 * @description : controller for deleting a note
 */
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
            var response = {
                success : false,
                message : "Error while deleting a note..",
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
                response.message = "Note deleted successfully.."
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
 * @description : controller for moving a note to trash
 */
module.exports.trashNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body.id,
        // "isTrash" : req.body.isTrash
    }
    notesService.trashNote(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while moving a note to trash..",
                data : {}
            }
            if(err)
            {
                response.message = err
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
            return err;
        }
    })
}

/**
 * @description : controller for making a note archive
 */
module.exports.archiveNote = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id": req.body.id,
        // "isArchive" : req.body.isArchive
    }
    notesService.archiveNote(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while archiving a note..",
                data : {}
            }
            if(err)
            {
                response.message = err
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
            return err;
        }
    })
}

/**
 * @description : controller for setting a reminder to note
 */
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
            var response = {
                success : false,
                message : "Error while setting a reminder to note..",
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
                response.message = "Reminder is set to the Note.."
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
 * @description : controller for searching a note using title
 */
module.exports.searchNoteWithTitle = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "title" : req.body.title
    }
    var response = {
        success : false,
        message : "Error while searching a note..",
        data : {}
    }
    notesService.searchNoteWithTitle(obj, (err, result) =>
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
                response.message = "Searched Notes are :: "
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
 * @description : controller for searching a note using controller
 */
module.exports.searchNoteWithDescription = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "content" : req.body.content
    }
    var response = {
        success : false,
        message : "Error while searching a note..",
        data : {}
    }
    notesService.searchNoteWithDescription(obj, (err, result) =>
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
                response.message = "Searched Notes are :: "
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
 * @description : controller for getting a note using redis-cache
 */
module.exports.getNotes = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id" : req.body._id,
        "content" : req.body.content
    }
    var response = {
        success : false,
        message : "Error while getting notes..",
        data : {}
    }
    notesService.getNotes(obj, (err, result) =>
    {
        try
        {
            if(err)
            {
                response.message = err;
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "Notes are getting.."
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
 * @description : controller for displaying all trash notes
 */
module.exports.getAllTrashNotes = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id
    }
    notesService.getAllTrashNotes(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while displaying all notes..",
                data : {}
            }
            if(err)
            {
                response.message = err
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
            return err;
        }
    })
}

/**
 * @description : controller for displaying all archive notes
 */
module.exports.getAllArchiveNotes = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id
    }
    notesService.getAllArchiveNotes(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while displaying all notes..",
                data : {}
            }
            if(err)
            {
                response.message = err
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
            return err;
        }
    })
}

module.exports.addLabel = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id" : req.body.id,
        "label" : req.body.label
    }
    notesService.addLabel(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while adding label to note..",
                data : {}
            }
            if(err)
            {
                response.message = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "label is set to note.."
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

module.exports.removeLabel = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id" : req.body.id,
        "label" : req.body.label
    }
    notesService.removeLabel(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while removing label from note..",
                data : {}
            }
            if(err)
            {
                response.message = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "label is removed from note.."
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

module.exports.setColor = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id" : req.body.id,
        "color" : req.body.color
    }
    notesService.setColor(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while setting color to note..",
                data : {}
            }
            if(err)
            {
                response.message = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "color is set to note.."
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

module.exports.getNoteLabels = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "label" : req.body.label
    }
    notesService.getNoteLabels(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while getting labels of note..",
                data : {}
            }
            if(err)
            {
                response.message = err
                return res.status(400).send(response)
            }
            else
            {
                response.success = true;
                response.message = "all labels of notes are displayed.."
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

module.exports.deleteReminder = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id,
        "_id" : req.body._id,
    }
    var response = {
        success : false,
        message : "Error while deleting remainder from note..",
        data : {}
    }
    notesService.deleteReminder(obj, (err, result) =>
    {
        try
        {
            if(err)
            {
                response.message = err;
                return res.status(400).send(response);
            }
            else
            {
                response.success = true;
                response.message = "remainder deleted.."
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

module.exports.getAllRemainderNotes = (req, res) =>
{
    var obj = {
        "userId": req.decoded.payload.user_id
    }
    notesService.getAllRemainderNotes(obj, (err, result) =>
    {
        try
        {
            var response = {
                success : false,
                message : "Error while displaying all notes..",
                data : {}
            }
            if(err)
            {
                response.message = err
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
            return err;
        }
    })
}