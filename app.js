const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setting CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  next();
});

const apiRoutes = require("./api/routes/api");
app.use("/api", apiRoutes);

// handling 404 error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// display 404 & 500 error
app.use((error, req, res, next) => {
  const resStatus = error.status || 500;
  res.status(resStatus).json({
    status: resStatus,
    error: {
      message: error.message
    }
  });
  next();
});

module.exports = app;
