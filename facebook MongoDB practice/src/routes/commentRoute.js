const express = require('express')
const commentRouter = express.Router();
const {getComment, createComment} = require('../controlers/commentControler')


// COMMENT ROUTES

// Create Comment
commentRouter.post("", createComment);

// Get Comments for a Post
commentRouter.get("/posts/:id/comments",  getComment);

// FRIEND ROUTES



module.exports = commentRouter