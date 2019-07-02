var notesModel = require("../models/notes.model.js");


class userService
{
    constructor(){}
    
/**
 * @description : service for creating a note
 */
createNote(req, callback)
{
    notesModel.createNote(req, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err)
        }
    })
}

/**
 * @description : service for get all notes
 */
getAllNotes(req,callback)
{
    let field = {}
    notesModel.getAllNotes(req, field, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err)
        }
    })
}

/**
 * @description : service for get a note with noteId
 */
getNote(req, callback)
{
    let field = { _id: req._id }
    notesModel.getAllNotes(req, field, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

/**
 * @description : service for update a note with noteId
 */
updateNote(req, callback)
{
    notesModel.updateNote(req, (err,data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err)
        }
    })
}

/**
 * @description : service for delete a note with noteId
 */
deleteNote(req, callback)
{
    notesModel.deleteNote(req, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

/**
 * @description : service for trash a note with noteId
 */
trashNote(req, callback)
{
    let field = {trash : true }
    notesModel.updateNote(req, field, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err)
        }
    })
}

/**
 * @description : service for archive a note with noteId
 */
archiveNote(req, callback)
{
    let field = {archive : true }
    notesModel.updateNote(req, field, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

/**
 * @description : service to set reminder to a note
 */
reminderNote(req, callback)
{
    let field = { reminder : req.reminder }
    notesModel.updateNote(req, field, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err)
        }
    })
}

/**
 * @description : service for search a note with title
 */
searchNoteWithTitle(req, callback)
{
    let field = { title:{$regex  : req.title}}
    notesModel.getAllNotes(req, field, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

/**
 * @description : service for get a note with description
 */
searchNoteWithDescription(req, callback)
{
    let field = { content:{$regex  : req.content}}
    notesModel.getAllNotes(req, field, (err, data) =>
    {
        try
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
        }
        catch(err)
        {
            console.log(err);
        }
    })
}

getNotesWithRedis(req, callback)
{
    let field = {}
    notesModel.getAllNotes(req, field, (err, data) =>
    {
        if(err)
        {
            return callback(err)
        }
        else
        {
           client.set(data[0]._id.toString(), data[0].content)
                 client.get(data[0]._id.toString(), (err, reply) =>
                 {
                     if(err)
                     {
                         return callback(err)
                     }
                     else
                     {
                         console.log("REPLY ::::",reply);
                         console.log("data.id :::::",data[0]._id)
                        return callback()
                     }
                 })
                            
        }
    })
}
}
const notesService = new userService()
module.exports = notesService