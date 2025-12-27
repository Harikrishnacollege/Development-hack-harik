import React from 'react';
import { FaGraduationCap, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-section-1">
            <div className="footer-logo">
              <FaGraduationCap className="logo-icon" />
              <span className="logo-text">College<span className="logo-highlight">Central</span>Hub</span>
            </div>
            <p className="footer-description">
              The all-in-one platform for college applications, networking, and AI-powered academic preparation.
            </p>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaGithub /></a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#ai-generator">AI Generator</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#signup">Sign Up</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#press">Press</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookies">Cookie Policy</a></li>
              <li><a href="#gdpr">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} College Central Hub. All rights reserved.</p>
          <p>Made with ❤️ for students worldwide</p>
        </div>
      </div>
      
      <style jsx>{`


        .footer {
          background-color: var(--dark-color);
          color: white;
          padding: 60px 0 30px;
        }
        
        .footer-content {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          gap: 100px;
          margin-bottom: 50px;
        }

        .footer-section-1 {
          max-width: 500px;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .logo-icon {
          color: var(--accent-color);
          margin-right: 10px;
          font-size: 2rem;
        }
        
        .logo-highlight {
          color: var(--accent-color);
        }
        
        .footer-description {
          margin-bottom: 25px;
          opacity: 0.8;
          line-height: 1.7;
        }
        
        .social-links {
          display: flex;
          gap: 15px;
        }
        
        .social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .social-links a:hover {
          background-color: var(--primary-color);
          transform: translateY(-3px);
        }
        
        .footer-section h4 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          color: white;
        }
        
        .footer-section ul {
          list-style: none;
        }
        
        .footer-section li {
          margin-bottom: 10px;
        }
        
        .footer-section a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-section a:hover {
          color: var(--accent-color);
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          font-size: 0.9rem;
          opacity: 0.7;
        }
        
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 35px;
          }
        }

        @media (max-width: 768px) {
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  /* First section takes full width */
  .footer-section-1 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  /* Remaining sections align horizontally */
  .footer-section:not(.footer-section-1) {
    flex: 1 1 30%;
    min-width: 160px;
    padding-left:10px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
}


        @media (max-width: 480px) {
          .footer-logo {
            font-size: 1.3rem;
          }
          
          .logo-icon {
            font-size: 1.7rem;
          }
          
          .footer-section h4 {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;