const express = require('express');
const userRouter = express.Router();
const  {getUser, createUser, getUserById} = require('../controlers/userControler')
const emailService = require('../config/sendgrid')


// USER ROUTES

// Create User
userRouter.post("/", createUser);

// Get All Users
userRouter.get("/", getUser);

// Get User by ID
userRouter.get("/:id", getUserById);

// Test Email Route (for development/testing only)
userRouter.post("/test-email", async (req, res) => {
    try {
        const { email, type } = req.body;
        
        if (!email) {
            return res.status(400).json({
                status: "error",
                message: "Email is required",
                data: []
            });
        }

        let result;
        switch (type) {
            case 'welcome':
                result = await emailService.sendWelcomeEmail(email, 'Test User');
                break;
            case 'notification':
                result = await emailService.sendNotificationEmail(
                    email, 
                    'Test Notification', 
                    'This is a test notification email from your Facebook Clone API!'
                );
                break;
            default:
                result = await emailService.sendWelcomeEmail(email, 'Test User');
        }

        res.status(200).json({
            status: "success",
            message: "Test email sent",
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

module.exports = userRouter