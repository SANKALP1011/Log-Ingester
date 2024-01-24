const API_URL = require("../Utils/apiUtils.utils");
const axios = require("axios");

module.exports = {
  getLogUsingSingleFilter: async (filterName, filterValue) => {
    try {
      const response = await axios.get(`${API_URL}getSingleFilter`, {
        params: {
          filterName: filterName,
          filterValue: filterValue,
        },
      });

      return response.data;
    } catch (error) {
      return error;
    }
  },
  getLogUsingMultipleFilter: async (filters) => {
    try {
      const response = await axios.get(
        `${API_URL}getLogUsingMultipleFilters?filters=${filters}`
      );
      return response.data;
    } catch (errror) {
      return errror;
    }
  },
  getLogUsingDateRange: async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `${API_URL}getLogsUsingDateRangeFilter?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  },
  getLogMessageUsingRegex: async (regexFilter) => {
    try {
      const response = await axios.get(
        `${API_URL}getLogsUsingRegexFilter?regexFilter=${regexFilter}`
      );
      return response.data;
    } catch (err) {
      return err;
    }
  },
};
