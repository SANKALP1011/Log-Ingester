const express = require("express");
const app = express();
const mongose = require("mongoose");
require("dotenv").config({ path: require("find-config")(".env") });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const InitialRoute = require("./Routes/initial.router");
const LogRoutes = require("./Routes/logs.router");
const FilterRoutes = require("./Routes/Filter/filter.router");

const { DatabaseConnectionError } = require("./Error/Database/database.error");

mongose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    throw new DatabaseConnectionError(err, 500);
  });

app.use(InitialRoute);
app.use(LogRoutes);
app.use(FilterRoutes);

app.listen("3000", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("dyte server up and running");
  }
});
