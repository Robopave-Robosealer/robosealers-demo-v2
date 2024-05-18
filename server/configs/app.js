require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const handleCorsPolicy = require("../helpers/cors.helper");
const path = require('path');
const databaseConnection = require("./database");
const routes = require("../routes/index.route");

 
databaseConnection();

app.use(cors());
app.use(handleCorsPolicy);
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

module.exports = app;