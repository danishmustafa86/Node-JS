# JWT Authentication with Hashed Passwords

This Node.js application implements a secure authentication system using JWT (JSON Web Tokens) and bcrypt for password hashing.

## Features

- ✅ **Secure Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 12
- ✅ **JWT Authentication**: Access tokens (1 hour) and refresh tokens (7 days)
- ✅ **User Registration**: Signup with email validation and duplicate checking
- ✅ **User Login**: Secure login with password comparison
- ✅ **Token Refresh**: Automatic token renewal using refresh tokens
- ✅ **Protected Routes**: Middleware for securing API endpoints
- ✅ **MongoDB Integration**: User data stored in MongoDB with Mongoose

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```env
JWT_SECRET=your_super_secret_jwt_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

3. Start the server:
```bash
npm start
# or for development
npm run dev
```

## API Endpoints

### Authentication Routes

#### 1. User Registration
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "fullName": "John Doe",
  "role": "user"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "user"
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

#### 2. User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "fullName": "John Doe",
      "role": "user"
    },
    "token": "jwt_access_token",
    "refreshToken": "jwt_refresh_token"
  }
}
```

#### 3. Refresh Token
```http
POST /auth/refresh-token
Content-Type: application/json

{
  "refreshToken": "jwt_refresh_token"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Token refreshed successfully",
  "data": {
    "token": "new_jwt_access_token",
    "refreshToken": "new_jwt_refresh_token"
  }
}
```

### Protected Routes

All protected routes require the `Authorization` header with the Bearer token:

```http
GET /users
Authorization: Bearer jwt_access_token
```

## Security Features

### Password Requirements
- Minimum 8 characters
- Maximum 100 characters
- Must contain at least:
  - One lowercase letter
  - One uppercase letter
  - One digit
  - One special character (@$!%*?&)

### JWT Token Structure
```json
{
  "userId": "user_id",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "user",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Token Expiration
- **Access Token**: 1 hour
- **Refresh Token**: 7 days

## Database Schema

### User Model
```javascript
{
  email: String (required, unique, validated),
  password: String (required, hashed, select: false),
  fullName: String (required, 3-50 characters),
  role: String (enum: ['admin', 'user', 'userAdmin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

## Usage Examples

### Frontend Integration

#### 1. Login Request
```javascript
const loginUser = async (email, password) => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (data.status === 'success') {
      // Store tokens
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      return data.data.user;
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

#### 2. Protected API Call
```javascript
const fetchProtectedData = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (response.status === 401) {
      // Token expired, try to refresh
      await refreshToken();
      return fetchProtectedData(); // Retry
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
  }
};
```

#### 3. Token Refresh
```javascript
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetch('/auth/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    const data = await response.json();
    
    if (data.status === 'success') {
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('refreshToken', data.data.refreshToken);
    }
  } catch (error) {
    // Refresh failed, redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  }
};
```

## Testing

Run the test file to verify the authentication system:

```bash
node test-auth.js
```

This will test:
- User registration
- User login
- Protected route access
- Token refresh
- Invalid login handling
- Unauthorized access handling

## Error Handling

The API returns consistent error responses:

```json
{
  "status": "error",
  "message": "Error description",
  "data": []
}
```

Common error scenarios:
- **400**: Bad request (validation errors)
- **401**: Unauthorized (invalid/missing token)
- **500**: Server error

## Security Best Practices

1. **Environment Variables**: Never commit JWT secrets to version control
2. **HTTPS**: Use HTTPS in production
3. **Token Storage**: Store tokens securely (httpOnly cookies recommended)
4. **Password Validation**: Enforce strong password requirements
5. **Rate Limiting**: Implement rate limiting for auth endpoints
6. **Logging**: Log authentication attempts and failures
7. **CORS**: Configure CORS properly for your frontend domain

## Dependencies

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT implementation
- `bcryptjs`: Password hashing
- `dotenv`: Environment variable management
- `nodemon`: Development server (dev dependency) 