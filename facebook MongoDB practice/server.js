const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000
const connection = require('./src/config/db')

const userRouter = require('./src/routes/userRoute')
const postRouter = require('./src/routes/postRoute')
const commentRouter = require('./src/routes/commentRoute')
const friendRouter = require('./src/routes/friendRoute')




// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connection();


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
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/comments", commentRouter)
app.use("/users", friendRouter)



app.listen(port, () => {
    console.log(`Facebook-like API is running on http://localhost:${port}`);
}); 