const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000 
const connection = require('./src/config/db')

const userRouter = require('./src/routes/userRoutes')
const searchRouter =  require('./src/routes/searchRoutes')
const authRouter = require('./src/routes/authRoute')

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

// Simple get request for home page
app.get('/', (req, res) => {
    try {
        res.status(200).json({
            status:"success",
            message:"Get request is successfull now",
            data: []
        })
    } catch (error){
        res.status(500).json({
            status:"error",
            message:error.message,
            data: []
        })
    }
})
app.use('/users', userRouter)
app.use('/search', searchRouter)
app.use('/auth',authRouter)


app.listen(port, () => {console.log(`server is runing at localhost:${port}`)})

