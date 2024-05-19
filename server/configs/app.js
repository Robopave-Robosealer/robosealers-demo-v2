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

// Serve static files from the React build directory
const buildPath = path.join(__dirname, "..", "..", "client", "build");
app.use(express.static(buildPath));

app.use(routes);

app.get("*", function(req, res){

    res.sendFile(
      path.join(buildPath, "index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})

app.use(handleCorsPolicy);
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;