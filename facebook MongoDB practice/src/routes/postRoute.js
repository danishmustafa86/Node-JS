const express = require('express');
const postRouter = express.Router();
const {createPost, LikeUnlikePost, getPost} = require('../controlers/postControler')



// POST ROUTES

// Create Post
postRouter.post("/", createPost );

// Get All Posts
postRouter.get("/", getPost);

// Like/Unlike Post
postRouter.post("/:id/like", LikeUnlikePost );

module.exports = postRouter