const mongoose = require("mongoose");
var mongoSchema = mongoose.Schema;
var noteSchema = new mongoSchema(
    {
        "userId":
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "userSchema"
        },
        "title":
        {
            type: String, 
            min : [4, "Too small title"],
            max : [20, "Too big title"],
            require : [true, "title is required"]
        },
        "content":
        {
            type: String
        },
        "isTrash":
        {
            type: Boolean,
            default : false
        },
        "isArchive":
        {
            type: Boolean,
            default : false
        },
        "reminder":
        {
            type: Date
        },
        "color":
        {
            type : String
        },
        "label": [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : "labelSchema"
        }]
    },
    {
        timestamps: true
    });

var notes = mongoose.model('notes', noteSchema);

class mongoServices
{
    constructor(){}

/** 
 * @description Create and Save a new Note
 */
createNote(body, callback) {
    /**
     * @description : Create a Note
     */
    const newNote = new notes({
        "userId": body.userId,
        "title": body.title,
        "content": body.content
       });
    try
    {
        /** 
         * @description : Save Note in the database
         */
        newNote.save((err, result) => {
       
            if (err) 
                throw err
            else 
            {
                return callback(null, result)
            }
        })
    }
    catch(err)
    {
        return callback(err);
    }
}

/**
 * @description : Retrieve and return all notes from the database.
 */
getAllNotes(data, field, callback) {   
    notes.find(field, (err, result) => {
        try
        {
            if (err) {
                return callback(err);
            }
            else 
            {
                console.log("result model",result)
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
 * @description : update a single note with a noteId
 */
updateNote(data, field, callback)
{
    notes.findByIdAndUpdate({ _id: data._id }, field, (err, result) => 
    {
        try
        {
            if (err) 
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
 * @description : delete a single note with a noteId
 */
deleteNote(data, callback)
{
    notes.findByIdAndRemove({ _id: data._id }, (err, result) => 
    {
        try
        {
            if (err) 
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

}

/** EXPORTS */
const notesModel = new mongoServices()
module.exports = notesModel