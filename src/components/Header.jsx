import React, { useState, useEffect, useRef } from 'react';
import { FaGraduationCap, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    navigate('/');
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <header className="header"> 
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <FaGraduationCap className="logo-icon" />
            <span className="logo-text">College<span className="logo-highlight">Central</span>Hub</span>
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" ><a href="#features">Features</a></Link>
            <Link to="/AiGenerator" style={{textDecoration: 'none', color: 'var(--dark-color)', fontWeight: 500}}>AI_QS</Link>
            <Link to="/colleges" style={{textDecoration: 'none', color: 'var(--dark-color)', fontWeight: 500}}>Colleges</Link>
            {isAuthenticated ? (
              <div className="profile-dropdown" ref={profileMenuRef}>
              <Link to="/Profile" ><button 
                  className="profile-avatar-btn"
                  onMouseEnter={() => setShowProfileMenu(!showProfileMenu)}
                  onMouseLeave={()=> setShowProfileMenu(!showProfileMenu)}
                  aria-label="Profile menu"
                >
                  <FaUserCircle className="profile-avatar-icon" />
                  <span className="profile-name">{user?.name || user?.email || 'User'}</span>
                </button></Link>
                {showProfileMenu && (
                  <div className="profile-menu">
                    <div className="profile-menu-header">
                      <FaUserCircle className="profile-menu-avatar" />
                      <div>
                        <p className="profile-menu-name">{user?.name || 'User'}</p>
                        <p className="profile-menu-email">{user?.email || ''}</p>
                      </div>
                    </div>
                    <div className="profile-menu-divider"></div>
                    <button className="profile-menu-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>

            ) : (
              <Link to="/login" className="btn btn-primary" style={{textDecoration: 'none'}}>Login</Link>
            )}
          </div>
          
          <button 
            className="mobile-menu-btn" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            type="button"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </nav>
      </div>
      
      <style jsx>{`
        .header {
          background-color: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
        }
        
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          width: 100%;
        }
        
        .logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--dark-color);
        }
        
        .logo-icon {
          color: var(--primary-color);
          margin-right: 10px;
          font-size: 2rem;
        }
        
        .logo-highlight {
          color: var(--primary-color);
        }
        
        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }
        
        .nav-links a {
          text-decoration: none;
          color: var(--dark-color);
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .nav-links a:hover {
          color: var(--primary-color);
        }
        
        .nav-links .btn {
          padding: 8px 20px;
          font-size: 0.9rem;
        }
        
        .mobile-menu-btn {
          display: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--dark-color);
          background: transparent;
          border: none;
          padding: 8px;
          transition: color 0.3s ease;
        }
        
        .mobile-menu-btn:hover {
          color: var(--primary-color);
        }
        
        .profile-dropdown {
          position: relative;
        }
        
        .profile-avatar-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 20px;
          transition: background-color 0.3s ease;
        }
        
        .profile-avatar-btn:hover {
          background-color: rgba(67, 97, 238, 0.1);
        }
        
        .profile-avatar-icon {
          font-size: 2rem;
          color: var(--primary-color);
        }
        
        .profile-name {
          font-weight: 500;
          color: var(--dark-color);
          font-size: 0.95rem;
        }
        
        .profile-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          min-width: 220px;
          z-index: 1001;
          overflow: hidden;
        }
        
        .profile-menu-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
          color: white;
        }
        
        .profile-menu-avatar {
          font-size: 2.5rem;
        }
        
        .profile-menu-name {
          font-weight: 600;
          font-size: 1rem;
          margin: 0;
        }
        
        .profile-menu-email {
          font-size: 0.85rem;
          opacity: 0.9;
          margin: 0;
        }
        
        .profile-menu-divider {
          height: 1px;
          background: #eee;
        }
        
        .profile-menu-item {
          width: 100%;
          padding: 12px 16px;
          background: transparent;
          border: none;
          text-align: left;
          cursor: pointer;
          color: var(--dark-color);
          font-size: 0.95rem;
          transition: background-color 0.2s ease;
        }
        
        .profile-menu-item:hover {
          background-color: #f5f5f5;
        }
        
        @media (max-width: 1024px) {
          .nav-links {
            gap: 20px;
          }
          
          .nav-links a {
            font-size: 0.95rem;
          }

        }

        @media (max-width: 1024px) {
          .mobile-menu-btn {
            display: block;
          }
          
          .logo {
            font-size: 1.3rem;
          }
          
          .logo-icon {
            font-size: 1.7rem;
          }
          
          .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: white;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            z-index: 999;
          }
          
          .nav-links.active {
            transform: translateY(0);
            opacity: 1;
          }
          
          .nav-links a {
            margin: 10px 0;
            width: 100%;
            text-align: center;
            padding: 10px;
          }
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 1.1rem;
          }
          
          .logo-icon {
            font-size: 1.5rem;
          }
          
          .navbar {
            padding: 15px 0;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;