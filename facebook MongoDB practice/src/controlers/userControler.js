const User = require('../models/userSchema')


const createUser = async (req, res) => {
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
}


const getUser =  async (req, res) => {
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
}

const getUserById =  async (req, res) => {
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
}


module.exports = {getUser, createUser, getUserById}