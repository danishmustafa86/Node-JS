const Comment = require('../models/commentSchema')

const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        const result = await newComment.save();
        const populatedComment = await Comment.findById(result._id)
            .populate('author', 'username profilePicture')
            .populate('post', 'content');

        res.status(201).json({
            status: "success",
            message: "Comment created successfully",
            data: populatedComment
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
}

const getComment = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id })
            .populate('author', 'username profilePicture')
            .sort({ createdAt: 1 });

        res.status(200).json({
            status: "success",
            message: "Comments retrieved successfully",
            data: comments
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
}


module.exports = {getComment, createComment}