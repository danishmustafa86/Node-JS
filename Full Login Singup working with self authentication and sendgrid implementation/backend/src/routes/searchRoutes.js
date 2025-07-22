const express = require('express');
const searchRouter = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const {createSchemaControler} = require('../controllers/schemaControler');

searchRouter.get("/searchUsers", verifyToken, createSchemaControler )


module.exports = searchRouter