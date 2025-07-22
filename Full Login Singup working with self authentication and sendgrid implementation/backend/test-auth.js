// Test file to demonstrate JWT authentication with hashed passwords
// This file shows how to test the authentication endpoints

const axios = require('axios');

const BASE_URL = 'http://localhost:8000'; // Updated to match server port

// Test data
const testUser = {
    email: 'test@example.com',
    password: 'TestPass123!',
    fullName: 'Test User',
    role: 'user'
};

async function testAuthentication() {
    try {
        console.log('🚀 Testing JWT Authentication with Hashed Passwords\n');
        console.log(`📍 Testing against: ${BASE_URL}\n`);

        // 0. Test server connection
        console.log('0. Testing server connection...');
        try {
            const healthCheck = await axios.get(`${BASE_URL}/`);
            console.log('✅ Server is running:', {
                status: healthCheck.status,
                message: healthCheck.data.message
            });
        } catch (error) {
            console.error('❌ Server connection failed:', error.message);
            console.log('💡 Make sure your server is running with: npm start');
            return;
        }

        // 1. Test Signup
        console.log('\n1. Testing Signup...');
        const signupResponse = await axios.post(`${BASE_URL}/auth/signup`, testUser);
        console.log('✅ Signup successful:', {
            status: signupResponse.status,
            user: signupResponse.data.data.user,
            hasToken: !!signupResponse.data.data.token,
            hasRefreshToken: !!signupResponse.data.data.refreshToken
        });

        // 2. Test Login
        console.log('\n2. Testing Login...');
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
            email: testUser.email,
            password: testUser.password
        });
        console.log('✅ Login successful:', {
            status: loginResponse.status,
            user: loginResponse.data.data.user,
            hasToken: !!loginResponse.data.data.token,
            hasRefreshToken: !!loginResponse.data.data.refreshToken
        });

        const token = loginResponse.data.data.token;
        const refreshToken = loginResponse.data.data.refreshToken;

        // 3. Test Protected Route
        console.log('\n3. Testing Protected Route...');
        const protectedResponse = await axios.get(`${BASE_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('✅ Protected route access successful:', {
            status: protectedResponse.status,
            message: protectedResponse.data.message
        });

        // 4. Test Refresh Token
        console.log('\n4. Testing Refresh Token...');
        const refreshResponse = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refreshToken: refreshToken
        });
        console.log('✅ Token refresh successful:', {
            status: refreshResponse.status,
            hasNewToken: !!refreshResponse.data.data.token,
            hasNewRefreshToken: !!refreshResponse.data.data.refreshToken
        });

        // 5. Test Invalid Login
        console.log('\n5. Testing Invalid Login...');
        try {
            await axios.post(`${BASE_URL}/auth/login`, {
                email: testUser.email,
                password: 'WrongPassword123!'
            });
        } catch (error) {
            console.log('✅ Invalid login properly rejected:', {
                status: error.response.status,
                message: error.response.data.message
            });
        }

        // 6. Test Access Without Token
        console.log('\n6. Testing Access Without Token...');
        try {
            await axios.get(`${BASE_URL}/users`);
        } catch (error) {
            console.log('✅ Unauthorized access properly rejected:', {
                status: error.response.status,
                message: error.response.data.message
            });
        }

        console.log('\n🎉 All tests completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:');
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            console.log('💡 Make sure your server is running and accessible');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
        }
    }
}

// Run the test
testAuthentication(); 