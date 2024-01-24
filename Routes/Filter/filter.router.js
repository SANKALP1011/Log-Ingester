const express = require("express");
const FilterRouter = express.Router();
const {
  getLogsUsingSingleFilter,
  getLogUsingMultipleFilters,
  getLogsUsingDateRangeFilter,
  getMeesageLogsUsingRegexFilter,
} = require("../../Contrtoller/filters.controller");

FilterRouter.get("/getSingleFilter", getLogsUsingSingleFilter);
FilterRouter.get("/getLogUsingMultipleFilters", getLogUsingMultipleFilters);
FilterRouter.get("/getLogsUsingDateRangeFilter", getLogsUsingDateRangeFilter);
FilterRouter.get("/getLogsUsingRegexFilter", getMeesageLogsUsingRegexFilter);

module.exports = FilterRouter;
