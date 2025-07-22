import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="welcome-container">
      <div className="card welcome-card">
        <div className="welcome-icon">
          <i className="fas fa-home"></i>
        </div>
        
        <h1 className="welcome-title">
          Welcome to Auth System
        </h1>
        
        <p className="welcome-message">
          A secure authentication system built with Node.js backend and React frontend. 
          Experience seamless login, signup, and user management with JWT token authentication.
        </p>

        {isAuthenticated ? (
          <div className="welcome-actions">
            <Link to="/dashboard" className="btn btn-primary">
              <i className="fas fa-tachometer-alt"></i>
              Go to Dashboard
            </Link>
            <Link to="/welcome" className="btn btn-secondary">
              <i className="fas fa-user"></i>
              View Profile
            </Link>
          </div>
        ) : (
          <div className="welcome-actions">
            <Link to="/login" className="btn btn-primary">
              <i className="fas fa-sign-in-alt"></i>
              Login
            </Link>
            <Link to="/signup" className="btn btn-secondary">
              <i className="fas fa-user-plus"></i>
              Sign Up
            </Link>
          </div>
        )}

        <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '12px' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>
            <i className="fas fa-info-circle" style={{ color: '#667eea', marginRight: '8px' }}></i>
            Features
          </h3>
          <ul style={{ textAlign: 'left', color: '#666', lineHeight: '1.8' }}>
            <li><strong>Secure Authentication:</strong> JWT token-based authentication with refresh tokens</li>
            <li><strong>Password Validation:</strong> Strong password requirements with bcrypt hashing</li>
            <li><strong>Role-based Access:</strong> Support for user, admin, and userAdmin roles</li>
            <li><strong>Email Validation:</strong> Proper email format validation</li>
            <li><strong>Responsive Design:</strong> Works perfectly on all devices</li>
            <li><strong>Modern UI:</strong> Beautiful gradient design with smooth animations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home; 