const contNotes = require("../controllers/notes.controller.js");
const express = require("express");
const notesRouter = express.Router();

// Create a new Note
notesRouter.post("/createNote", contNotes.createNote);

// Retrieve all Notes
notesRouter.get("/getAllNotes", contNotes.getAllNotes);

// Retrieve a single Note with noteId
notesRouter.get("/getNote", contNotes.getNote);

// Update a Note with noteId
notesRouter.put("/updateNote", contNotes.updateNote);

// Delete a Note with noteId
notesRouter.delete("/deleteNote", contNotes.deleteNote);

// Trash a note with noteId
notesRouter.post("/trashNote", contNotes.trashNote);

// Archive a note with noteId
notesRouter.post("/archiveNote", contNotes.archiveNote);

// Set reminder to a note
notesRouter.post("/reminderNote", contNotes.reminderNote);

// Search a Note with title
notesRouter.get("/searchNoteWithTitle", contNotes.searchNoteWithTitle)

// Search a Note with Description
notesRouter.get("/searchNoteWithDescription", contNotes.searchNoteWithDescription)

//export router to use in our server.js
module.exports = notesRouter;