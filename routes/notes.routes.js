const contNotes = require("../controllers/notes.controller");
const auth = require('../Authentication/index')
const express = require("express");
const notesRouter = express.Router();

// Create a new Note
notesRouter.post("/createNote",auth.checkToken, contNotes.createNote);

// Retrieve all Notes
notesRouter.get("/getAllNotes",auth.checkToken, contNotes.getAllNotes);

// Retrieve a single Note with noteId
notesRouter.get("/getNote/:noteId",auth.checkToken, contNotes.getNote);

// Update a Note with noteId
notesRouter.put("/updateNote/:noteId",auth.checkToken, contNotes.updateNote);

// Delete a Note with noteId
notesRouter.put("/deleteNote/:noteId",auth.checkToken, contNotes.deleteNote);

// Trash a note with noteId
notesRouter.post("/trashNote/:noteId",auth.checkToken, contNotes.trashNote);

// Archive a note with noteId
notesRouter.post("/archiveNote/:noteId",auth.checkToken, contNotes.archiveNote);

// Set reminder to a note
notesRouter.post("/reminderNote/:noteId",auth.checkToken, contNotes.reminderNote);

// Search a Note with title
notesRouter.get("/searchNoteWithTitle",auth.checkToken, contNotes.searchNoteWithTitle)

// Search a Note with Description
notesRouter.get("/searchNoteWithDescription",auth.checkToken, contNotes.searchNoteWithDescription)

// get all notes content from redis cache
notesRouter.get("/getNotes",auth.checkToken, contNotes.getNotes)

notesRouter.get("/getAllTrashNotes", auth.checkToken,contNotes.getAllTrashNotes)

notesRouter.get("/getAllArchiveNotes", auth.checkToken, contNotes.getAllArchiveNotes)

notesRouter.put("/addLabel", auth.checkToken, contNotes.addLabel)

notesRouter.put("/removeLabel", auth.checkToken, contNotes.removeLabel)

notesRouter.put("/setColor", auth.checkToken, contNotes.setColor)

notesRouter.get("/getNoteLabels", auth.checkToken, contNotes.getNoteLabels)

notesRouter.put("/deleteReminder", auth.checkToken, contNotes.deleteReminder);

notesRouter.get("/getAllRemainderNotes", auth.checkToken, contNotes.getAllRemainderNotes);
//export router to use in our server.js
module.exports = notesRouter;