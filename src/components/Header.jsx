import React, { useState } from 'react';
import { FaLinkedin, FaGraduationCap, FaBars, FaTimes } from 'react-icons/fa';
import {Link} from "react-router-dom";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header"> 
      <div className="container">
        <nav className="navbar">
          <div className="logo">
            <FaGraduationCap className="logo-icon" />
            <span className="logo-text">College<span className="logo-highlight">Central</span>Hub</span>
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#features">Features</a>
            <a href="#ai-generator">AI Generator</a>
            <a href="#how-it-works">How It Works</a>
            <Link to={`/colleges`} className="apply-btn-card">
            <a href="#testimonials"></a>
            </Link>
            <a href="#contact" className="btn btn-secondary">Get Early Access</a>
          </div>
          
          <div className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
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
        
        .mobile-menu-btn {
          display: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--dark-color);
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