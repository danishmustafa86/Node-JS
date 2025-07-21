const fs = require('fs');
const path = require('path');

// Default environment variables
const envContent = `PORT=5000
DB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/facebook-clone?retryWrites=true&w=majority
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=your_verified_email@yourdomain.com
FROM_NAME=Facebook Clone
FRONTEND_URL=http://localhost:3000
`;

const envPath = path.join(__dirname, '.env');

try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('');
    console.log('📝 Please update the .env file with your actual values:');
    console.log('1. Replace DB_URI with your MongoDB Atlas connection string');
    console.log('2. Add your SendGrid API key (optional for now)');
    console.log('3. Update FROM_EMAIL with your verified email');
    console.log('');
    console.log('🔗 To get your MongoDB Atlas connection string:');
    console.log('1. Go to https://cloud.mongodb.com');
    console.log('2. Click on your cluster');
    console.log('3. Click "Connect"');
    console.log('4. Choose "Connect your application"');
    console.log('5. Copy the connection string');
    console.log('6. Replace username, password, and cluster details');
    console.log('7. Add /facebook-clone before the ? to specify database name');
} catch (error) {
    console.error('❌ Error creating .env file:', error.message);
} 