const Post = require('../models/postSchema')

const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        const result = await newPost.save();
        const populatedPost = await Post.findById(result._id).populate('author', 'username profilePicture');
        
        res.status(201).json({
            status: "success",
            message: "Post created successfully",
            data: populatedPost
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
}

const getPost = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username profilePicture')
            .populate('likes', 'username')
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            status: "success",
            message: "Posts retrieved successfully",
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
}

const LikeUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                status: "error",
                message: "Post not found",
                data: []
            });
        }

        const userId = req.body.userId;
        const likeIndex = post.likes.indexOf(userId);

        if (likeIndex === -1) {
            // Like the post
            post.likes.push(userId);
        } else {
            // Unlike the post
            post.likes.splice(likeIndex, 1);
        }

        await post.save();
        const updatedPost = await Post.findById(req.params.id)
            .populate('author', 'username profilePicture')
            .populate('likes', 'username');

        res.status(200).json({
            status: "success",
            message: likeIndex === -1 ? "Post liked" : "Post unliked",
            data: updatedPost
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
}


module.exports = {createPost, LikeUnlikePost, getPost}