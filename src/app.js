const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const app = express();

const indexRouter = require('./routes/index');
const wiston = require("./errorHelpers/wistonLogger");
const noRouteHandler = require("./errorHelpers/noRouteHandler");
const appErrorHandler = require("./errorHelpers/appErrorHandler");

app.use(morgan('combined', { stream: wiston.stream }));
app.use(express.static('tmp'));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api/v1', indexRouter);

app.use('*', noRouteHandler)
app.use(appErrorHandler);

module.exports = app;
