const mongoose = require('mongoose')

// Connect to MongoDB
async function Connection() {
    try {
        // Use local MongoDB if DB_URI is not set or contains placeholder
        const dbUri = process.env.DB_URI;
        
        if (!dbUri || dbUri.includes('your_username') || dbUri.includes('your_cluster')) {
            console.log('⚠️  Using local MongoDB (mongodb://localhost:27017/facebook-clone)');
            console.log('📝 To use MongoDB Atlas, update your .env file with your Atlas connection string');
            await mongoose.connect('mongodb://localhost:27017/facebook-clone');
        } else {
            console.log('🌐 Connecting to MongoDB Atlas...');
            await mongoose.connect(dbUri);
        }
        
        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error.message);
        console.log('');
        console.log('🔧 Troubleshooting:');
        console.log('1. For local MongoDB: Make sure MongoDB is installed and running');
        console.log('2. For MongoDB Atlas: Check your connection string in .env file');
        console.log('3. Make sure your IP address is whitelisted in Atlas');
        console.log('');
        console.log('📝 To install local MongoDB:');
        console.log('   - Download from: https://www.mongodb.com/try/download/community');
        console.log('   - Or use Docker: docker run -d -p 27017:27017 --name mongodb mongo:latest');
    }
}

module.exports = Connection