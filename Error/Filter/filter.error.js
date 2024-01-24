const CustomApiError = require("../customApi.error");

class FailedToFetchDataUsingSingleFilter extends CustomApiError {
  constructor(message, code) {
    super(message, code);
    this.message = "FailedToFetchDataUsingSingleFilter";
    this.statusCode = 400;
  }
}

class FailedToFetchDataUsingMultipleFilter extends CustomApiError {
  constructor(message, code) {
    super(message, code);
    this.message = "FailedToFetchDataUsingMultipleFilter";
    this.statusCode = 400;
  }
}

class FailedToFetchDataUsingDateRangeFilter extends CustomApiError {
  constructor(message, code) {
    super(message, code);
    this.message = "FailedToFetchDataUsingDateRangeFilter";
    this.statusCode = 400;
  }
}

class FailedToFetchDataUsingRegularExpression extends CustomApiError {
  constructor(message, code) {
    super(message, code);
    this.message = "FailedToFetchDataUsingRegularExpression";
    this.statusCode = 400;
  }
}

module.exports = {
  FailedToFetchDataUsingSingleFilter,
  FailedToFetchDataUsingMultipleFilter,
  FailedToFetchDataUsingDateRangeFilter,
  FailedToFetchDataUsingRegularExpression,
};
