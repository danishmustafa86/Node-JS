const express = require('express');
const searchRouter = express.Router();
const {createSchemaControler} = require('../controllers/schemaControler');

searchRouter.get("/searchUsers", createSchemaControler )


module.exports = searchRouter