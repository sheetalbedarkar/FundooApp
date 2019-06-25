var notesModel = require("../models/notes.model.js");

//service for creating a note
exports.createNote = (req, callback) =>
{
    notesModel.createNote(req, (err, data) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log("---------Service Create a Note-----------")
            callback(null, data);
        }
    })
}

exports.getAllNotes = (req,callback) =>
{
    notesModel.getAllNotes(req, (err, data) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log("---------Service Display all Notes-----------")
            return callback(null, data);
        }
    })
}

exports.getNote = (req, callback) =>
{
    notesModel.getNote(req, (err, data) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log("---------Service Displaying a Note-----------");
            return callback(null, data);
        }
    })
}

exports.updateNote = (req, callback) =>
{
    notesModel.updateNote(req, (err,data) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log("---------Service upadating a Note-----------");
            return callback(null, data);
        }
    })
}

exports.deleteNote = (req, callback) =>
{
    notesModel.deleteNote(req, (err, data) =>
    {
        if(err)
        {
            return callback(err)
        }
        else
        {
            console.log("---------Service deleting a Note-----------")
            return callback(null, data);
        }
    })
}

exports.trashNote = (req, callback) =>
{
    notesModel.trashNote(req, (err, data) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log("---------Service moving a Note to trash-----------");
            return callback(null, data);
        }
    })
}

exports.archiveNote = (req, callback) =>
{
    notesModel.archiveNote(req, (err, data) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log("---------Service moving a Note to archive-----------");
            return callback(null, data);
        }
    })
}

exports.reminderNote = (req, callback) =>
{
    notesModel.reminderNote(req, (err, data) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log("---------Service set reminder to a note-----------");
            return callback(null, data);
        }
    })
}

exports.searchNoteWithTitle = (req, callback) =>
{
    notesModel.searchNoteWithTitle(req, (err, data) =>
    {
        if(err)
        {
            return callback(err)
        }
        else
        {
            console.log("---------Service to search a note with title-----------");
            return callback(null, data);
        }
    })
}

exports.searchNoteWithDescription = (req, callback) =>
{
    notesModel.searchNoteWithDescription(req, (err, data) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log("---------Service to search a note with description-----------");
            return callback(null, data);
        }
    })
}