import React from 'react';
import { FaLinkedin, FaUniversity, FaRobot } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container container-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            The All-in-One Platform for <span className="highlight">College Students</span>
          </h1>
          <p className="hero-subtitle">
            Combining the best of LinkedIn, Unstop, and AI-powered exam preparation into one centralized hub for college applications, opportunities, and academic success.
          </p>
          <div className="hero-buttons">
            <a href="#signup" className="btn btn-primary">Start Free Trial</a>
            <a href="#demo" className="btn btn-secondary">Watch Demo</a>
          </div>
          <div className="hero-features">
            <div className="feature-item">
              <FaLinkedin className="feature-icon" />
              <span>LinkedIn-style Networking</span>
            </div>
            <div className="feature-item">
              <FaUniversity className="feature-icon" />
              <span>College Applications</span>
            </div>
            <div className="feature-item">
              <FaRobot className="feature-icon" />
              <span>AI Question Generator</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="dashboard-preview">
            <div className="dashboard-card card-1">
              <h4>College Applications</h4>
              <p>Track all your applications in one place</p>
            </div>
            <div className="dashboard-card card-2">
              <h4>AI Question Generator</h4>
              <p>Custom practice papers in seconds</p>
            </div>
            <div className="dashboard-card card-3">
              <h4>Student Network</h4>
              <p>Connect with peers and alumni</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hero {
          padding-top: 140px;
          padding-bottom: 80px;
          background: linear-gradient(135deg, #f5f7ff 0%, #e3e9ff 100%);
        }
        
        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        
        .hero-content {
          flex: 1;
          min-width: 300px;
          padding-right: 40px;
        }

        .container-hero {
          display:flex;
          flex-direction: row;
        }
        
        .hero-title {
          font-size: clamp(1.8rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          color: var(--dark-color);
        }
        
        .highlight {
          color: var(--primary-color);
        }
        
        .hero-subtitle {
          font-size: clamp(1rem, 2.5vw, 1.2rem);
          color: var(--gray-color);
          margin-bottom: 30px;
        }
        
        .hero-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .hero-features {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: white;
          padding: 10px 15px;
          border-radius: 50px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .feature-icon {
          color: var(--primary-color);
        }
        
        .hero-image {
          flex: 1;
          min-width: 300px;
          padding-left: 100px;
        }
        
        .dashboard-preview {
          position: relative;
          height: 400px;
        }
        
        .dashboard-card {
          position: absolute;
          max-width: 280px;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .card-1 {
          background: linear-gradient(135deg, #4361ee, #3a0ca3);
          color: white;
          top: 0;
          left: 0;
          z-index: 3;
        }
        
        .card-2 {
          background: white;
          top: 100px;
          left: 50px;
          z-index: 2;
          transform: rotate(-5deg);
        }
        
        .card-3 {
          background: linear-gradient(135deg, #4cc9f0, #4361ee);
          color: white;
          top: 200px;
          left: 100px;
          z-index: 1;
          transform: rotate(-8deg);
        }
        
        @media (max-width: 1200px) {
          .container {
            flex-direction: column;
            gap: 50px;
          }

          .hero {
            padding-bottom:50px;
          }
          
          .hero-content {
            padding-right: 0;
            text-align: center;
          }
          
          .hero-features {
            justify-content: center;
          }

          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .hero-image {
            width: 100%;
            padding-left: 0;
            max-height: 300px;
          }

          .dashboard-preview {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            height:200px;
            width: 100%;
            gap: 20px;

          }

          .card-1,
           .card-2 ,
           .card-3 {
            z-index:0;
          }

          .dashboard-card {
            position: relative;
            top:0;
            left:0;
            transform: rotate(0deg);
            min-height: 130px;
          }
        }

        @media (max-width: 992px) {
          .hero {
            padding-top: 130px;
      }
          .hero-title {
            font-size: 2.5rem;
          }

          .container-hero {
            
          }

          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-bottom:0;
            margin-bottom:0;
          }

          .hero-image {
            width: 100%;
            padding-left: 0;
            padding-top:0;
            margin-top:0;
          }

          .dashboard-preview {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            gap: 20px;
          }

          .dashboard-card {
            position: relative;
            top:0;
            left:0;
            transform: rotate(0deg);
            min-height: 130px;
            z-index:0;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding-top: 120px;
            padding-bottom: 3 0px;
          }
          
          .container {
            gap:20px;
          }

          .hero-title {
            font-size: 2.2rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .hero-content {
            padding-right: 0;
            margin-bottom: 0px;
          }
          
          .hero-buttons {
            flex-direction: column;
            width: 50%;
          }
          
          .hero-buttons .btn {
            width: 100%;
          }
          
          .hero-features {
            flex-direction: row;
            align-items: center;
          }
          
          .dashboard-preview {
            flex-direction: row;
            justify-content: center;

            padding:20px;
          }
        
          .hero-image {
            width:100%;
          }
        }

        @media (max-width: 480px) {

          .hero {
            padding-top: 100px;
            padding-bottom: 50px;
          }
          
          .hero-title {
            font-size: 1.8rem;
          }
          
          .hero-subtitle {
            font-size: 1rem;
          }
          
          .dashboard-preview {
            height: 250px;
          }
          
          .dashboard-card {
            width: 180px;
            padding: 15px;
          }
          
          .dashboard-card h4 {
            font-size: 1rem;
          }
          
          .dashboard-card p {
            font-size: 0.85rem;
          }
          
          .card-2 {
            left: 20px;
            top: 20px;
          }
          
          .card-3 {
            left: 40px;
            top: 40px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;