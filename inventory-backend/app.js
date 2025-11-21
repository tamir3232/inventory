
const express = require("express");
const { error,notFound } = require('./src/middleware/ErrorHandlingMiddleware');
const routes = require("./src/routes/index");

const app = express();
app.use(express.json());
// Routes

const cors = require("cors");

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use("/api/v1", routes);
app.use(notFound)
app.use(error)
// Export app
module.exports = app;
