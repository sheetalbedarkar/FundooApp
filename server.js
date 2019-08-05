const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/dbServices')
const cors = require('cors')
const route = require('./routes/app.routes');
const notesRouter = require('./routes/notes.routes')
const labelRouter = require('./routes/labels.routes')
const expressValidator = require('express-validator');

//directive to load http module and store returned HTTP instance into http variable
const http = require('http');
require('dotenv').config();
const redisService = require("./services/redisService.js")

// Export app for other routes to use
const app = express();

//execute for any type of http request and it wrap the express with validator
app.use(expressValidator());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : false}))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use(cors())

app.use(express.static('../client'));

app.use('/user', route)

app.use('/note', notesRouter);

app.use('/label', labelRouter);

var server = app.listen(4000, () =>
{
    console.log("server is listening to port 4000")
});

// Connecting to the database
db.mongoD();

redisService.redis();

// define a simple route
// app.get('/', (req, res) =>
// {
//     res.json({"message" : "WELCOME to fundoo notes"})
// });
module.exports = app;