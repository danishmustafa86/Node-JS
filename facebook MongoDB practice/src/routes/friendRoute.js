const express = require('express')
const friendRouter = express.Router();
const {getFriend, addFriend} = require('../controlers/friendControler')


// Get User's Friends
friendRouter.get("/:id/friends", getFriend);



// Add Friend
friendRouter.post("/:id/friends",addFriend );

module.exports = friendRouter