const contLabels = require('../controllers/labels.controller.js');
const auth = require('../Authentication/index')
const express = require('express');
const labelsRouter = express.Router();

// Create a new Label
labelsRouter.post("/createLabel",auth.checkToken, contLabels.createLabel);

// Retrieve all Notes
labelsRouter.get("/getLabel",auth.checkToken, contLabels.getLabel);

// Retrieve a single label with noteId
labelsRouter.get("/getLabelById",auth.checkToken, contLabels.getLabelById);

// Update a label with labelId
labelsRouter.put("/updateLabel",auth.checkToken, contLabels.updateLabel);

// Delete a label with labelId
labelsRouter.delete("/deleteLabel",auth.checkToken, contLabels.deleteLabel);

//export router to use in our server.js
module.exports = labelsRouter;