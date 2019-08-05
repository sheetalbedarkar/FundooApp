const contLabels = require('../controllers/labels.controller');
const auth = require('../Authentication/index')
const express = require('express');
const labelsRouter = express.Router();

// Create a new Label
labelsRouter.post("/createLabel",auth.checkToken, contLabels.createLabel);

// Retrieve all Notes
labelsRouter.get("/getLabel",auth.checkToken, contLabels.getLabel);

// Retrieve a single label with noteId
labelsRouter.get("/getLabelById/:labelId",auth.checkToken, contLabels.getLabelById);

// Update a label with labelId
labelsRouter.put("/updateLabel/:labelId",auth.checkToken, contLabels.updateLabel);

// Delete a label with labelId
labelsRouter.put("/deleteLabel/:labelId",auth.checkToken, contLabels.deleteLabel);

// labelsRouter.get("/getNoteLabels", auth.checkToken, contLabels.getNoteLabels)

//export router to use in our server.js
module.exports = labelsRouter;