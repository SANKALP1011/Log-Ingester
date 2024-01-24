const express = require("express");
const Log = require("../Model/log.model");
const { Transform } = require('stream');

module.exports = {
  addBulkLogToDatabase: async (req, res) => {

    // Checking the format of our data
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Invalid request body format. Expecting an array.' });
    }
  

    const insertPromises = [];

    // Use a parallel processing limit to control the concurrency and save data effectively
    const parallelLimit = 10;

    req.body.forEach(logData => {
      // Process each log entry concurrently
      const insertPromise = Log.create(logData);
      insertPromises.push(insertPromise);

      if (insertPromises.length >= parallelLimit) {
        // Wait for the current batch of insert operations to complete before processing more
        Promise.all(insertPromises).then(() => {
          insertPromises.length = 0; // Clear the array and so that data load is done correctly
        });
      }
    });

    // Wait for any remaining insert operations to complete , this would help in saving the bulk data
    await Promise.all(insertPromises);

    // All logs have been inserted
    res.status(200).json({ message: 'Bulk insert completed succesfully' });
  }
};
