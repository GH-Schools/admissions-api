const express = require("express");
const cors = require('cors');
const app = express();

const indexRouter = require('./routes/index');
const appErrorHandler = require("./errorHelpers/appErrorHandler");
const noRouteHandler = require("./errorHelpers/noRouteHandler");

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/api/v1', indexRouter);

app.use('*', noRouteHandler)
app.use(appErrorHandler);

module.exports = app;
