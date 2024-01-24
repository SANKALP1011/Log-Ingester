const express = require("express");
const LogRouter = express.Router();
const { addBulkLogToDatabase } = require("../Contrtoller/logs.controller");

LogRouter.post("/", addBulkLogToDatabase);

module.exports = LogRouter;
