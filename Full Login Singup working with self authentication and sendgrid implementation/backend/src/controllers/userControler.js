const User = require('../models/userSchema');


const fetchUserControler =   async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).json({
            status: "success",
            message: "Get request successful!",
            data: user,
        })
    } catch (error) {
        res.json({
            status: 'error in get user request',
            message: error.message,
            data: []
        })
    }
}


const createUserControler =  async (req, res) => {
    try {
        const new_user = new User(req.body)
        const result = await new_user.save()
        res.status(201).json({
            status:'success',
            message:'user created successfully',
            data: result
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        })
    }
}


const updateUserControler = async (req, res) => {
    const userId =  req.params.id;
    try {
        if (!userId){
            res.status(400).json({
                error:"user id is required in path parameters"
            })
        }
        const updateUser = await User.findByIdAndUpdate(userId, req.body, {new:true, runValidators: true})
        if (!updateUser){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({
            status:"success",
            message:"user updated successfully",
            data: updateUser
        })
    } catch (error) {
        res.status(500).json({
            status: "error here",
            message: error.message,
            data: []
        })
    }
}



const deleteUserControler = async (req, res) => {
    const userId = req.params.id;
    try {
        if (!userId){
            return res.status(400).json({error:"user id is required in path parameters"})}
        const deleteUser = await User.findByIdAndDelete(userId);
        if (!deleteUser){
            return res.status(404).json({error:"User not found"})
        }
        res.status(200).json({
            status:"success",
            message:"user deleted successfully",
            data: deleteUser
        })

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        })
    }
}


module.exports = {fetchUserControler, createUserControler, updateUserControler, deleteUserControler}