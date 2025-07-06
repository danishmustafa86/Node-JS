const express = require('express');
const userRouter = express.Router();
const  {getUser, createUser, getUserById} = require('../controlers/userControler')



// USER ROUTES

// Create User
userRouter.post("/", createUser);

// Get All Users
userRouter.get("/", getUser);

// Get User by ID
userRouter.get("/:id", getUserById);


module.exports = userRouter