# TECH STACK

- Backend

  ```javascript
  -Node.js - Express.js;
  ```

- CLI (COMMAND LINE INTERFACE FOR CLIENT)

  ```javascript
     - Commander.js ( NODE MODULE FOR PROVIDING A CLI INORDRE TO TEST OUR API)
  ```

- Database

  ```javascript
  -MongoDB;
  ```

# POSTMAN TEST (API)

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/24017825-5547fc3e-2391-48e5-89eb-d5a785ad0562?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D24017825-5547fc3e-2391-48e5-89eb-d5a785ad0562%26entityType%3Dcollection%26workspaceId%3Df1c544c0-b2d4-4c38-bad7-391807b8a8ed)

# Bonus Features that are added along with required features

- Mutiple filter in single endpoint

- Filter based on range of dates

- Filter based on message log regex

# FOLDER STRUCTURE (FOR API)

- App.js (Our main server file)

  ```javascript
  -app.js;
  ```

- Model (Contains schema for our log ingestor)

  ```javascript
  -Model - Log.model.js;
  ```

- Controller (Contains the handler function for our endpoints)

  ```javascript
    - Controller
      - filters.controller.js (to provide various filters)
      - logs.controller.js (to add logs in bulk)
  ```

- Routes (Contains the endpoints through which we could test those api controllers)

  ```javascript
  -Routes - Filter - filter.router.js - logs.router.js;
  ```

- Errors (Custom errors to handle edge cases in our api, each error is unique for the controller where it's used)

  ```javascript
    - Error
      - Database
        - database.error.js (contains the custom database connection error)
      - Filter
        - filter.error.js (contains the custom errors based on various filters)
      - customApi.error.js (main parent custom error class that would be used by other children error class)
  ```

# FOLDER STRUCTURE (FOR CLIENT CLI)

- Client Cli (contains the code for the entire clint side command line interface)

  ```javascript
    - Client Cli (folder name)
  ```

- Service (Contains the code i.e functions for performing the api call to our endpoints)

  ```javascript
    - Service
      - api.service.js (contains api call to filters endpoints)
  ```

- Utils (Contains our api base url)

  ```javascript
  -Utils - apiUtils.utils.js;
  ```

- cli.js (Heart of our command line interface , contains the code for running diffrent commands to our api for testing)

  ```javascript
  -cli.js;
  ```

# Endpoints

- Logs

  ```javascript
  LogRouter.post("/", addBulkLogToDatabase);
  ```

  This endpoint add the bulk amount of data to our log ingestor.

- Filter

  > > Get Single Filter

  ```javascript
  FilterRouter.get("/getSingleFilter", getLogsUsingSingleFilter);
  ```

  This endpoint filter the log data based on the filter name and filter Value.

  ```
  URL FORMAT -: http://localhost:3000/getSingleFilter?filterName=timestamp&filterValue=2023-09-15T18:30:00.000Z
  ```

  > > Get Multiple filter

  ```javascript
  FilterRouter.get("/getLogUsingMultipleFilters", getLogUsingMultipleFilters);
  ```

  This endpoint would retives the logs from logs data using multiple filters.

  ```
  URL FORMAT -: http://localhost:3000/getLogUsingMultipleFilters?filters=level,error,message,Network%20outage,timestamp,2023-09-15T19:45:00.000Z
  ```

  > > Get filter based on date Range

  ```javascript
  FilterRouter.get("/getLogsUsingDateRangeFilter", getLogsUsingDateRangeFilter);
  ```

  This endpoint would filter the log data based on the date range given by user in cli.

  ```
  URL FORMAT -: http://localhost:3000/getLogsUsingDateRangeFilter?startDate=2023-09-01&endDate=2023-09-23
  ```

  > > Get message log filter based on regex

  ```javascript
  FilterRouter.get("/getLogsUsingRegexFilter", getMeesageLogsUsingRegexFilter);
  ```

  This endpoint would filter the log data using message log based on the regex.

  ```
  URL FORMAT -: http://localhost:3000/getLogsUsingRegexFilter?regexFilter=Database corruption
  ```

# COMMAND LINE INTERACE COMMANDS TO TEST FILTERS

1. GO TO THE CLIENT CLI DIRECTORY

   > > cd Client\ Cli/

2. Run the following command for making our cli.js script executable.

   > > chmod +x cli.js

3. Run the follwoing commands to test our api endpoinst using CLI.

   > > SINGLE FILTER ENDPOINT TEST

   ```javascript
   ./cli.js getLogsUsingSingleFilter -n level -v error
   ```

   You can modify the values accordingly by changing the -n (filter type) and -v (filter value)

   > > MULTIPLE FILTER ENDPOINT TEST

   ```javascript
   ./cli.js getLogsUsingMultipleFilter -f "level,error,message,Network%20outage,timestamp,2023-09-15T19:45:00.000Z"
   ```

   You can modify the values accorindingly by seeing the above command where format is "filterName,filterValue"
   and so on.

   > > DATE RANGE FILTER ENDPOINT TEST

   ```javascript
   ./cli.js getLogsUsingDateRange -s 2023-01-01 -e 2023-12-31
   ```

   You can modify the date accordingly.

   > > MESSAGE LOG FILTER USING REGEX

   ```javascript
   ./cli.js getLogsMessageUsingRegex -f "Database corruption"
   ```

   You can modify the regex value accoridingly.

# STEPS TO RUN THE PROJECT (API AND CLI)

- Clone the repository on your local

- Go the cloned repository.

  > > mkdir repositoryName

- Run the following command to use the correct node version ( use any version above 14 )

  > > nvm use (version specified in the .nvmrc)

- Install the node modules on your local

  > > npm install

- Run the server (api) using the command

  > > nodemon app.js

- Test the api by using the command line interface by going to -:

  > > cd Client\ Cli/

- Run the command to make the cli.js script executable.

  > > chmod +x cli.js

- All command to test the api are specified above .
