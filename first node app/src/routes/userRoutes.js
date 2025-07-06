const express = require('express');
const userRouter = express.Router();
const {fetchUserControler,createUserControler, updateUserControler, deleteUserControler } = require('../controllers/userControler');



// Get request for all items
userRouter.get("/", fetchUserControler )
// Post request to add a new item
userRouter.post("/create", createUserControler)
// Put request to update an item
userRouter.put("/:id", updateUserControler)
// Delete request to remove an item
userRouter.delete("/:id", deleteUserControler)

module.exports = userRouter
