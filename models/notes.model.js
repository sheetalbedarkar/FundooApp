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
            type: String
        },
        "content":
        {
            type: String
        },
        "trash":
        {
            type: Boolean
        },
        "archive":
        {
            type: Boolean
        },
        "reminder":
        {
            type: Date
        }
    },
    {
        timestamps: true
    });

function notesModel() {

}

var notes = mongoose.model('notes', noteSchema);

// Create and Save a new Note
notesModel.prototype.createNote = (body, callback) => {
    // Create a Note
    const newNote = new notes({
        "userId": body.userId,
        "title": body.title,
        "content": body.content,
        "trash": false,
        "archive": false,
    });

    // Save Note in the database
    newNote.save((err, result) => {
        if (err) 
        {
            console.log("Error while creating a note....", err);
            return callback(err);
        }
        else 
        {
            console.log("New Note created successfully...", result);
            return callback(null, result)
        }
    })
}

// Retrieve and return all notes from the database.
notesModel.prototype.getAllNotes = (req, callback) => {
    notes.find({}, (err, result) => {
        if (err) 
        {
            console.log("Error while displaying the notes....", err);
            return callback(err);
        }
        else 
        {
            console.log("All the notes are listed...", result);
            return callback(null, result);
        }
    })
}

// Find a single note with a noteId
notesModel.prototype.getNote = (req, callback) => {
    notes.findById({ _id: req._id }, (err, result) => {
        if (err) 
        {
            console.log("Error while displaying a note....", err);
            return callback(err);
        }
        else 
        {
            console.log("Note for the specified is :: ", result);
            return callback(null, result);
        }
    })
}

// update a single note with a noteId
notesModel.prototype.updateNote = (req, callback) => {
    notes.findByIdAndUpdate({ _id: req._id }, {
        "title": req.title,
        "content": req.content
    }, (err, result) => 
    {
            if (err) 
            {
                console.log("Error while updating a note....", err);
                return callback(err);
            }
            else 
            {
                console.log("Note has been updated...");
                return callback(null, result);
            }
        })
}

// delete a single note with a noteId
notesModel.prototype.deleteNote = (req, callback) => 
{
    notes.findByIdAndRemove({ _id: req._id }, (err, result) => 
    {
        if (err) 
        {
            console.log("Error while deleting a note....", err);
            return callback(err);
        }
        else 
        {
            console.log("Note has been deleted....");
            return callback(null, result);
        }
    })
}

// trash a single note with a noteId
notesModel.prototype.trashNote = (req, callback) => 
{
    notes.findByIdAndUpdate({ _id: req._id }, { $set: { trash: true } }, (err, result) => {
        if (err) 
        {
            console.log("Error while moving a note to trash....", err);
            return callback(err);
        }
        else 
        {
            console.log("Note is removed to trash...");
            return callback(null, result);
        }
    })
}

// archive a single note with a noteId
notesModel.prototype.archiveNote = (req, callback) => 
{
    notes.findByIdAndUpdate({ _id: req._id }, { $set: { archive: true } }, (err, result) => {
        if (err) 
        {
            console.log("Error while moving a note to archive....", err);
            return callback(err);
        }
        else 
        {
            console.log("Note is removed to archive...");
            return callback(null, result);
        }
    })
}

// Set the reminder to the node with a noteId
notesModel.prototype.reminderNote = (req, callback) => 
{
    notes.findByIdAndUpdate({ _id: req._id }, { $set: { "reminder": req.reminder } }, (err, result) => {
        if (err) 
        {
            console.log("Error while setting reminder to a note....", err);
            return callback(err);
        }
        else 
        {
            console.log("Reminder is set to a note...");
            return callback(null, result);
        }
    })
}

// Search a note by title
notesModel.prototype.searchNoteWithTitle = (req, callback) => {
    notes.find({ title:{$regex  : req.title}}, (err, result) => {
        if (err) 
        {
            return callback(err);
        }
        else 
        {
            console.log("Searched Data")
            return callback(null, result)
        }
    })
}

// Search a note by description
notesModel.prototype.searchNoteWithDescription = (req, callback) => {
    notes.find({ content:{$regex  : req.content}}, (err, result) => {
        if (err) 
        {
            return callback(err);
        }
        else 
        {
            console.log("Searched Data")
            return callback(null, result)
        }
    })
}

module.exports = new notesModel();