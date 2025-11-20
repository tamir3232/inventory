
const express = require("express");
const { error,notFound } = require('./src/middleware/ErrorHandlingMiddleware');
const routes = require("./src/routes/index");

const app = express();
app.use(express.json());
// Routes
app.use("/api/v1", routes);
app.use(notFound)
app.use(error)
// Export app
module.exports = app;
