# React Authentication Frontend

A modern React.js frontend for your Node.js authentication backend with complete login, signup, and user management functionality.

## 🚀 Features

- **Complete Authentication Flow**: Login, signup, logout, and token management
- **Welcome Page**: Success confirmation after login/signup with user details
- **Dashboard**: User profile management and token refresh functionality
- **Protected Routes**: Automatic redirection based on authentication status
- **Form Validation**: Client-side validation matching backend requirements
- **Password Requirements**: Enforces strong password policy (matching backend)
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Beautiful gradient design with smooth animations
- **Token Management**: Automatic JWT token refresh and storage
- **Error Handling**: Comprehensive error messages and user feedback

## 📋 Prerequisites

- Node.js (version 14 or higher)
- Your backend server running on `http://localhost:8000`
- npm or yarn package manager

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start the Development Server

```bash
npm start
```

The React app will open automatically in your browser at `http://localhost:3000`.

### 3. Ensure Backend is Running

Make sure your backend server is running on port 8000:

```bash
cd backend
npm start
```

## 🎯 How to Use

### Authentication Flow

1. **Home Page** (`/`): Landing page with feature overview
2. **Login** (`/login`): Authenticate existing users
3. **Signup** (`/signup`): Create new user accounts
4. **Welcome** (`/welcome`): Success page after login/signup
5. **Dashboard** (`/dashboard`): User profile and token management

### User Journey

#### For New Users:
1. Visit the home page
2. Click "Sign Up"
3. Fill in the registration form with:
   - Full Name (3-50 characters)
   - Email (valid format)
   - Password (meets security requirements)
   - Role selection
4. Submit to create account
5. Automatically redirected to welcome page
6. Access dashboard and other features

#### For Existing Users:
1. Visit the home page
2. Click "Login"
3. Enter email and password
4. Submit to authenticate
5. Automatically redirected to welcome page
6. Access dashboard and other features

## 🔐 Password Requirements

The frontend enforces the same password requirements as your backend:

- Minimum 8 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one number
- At least one special character (@$!%*?&)

## 🏗️ Project Structure

```
frontend/
├── public/
│   └── index.html          # Main HTML file
├── src/
│   ├── components/         # React components
│   │   ├── Home.js         # Landing page
│   │   ├── Login.js        # Login form
│   │   ├── Signup.js       # Signup form
│   │   ├── Welcome.js      # Success page
│   │   └── Dashboard.js    # User dashboard
│   ├── contexts/
│   │   └── AuthContext.js  # Authentication context
│   ├── App.js              # Main app component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🔧 Configuration

### API Endpoint

The frontend is configured to connect to your backend at `http://localhost:8000`. If your backend runs on a different port, update the base URL in:

```javascript
// src/contexts/AuthContext.js
axios.defaults.baseURL = 'http://localhost:8000';
```

### Proxy Configuration

The `package.json` includes a proxy configuration for development:

```json
{
  "proxy": "http://localhost:8000"
}
```

## 🎨 Customization

### Styling

Modify `src/index.css` to change:
- Color scheme (lines 8-9 for main gradient)
- Button styles (lines 30-60)
- Form styling (lines 80-100)
- Card designs (lines 120-140)

### Components

Each component is modular and can be easily customized:
- `Login.js`: Login form and validation
- `Signup.js`: Registration form and validation
- `Welcome.js`: Success page layout
- `Dashboard.js`: User dashboard features

## 🔍 API Integration

The frontend integrates with your backend endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/signup` - User registration
- `POST /auth/refresh-token` - Token refresh

### Request/Response Format

The frontend expects the same response format as your backend:

```javascript
{
  status: 'success',
  message: 'Login successful',
  data: {
    user: { id, email, fullName, role },
    token: 'jwt_token',
    refreshToken: 'refresh_token'
  }
}
```

## 🚨 Error Handling

The frontend handles various error scenarios:

- **Network Errors**: Connection issues with backend
- **Validation Errors**: Form validation failures
- **Authentication Errors**: Invalid credentials
- **Token Errors**: Expired or invalid tokens

## 📱 Responsive Design

The frontend is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔒 Security Features

- **JWT Token Storage**: Secure token management
- **Automatic Token Refresh**: Seamless session management
- **Protected Routes**: Route-level authentication
- **Form Validation**: Client-side security validation
- **Password Hiding**: Toggle password visibility

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend has CORS enabled
2. **Connection Refused**: Check that backend is running on port 8000
3. **Token Issues**: Clear browser localStorage and try again
4. **Build Errors**: Run `npm install` to ensure all dependencies are installed

### Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App
npm run eject
```

## 🚀 Deployment

To deploy the frontend:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service

3. Update the API base URL for production in `AuthContext.js`

## 📄 License

This frontend is designed to work with your Node.js authentication backend.

## 🤝 Contributing

The frontend is specifically designed for your authentication system. Feel free to customize it further based on your needs! 