import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Welcome = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="welcome-container">
      <div className="card welcome-card">
        <div className="welcome-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        
        <h1 className="welcome-title">
          Welcome, {user?.fullName}!
        </h1>
        
        <p className="welcome-message">
          You have successfully logged into your account. Your authentication was successful and you can now access all the features of our platform.
        </p>

        <div style={{ 
          background: 'rgba(102, 126, 234, 0.1)', 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>
            <i className="fas fa-user-circle" style={{ color: '#667eea', marginRight: '8px' }}></i>
            Account Information
          </h3>
          <div style={{ color: '#666', lineHeight: '1.8' }}>
            <p><strong>Name:</strong> {user?.fullName}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
          </div>
        </div>

        <div className="welcome-actions">
          <Link to="/dashboard" className="btn btn-primary">
            <i className="fas fa-tachometer-alt"></i>
            Go to Dashboard
          </Link>
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-home"></i>
            Back to Home
          </Link>
          <button onClick={handleLogout} className="btn btn-danger">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>

        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          background: 'rgba(40, 167, 69, 0.1)', 
          borderRadius: '12px',
          border: '1px solid rgba(40, 167, 69, 0.2)'
        }}>
          <h3 style={{ color: '#28a745', marginBottom: '15px' }}>
            <i className="fas fa-shield-alt" style={{ marginRight: '8px' }}></i>
            Authentication Successful
          </h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Your JWT token has been securely stored and you are now authenticated. 
            You can access protected routes and features throughout the application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome; 