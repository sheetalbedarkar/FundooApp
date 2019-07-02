const contNotes = require("../controllers/notes.controller.js");
const auth = require('../Authentication/index')
const express = require("express");
const notesRouter = express.Router();

// Create a new Note
notesRouter.post("/createNote",auth.checkToken, contNotes.createNote);

// Retrieve all Notes
notesRouter.get("/getAllNotes",auth.checkToken, contNotes.getAllNotes);

// Retrieve a single Note with noteId
notesRouter.get("/getNote",auth.checkToken, contNotes.getNote);

// Update a Note with noteId
notesRouter.put("/updateNote",auth.checkToken, contNotes.updateNote);

// Delete a Note with noteId
notesRouter.delete("/deleteNote",auth.checkToken, contNotes.deleteNote);

// Trash a note with noteId
notesRouter.post("/trashNote",auth.checkToken, contNotes.trashNote);

// Archive a note with noteId
notesRouter.post("/archiveNote",auth.checkToken, contNotes.archiveNote);

// Set reminder to a note
notesRouter.post("/reminderNote",auth.checkToken, contNotes.reminderNote);

// Search a Note with title
notesRouter.get("/searchNoteWithTitle",auth.checkToken, contNotes.searchNoteWithTitle)

// Search a Note with Description
notesRouter.get("/searchNoteWithDescription",auth.checkToken, contNotes.searchNoteWithDescription)

// get all notes content from redis cache
notesRouter.get("/getNotesWithRedis",auth.checkToken, contNotes.getNotesWithRedis)

//export router to use in our server.js
module.exports = notesRouter;