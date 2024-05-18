const app = require("express").Router();
const recordController = require("../../controllers/admin/record.controller")

app.get("/list", recordController.listRecords);
app.get("/get", recordController.getRecord);


module.exports = app
