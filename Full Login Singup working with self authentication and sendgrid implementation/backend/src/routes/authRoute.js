const express = require('express');
const authRouter = express.Router();
const { signUpControler, loginControler, refreshTokenControler } = require('../controllers/authControler');


authRouter.get('/', (req, res) => {
    try {
        res.status(200).json({
            status: "success",
            message: "get request at auth router is successful",
            data: []
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            data: []
        })
    }
})

authRouter.post('/signup', signUpControler);
authRouter.post('/login', loginControler);
authRouter.post('/refresh-token', refreshTokenControler);


module.exports = authRouter;