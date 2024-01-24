const express = require("express");
const Log = require("../Model/log.model");
const {
  FailedToFetchDataUsingSingleFilter,
  FailedToFetchDataUsingMultipleFilter,
  FailedToFetchDataUsingDateRangeFilter,
  FailedToFetchDataUsingRegularExpression,
} = require("../Error/Filter/filter.error");

module.exports = {
  getLogsUsingSingleFilter: async (req, res) => {
    const filterName = req.query.filterName;
    const filterValue = req.query.filterValue;

    try {
      const filterQuery = {};

      // Check if the filter is for the timestamp field and parse the date
      if (filterName === "timestamp") {
        const dateValue = new Date(filterValue);
        filterQuery[filterName] = dateValue;
      } else {
        filterQuery[filterName] = filterValue;
      }

      const filteredData = await Log.find(filterQuery);

      if (!filteredData) {
        throw new FailedToFetchDataUsingSingleFilter(
          `Failed to fetch the filter based on the provided filter ${filterName} and value ${filterValue}`
        );
      }

      if (filteredData.length === 0) {
        return res.status(200).json({
          Message: `No data with the filter value ${filterValue} exists in our logs`,
        });
      }

      res.status(200).json({ data: filteredData });
    } catch (err) {
      if (err instanceof FailedToFetchDataUsingSingleFilter) {
        return res.status(err.statusCode).json(err.message);
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getLogUsingMultipleFilters: async (req, res) => {
    const filters = req.query.filters;

    try {
      if (!filters) {
        throw new FailedToFetchDataUsingMultipleFilter(
          "Filters parameter is missing."
        );
      }

      // Split the comma-separated values into an array
      const filtersArray = filters.split(",");

      if (filtersArray.length % 2 !== 0) {
        throw new FailedToFetchDataUsingMultipleFilter(
          "Invalid filters format. Expecting an array with an even number of elements."
        );
      }

      const filterQuery = {};

      // Iterate through the array of filters and values
      for (let i = 0; i < filtersArray.length; i += 2) {
        const filterName = filtersArray[i];
        const filterValue = filtersArray[i + 1];

        // Check if the filter is for the timestamp field and parse the date
        if (filterName === "timestamp") {
          const dateValue = new Date(filterValue);
          filterQuery[filterName] = dateValue;
        } else {
          filterQuery[filterName] = filterValue;
        }
      }

      const filteredData = await Log.find(filterQuery);

      if (!filteredData) {
        throw new FailedToFetchDataUsingMultipleFilter(
          "Failed to fetch data based on the provided filters."
        );
      }

      if (filteredData.length === 0) {
        return res.status(200).json({
          Message: "No data matching the provided filters exists in our logs",
        });
      }

      res.status(200).json({ data: filteredData });
    } catch (err) {
      if (err instanceof FailedToFetchDataUsingMultipleFilter) {
        return res.status(err.statusCode).json(err.message);
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getLogsUsingDateRangeFilter: async (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    try {
      if (!startDate || !endDate) {
        throw new FailedToFetchDataUsingDateRangeFilter(
          "Both startDate and endDate are required for date range filtering."
        );
      }

      const filterQuery = {
        timestamp: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };

      const filteredData = await Log.find(filterQuery);

      if (!filteredData) {
        throw new FailedToFetchDataUsingDateRangeFilter(
          "Failed to fetch data based on the provided date range."
        );
      }

      if (filteredData.length === 0) {
        return res.status(200).json({
          Message: "No data within the provided date range exists in our logs",
        });
      }

      res.status(200).json({ data: filteredData });
    } catch (err) {
      if (err instanceof FailedToFetchDataUsingDateRangeFilter) {
        return res.status(err.statusCode).json(err.message);
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getMeesageLogsUsingRegexFilter: async (req, res) => {
    const regexFilter = req.query.regexFilter;

    try {
      if (!regexFilter) {
        throw new FailedToFetchDataUsingRegularExpression(
          "regexFilter parameter is required for regex filtering."
        );
      }
      // Regex filter applied on our message field in our json data
      const filterQuery = {
        message: { $regex: new RegExp(regexFilter, "i") },
      };

      const filteredData = await Log.find(filterQuery);

      if (!filteredData) {
        throw new FailedToFetchDataUsingRegularExpression(
          `Failed to fetch data based on the provided regex filter ${regexFilter}.`
        );
      }

      if (filteredData.length === 0) {
        return res.status(200).json({
          Message: `No data matching the provided regex filter ${regexFilter} exists in our logs`,
        });
      }

      res.status(200).json({ data: filteredData });
    } catch (err) {
      if (err instanceof FailedToFetchDataUsingRegularExpression) {
        return res.status(err.statusCode).json(err.message);
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
