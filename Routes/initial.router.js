const express = require("express");
const InitialRouter = express.Router();
const { getIntialRouteMessage } = require("../Contrtoller/initial.controller");

InitialRouter.get("/", getIntialRouteMessage);

module.exports = InitialRouter;
