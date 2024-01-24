#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();
const {
  getLogUsingSingleFilter,
  getLogUsingMultipleFilter,
  getLogUsingDateRange,
  getLogMessageUsingRegex,
} = require("./Service/api.service");

program.version("1.0.0").description("CLI to test API endpoints");

// COMMAND SCRIPT TO GET LOGS USING SINGLE FILTER
program
  .command("getLogsUsingSingleFilter")
  .description("Test getLogsUsingSingleFilter endpoint")
  .option("-n, --filterName <filterName>", "Specify filter name")
  .option("-v, --filterValue <filterValue>", "Specify filter value")
  .action(async (options) => {
    if (!options.filterName || !options.filterValue) {
      console.error(
        "Both --filterName and --filterValue options are required."
      );
      return;
    }

    try {
      const result = await getLogUsingSingleFilter(
        options.filterName,
        options.filterValue
      );
      console.log(result);
    } catch (error) {
      console.error(error.message || "Error occurred.");
    }
  });

// COMMAND SCRIPT TO GET LOGS USING MULTIPLE FILTER
program
  .command("getLogsUsingMultipleFilter")
  .description("Test getLogsUsingMultipleFilter endpoint")
  .option("-f, --filters <filters>", "Specify filters as a single string")
  .action(async (options) => {
    if (!options.filters) {
      console.error("--filters are required");
      return;
    }
    try {
      const result = await getLogUsingMultipleFilter(options.filters);
      console.log(result);
    } catch (error) {
      console.error(error.message || "Error occurred.");
    }
  });

// COMMAND SCRIPT TO GET LOGS USING DATE RANGE FILTER
program
  .command("getLogsUsingDateRange")
  .description("Test getLogsUsingDateRange endpoint")
  .option(
    "-s, --startDate <startDate>",
    "Specify start date in YYYY-MM-DD format"
  )
  .option("-e, --endDate <endDate>", "Specify end date in YYYY-MM-DD format")
  .action(async (options) => {
    if (!options.startDate || !options.endDate) {
      console.error("Both --startDate and --endDate are required");
      return;
    }
    try {
      const result = await getLogUsingDateRange(
        options.startDate,
        options.endDate
      );
      console.log(result);
    } catch (error) {
      console.error(error.message || "Error occurred.");
    }
  });

// COMMAND SCRIPT TO GET MESSAGE LOGS USING REGEX FOR MESSAGE
program
  .command("getLogsMessageUsingRegex")
  .description("Test the getLogsMessageUisngRegexFilteer endpoint")
  .option("-f, --regexFilter", "Specify the regex filter for your message logs")
  .action(async (options) => {
    if (!options.regexFilter) {
      console.error("--regexFilter is required");
      return;
    }
    try {
      const result = await getLogMessageUsingRegex(options.regexFilter);
      console.log(result);
    } catch (error) {
      console.error(error.message || "Error occurred.");
    }
  });

program.parse(process.argv);
