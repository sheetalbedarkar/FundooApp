var notesModel = require("../models/notes.model");

class userService
{
    constructor(){}
    
/**
 * @description : service for creating a note
 */
createNote(data, callback)
{
    notesModel.createNote(data, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
            else
            {
                callback(null, data);
            }
        }
        catch(err)
        {
            return callback(err);
        }
    })
}

/**
 * @description : service for get all notes
 */
getAllNotes(data,callback)
{
    let field = {isTrash : false, isArchive : false}
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
            else
            {
                console.log("note services",data)
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
 * @description : service for get a note with noteId
 */
getNote(data, callback)
{
    let field = { _id: data._id }
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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
 * @description : service for update a note with noteId
 */
updateNote(data, callback)
{
    var id = {
      _id :  data._id
    }
    var field = {
        title : data.title,
        content : data.content
    }
    notesModel.updateNote(id,field, (err,data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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
 * @description : service for delete a note with noteId
 */
deleteNote(data, callback)
{
    notesModel.deleteNote(data, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err)
            }
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
 * @description : service for trash a note with noteId
 */
trashNote(data, callback)
{
    let field1 = { _id: data._id }
    notesModel.getAllNotes(data, field1, (err, data1) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {   
            console.log("fzsfgxsg",data1)
            var field
            if(data1[0].isTrash === false)
            {
                field = { isTrash: true }
            }
            else if(data1[0].isTrash === true)
            {
                field = { isTrash: false }
            }      
            notesModel.updateNote(data, field, (err, data) => {
                if (err) {
                    return callback(err);
                }
                else 
                {
                    return callback(null, data);
                }
            })
        }
    })
}
    

/**
 * @description : service for archive a note with noteId
 */
archiveNote(data, callback)
{

    let field1 = { _id: data._id }
    notesModel.getAllNotes(data, field1, (err, data1) =>
    {
        if(err)
        {
            return callback(err);
        }
        else
        {   
            var field
            if(data1[0].isArchive === false)
            {
                field = { isArchive: true }
            }
            else if(data1[0].isArchive === true)
            {
                field = { isArchive: false }
            }      

            notesModel.updateNote(data, field, (err, data) =>
            {
                try
                {
                    if(err)
                    {
                        return callback(err);
                    }
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
    })
}

/**
 * @description : service to set reminder to a note
 */
reminderNote(data, callback)
{
    let field = { reminder : data.reminder }
    notesModel.updateNote(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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
 * @description : service for search a note with title
 */
searchNoteWithTitle(data, callback)
{
    let field = { title:{$regex  : data.title}}
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err)
            }
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
 * @description : service for get a note with description
 */
searchNoteWithDescription(data, callback)
{
    let field = { content:{$regex  : data.content}}
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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

getNotes(data, callback)
{
    let field = {}
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        if(err)
        {
            return callback(err)
        }
        else
        {
           client.set(data[0]._id.toString(), data[0].content, redis.print)
           client.keys("*", (err,reply) =>
           {
               if(err)
               {
                   console.log(err)
               }
               else
               {
                   console.log(reply)
                
               }
               return callback(null, reply)
           }) 
        }
    })
}

/**
 * @description : service for get all trash notes
 */
getAllTrashNotes(data,callback)
{
    let field = {isTrash : true }
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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
 * @description : service for get all archive notes
 */
getAllArchiveNotes(data,callback)
{
    let field = {isArchive : true }
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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

addLabel(data, callback)
{
    let field = { $push : {label : data.label}}
    notesModel.updateNote(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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

removeLabel(data, callback)
{
    let field = { $pull : {label : data.label}}
    notesModel.updateNote(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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

setColor(data, callback)
{
    let field = { $set : {color : data.color}}
    notesModel.updateNote(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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

getNoteLabels(data, callback)
{
    let field = { label : { $match : data.label[0] } }
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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

deleteReminder(data, callback)
{
    let field = { $unset : { reminder : data.reminder }}
    notesModel.updateNote(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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

getAllRemainderNotes(data,callback)
{
    let field = { reminder: { $exists: true } } 
    notesModel.getAllNotes(data, field, (err, data) =>
    {
        try
        {
            if(err)
            {
                return callback(err);
            }
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
}
const notesService = new userService()
module.exports = notesService