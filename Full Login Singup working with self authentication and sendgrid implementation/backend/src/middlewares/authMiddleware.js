const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                status: "failed", 
                message: "No token provided or invalid format. Use 'Bearer <token>'" 
            });
        }
        
        const token = authHeader.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ 
                status: "failed", 
                message: "No token provided" 
            });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                status: "failed", 
                message: "Token has expired" 
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                status: "failed", 
                message: "Invalid token" 
            });
        }
        
        res.status(401).json({ 
            status: "failed", 
            message: "Unauthorized access", 
            error: error.message 
        });
    }
}

module.exports = verifyToken;
