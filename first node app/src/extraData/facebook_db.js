const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect('mongodb+srv://nodejs:nodejspractice@cluster0.yca2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
main();

// User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: "default-avatar.png"
    },
    bio: {
        type: String,
        maxlength: 200
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Post Schema
const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 1000
    },
    image: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Comment Schema
const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Models
const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// USER ROUTES

// Create User
app.post("/users", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const result = await newUser.save();
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
});

// Get All Users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
});

// Get User by ID
app.get("/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                data: []
            });
        }
        res.status(200).json({
            status: "success",
            message: "User retrieved successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
});

// POST ROUTES

// Create Post
app.post("/posts", async (req, res) => {
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
});

// Get All Posts
app.get("/posts", async (req, res) => {
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
});

// Like/Unlike Post
app.post("/posts/:id/like", async (req, res) => {
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
});

// COMMENT ROUTES

// Create Comment
app.post("/comments", async (req, res) => {
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
});

// Get Comments for a Post
app.get("/posts/:id/comments", async (req, res) => {
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
});

// FRIEND ROUTES

// Add Friend
app.post("/users/:id/friends", async (req, res) => {
    try {
        const userId = req.params.id;
        const friendId = req.body.friendId;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) {
            return res.status(404).json({
                status: "error",
                message: "User or friend not found",
                data: []
            });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).json({
                status: "error",
                message: "Already friends",
                data: []
            });
        }

        user.friends.push(friendId);
        friend.friends.push(userId);

        await user.save();
        await friend.save();

        res.status(200).json({
            status: "success",
            message: "Friend added successfully",
            data: { user: user.username, friend: friend.username }
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
});

// Get User's Friends
app.get("/users/:id/friends", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('friends', 'username profilePicture bio');
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
                data: []
            });
        }

        res.status(200).json({
            status: "success",
            message: "Friends retrieved successfully",
            data: user.friends
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        });
    }
});

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Facebook-like API is running!",
        endpoints: {
            users: "/users",
            posts: "/posts",
            comments: "/comments",
            friends: "/users/:id/friends"
        }
    });
});

app.listen(port, () => {
    console.log(`Facebook-like API is running on http://localhost:${port}`);
}); 