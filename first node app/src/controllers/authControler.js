const AuthUser = require('../models/authModel');
const jwt = require('jsonwebtoken');

const signUpControler = async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new AuthUser(userData);
        const user = await newUser.save();
        const requiredFields = {
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        }
        const token = jwt.sign(requiredFields, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: {...requiredFields, token}
        })
    } catch (error) {
        res.status(500).json({
            status: 'error in sign up',
            message: error.message,
            data: []
        })
    }
}

const loginControler = async (req, res) => {
    try {
        const {email, password} = req.body;
        const users = await AuthUser.find({email, password});
        if(users.length === 0){
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
                data: []
            })
        }
        const user = users[0]; // Get the first user from the array
        const requiredFields = {
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        }
        const token = jwt.sign(requiredFields, process.env.JWT_SECRET, {expiresIn: '1h'});

        const refreshToken = jwt.sign(requiredFields, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                token: token, // Commented out since token is not defined
                user: requiredFields
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 'error in login',
            message: error.message,
            data: []
        })

    }
}



module.exports = { signUpControler, loginControler };