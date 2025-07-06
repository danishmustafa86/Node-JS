const User = require('../models/userSchema')

const getFriend = async (req, res) => {
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
}


const addFriend = async (req, res) => {
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
}


module.exports = {getFriend, addFriend}