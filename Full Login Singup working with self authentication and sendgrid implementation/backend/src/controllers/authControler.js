const AuthUser = require('../models/authModel');
const jwt = require('jsonwebtoken');

const signUpControler = async (req, res) => {
    try {
        const { email, password, fullName, role } = req.body;
        
        // Check if user already exists
        const existingUser = await AuthUser.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User with this email already exists',
                data: []
            });
        }

        // Create new user (password will be hashed by the pre-save middleware)
        const newUser = new AuthUser({
            email,
            password,
            fullName,
            role: role || 'user'
        });
        
        const user = await newUser.save();
        
        // Generate JWT token
        const tokenPayload = {
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        };
        
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role
                },
                token,
                refreshToken
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error in sign up',
            message: error.message,
            data: []
        });
    }
}

const loginControler = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email and include password field for comparison
        const user = await AuthUser.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
                data: []
            });
        }
        
        // Compare password using the method we defined in the model
        const isPasswordValid = await user.comparePassword(password);
        
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid email or password',
                data: []
            });
        }
        
        // Generate JWT tokens
        const tokenPayload = {
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        };
        
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role
                },
                token,
                refreshToken
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error in login',
            message: error.message,
            data: []
        });
    }
}

// Refresh token controller
const refreshTokenControler = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        
        if (!refreshToken) {
            return res.status(401).json({
                status: 'error',
                message: 'Refresh token is required',
                data: []
            });
        }
        
        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        
        // Find user
        const user = await AuthUser.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid refresh token',
                data: []
            });
        }
        
        // Generate new tokens
        const tokenPayload = {
            userId: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        };
        
        const newToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const newRefreshToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            status: 'success',
            message: 'Token refreshed successfully',
            data: {
                token: newToken,
                refreshToken: newRefreshToken
            }
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid refresh token',
            data: []
        });
    }
}

module.exports = { signUpControler, loginControler, refreshTokenControler };