const mongoose = require('mongoose')

// Connect to MongoDB
async function Connection() {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


module.exports = Connection