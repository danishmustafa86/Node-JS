const Comment = require('../models/commentSchema')
const Post = require('../models/postSchema')
const User = require('../models/userSchema')
const emailService = require('../config/sendgrid')

const createComment = async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        const result = await newComment.save();
        const populatedComment = await Comment.findById(result._id)
            .populate('author', 'username profilePicture email')
            .populate('post', 'content author');

        // Send notification email to post author if it's not their own comment
        if (populatedComment.post && populatedComment.post.author && 
            populatedComment.author._id.toString() !== populatedComment.post.author.toString()) {
            try {
                // Get post author details
                const postAuthor = await User.findById(populatedComment.post.author).select('email username');
                if (postAuthor && postAuthor.email) {
                    const commentAuthorName = populatedComment.author.username || 'Someone';
                    const message = `${commentAuthorName} commented on your post: "${populatedComment.content.substring(0, 50)}${populatedComment.content.length > 50 ? '...' : ''}"`;
                    
                    await emailService.sendNotificationEmail(
                        postAuthor.email,
                        'New Comment on Your Post',
                        message,
                        `${process.env.FRONTEND_URL}/posts/${populatedComment.post._id}`
                    );
                }
            } catch (emailError) {
                console.error('Failed to send comment notification email:', emailError);
                // Don't fail the comment creation if email fails
            }
        }

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