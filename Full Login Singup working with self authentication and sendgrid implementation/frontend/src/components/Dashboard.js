import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user, logout, refreshToken } = useAuth();
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMessage, setRefreshMessage] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRefreshToken = async () => {
    setRefreshing(true);
    setRefreshMessage('');
    
    try {
      await refreshToken();
      setRefreshMessage('Token refreshed successfully!');
      setTimeout(() => setRefreshMessage(''), 3000);
    } catch (error) {
      setRefreshMessage('Failed to refresh token');
      setTimeout(() => setRefreshMessage(''), 3000);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </h1>
          <div>
            <Link to="/" className="btn btn-secondary" style={{ marginRight: '10px' }}>
              <i className="fas fa-home"></i> Home
            </Link>
            <button onClick={handleLogout} className="btn btn-danger">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>

        <div className="user-info">
          <div className="user-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="user-details">
            <h2>Welcome, {user?.fullName}!</h2>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
          </div>
        </div>

        <div className="dashboard-actions">
          <button 
            onClick={handleRefreshToken} 
            className="btn btn-secondary"
            disabled={refreshing}
          >
            {refreshing ? (
              <div className="loading">
                <div className="spinner"></div>
                Refreshing...
              </div>
            ) : (
              <>
                <i className="fas fa-sync-alt"></i>
                Refresh Token
              </>
            )}
          </button>
          
          <Link to="/welcome" className="btn btn-primary">
            <i className="fas fa-user"></i>
            View Profile
          </Link>
        </div>

        {refreshMessage && (
          <div style={{ 
            textAlign: 'center', 
            padding: '15px', 
            marginTop: '20px',
            borderRadius: '8px',
            background: refreshMessage.includes('successfully') ? 'rgba(40, 167, 69, 0.1)' : 'rgba(220, 53, 69, 0.1)',
            color: refreshMessage.includes('successfully') ? '#28a745' : '#dc3545',
            border: `1px solid ${refreshMessage.includes('successfully') ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)'}`
          }}>
            {refreshMessage}
          </div>
        )}

        <div style={{ 
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          <div className="card">
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              <i className="fas fa-shield-alt" style={{ color: '#667eea', marginRight: '8px' }}></i>
              Authentication Status
            </h3>
            <div style={{ color: '#666', lineHeight: '1.6' }}>
              <p><strong>Status:</strong> <span style={{ color: '#28a745' }}>Authenticated</span></p>
              <p><strong>Token Type:</strong> JWT</p>
              <p><strong>Session:</strong> Active</p>
              <p><strong>Last Activity:</strong> Now</p>
            </div>
          </div>

          <div className="card">
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              <i className="fas fa-cog" style={{ color: '#667eea', marginRight: '8px' }}></i>
              Account Settings
            </h3>
            <div style={{ color: '#666', lineHeight: '1.6' }}>
              <p><strong>Account Created:</strong> Recently</p>
              <p><strong>Role Permissions:</strong> {user?.role}</p>
              <p><strong>Email Verified:</strong> Yes</p>
              <p><strong>Two-Factor Auth:</strong> Not enabled</p>
            </div>
          </div>

          <div className="card">
            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              <i className="fas fa-chart-line" style={{ color: '#667eea', marginRight: '8px' }}></i>
              Quick Actions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button 
                onClick={handleRefreshToken} 
                className="btn btn-secondary"
                disabled={refreshing}
                style={{ justifyContent: 'flex-start' }}
              >
                <i className="fas fa-sync-alt"></i>
                Refresh Session
              </button>
              <Link to="/welcome" className="btn btn-primary" style={{ justifyContent: 'flex-start' }}>
                <i className="fas fa-user-edit"></i>
                Edit Profile
              </Link>
              <Link to="/" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                <i className="fas fa-home"></i>
                Go to Home
              </Link>
            </div>
          </div>
        </div>

        <div style={{ 
          marginTop: '40px', 
          padding: '20px', 
          background: 'rgba(102, 126, 234, 0.05)', 
          borderRadius: '12px',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>
            <i className="fas fa-info-circle" style={{ color: '#667eea', marginRight: '8px' }}></i>
            About Your Session
          </h3>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            You are currently logged in with a secure JWT token. This token automatically refreshes 
            when needed and provides access to protected resources. Your session will remain active 
            until you log out or the token expires.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 