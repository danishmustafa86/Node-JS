const express = require('express');
const userRouter = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const {fetchUserControler,createUserControler, updateUserControler, deleteUserControler } = require('../controllers/userControler');



// Get request for all items
userRouter.get("/", verifyToken, fetchUserControler )
// Post request to add a new item
userRouter.post("/create", verifyToken, createUserControler)
// Put request to update an item
userRouter.put("/:id", verifyToken, updateUserControler)
// Delete request to remove an item
userRouter.delete("/:id", verifyToken, deleteUserControler)

module.exports = userRouter
