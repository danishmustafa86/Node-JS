const express = require('express');
const authRouter = express.Router();

authRouter.get('/test', (req, res) => {
    res.json({ message: 'Auth router is working!' });
});

module.exports = authRouter;