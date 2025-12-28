import React from 'react';
import { FaUserPlus, FaSearch, FaFileUpload, FaRobot, FaNetworkWired, FaChartBar } from 'react-icons/fa';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create Your Profile",
      description: "Sign up and build your academic profile with achievements, skills, and interests."
    },
    {
      icon: <FaSearch />,
      title: "Explore Opportunities",
      description: "Browse colleges, internships, competitions, and connect with students."
    },
    {
      icon: <FaFileUpload />,
      title: "Apply Seamlessly",
      description: "Submit applications to multiple opportunities with a single click."
    },
    {
      icon: <FaRobot />,
      title: "Use AI Generator",
      description: "Create custom practice papers for any subject and exam type."
    },
    {
      icon: <FaNetworkWired />,
      title: "Build Network",
      description: "Connect with peers, alumni, and professionals in your field."
    },
    {
      icon: <FaChartBar />,
      title: "Track Progress",
      description: "Monitor your applications, skill development, and academic growth."
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">
          Get started with College Central Hub in just a few simple steps.
        </p>
        
        <div className="steps-container">
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div className="step-card" key={index}>
                <div className="step-header">
                  <div className="step-number">{index + 1}</div>
                  <div className="step-icon">{step.icon}</div>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="progress-line">
          {steps.map((_, index) => (
            <div className="progress-dot" key={index}>
              <div className="dot"></div>
              {index < steps.length - 1 && <div className="connector"></div>}
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .how-it-works {
          background-color: #ffffff; /* White */
          padding: 80px 0;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .section-title {
          text-align: center;
          font-size: 2.5rem;
          color: #000000; /* Black */
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .section-subtitle {
          text-align: center;
          font-size: 1.1rem;
          color: #666666; /* Dark gray */
          max-width: 600px;
          margin: 0 auto 60px;
          line-height: 1.6;
        }
        
        .steps-container {
          width: 100%;
          overflow: hidden;
          margin-bottom: 60px;
        }
        
        .steps-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          margin: 0 auto;
          max-width: 1200px;
        }
        
        .step-card {
          flex: 0 0 calc(33.333% - 20px); /* 3 items per row */
          background: #ffffff; /* White */
          border: 2px solid #0057ff; /* Blue border */
          border-radius: 15px;
          padding: 40px 25px;
          text-align: center;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: 0 5px 15px rgba(0, 87, 255, 0.1);
        }
        
        .step-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 87, 255, 0.2);
          border-color: #000000; /* Black on hover */
        }
        
        .step-header {
          position: relative;
          margin-bottom: 25px;
        }
        
        .step-number {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 40px;
          background-color: #0057ff; /* Blue */
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          border: 3px solid white;
          box-shadow: 0 0 0 3px #0057ff;
          z-index: 2;
          transition: all 0.3s ease;
        }
        
        .step-card:hover .step-number {
          background-color: #000000; /* Black on hover */
          box-shadow: 0 0 0 3px #000000;
        }
        
        .step-icon {
          width: 80px;
          height: 80px;
          background: #0057ff; /* Blue */
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          font-size: 2rem;
          color: white;
          transition: all 0.3s ease;
        }
        
        .step-card:hover .step-icon {
          background: #000000; /* Black on hover */
          transform: scale(1.1);
        }
        
        .step-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #000000; /* Black */
          font-weight: 600;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .step-description {
          color: #333333; /* Dark gray */
          line-height: 1.6;
          font-size: 1rem;
        }
        
        .progress-line {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 40px;
          max-width: 1000px;
          margin: 0 auto;
        }
        
        .progress-dot {
          display: flex;
          align-items: center;
          flex: 1;
        }
        
        .dot {
          width: 16px;
          height: 16px;
          background-color: #0057ff; /* Blue */
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 0 0 2px #0057ff;
          z-index: 2;
          transition: all 0.3s ease;
        }
        
        .progress-dot:hover .dot {
          background-color: #000000; /* Black on hover */
          transform: scale(1.2);
          box-shadow: 0 0 0 2px #000000;
        }
        
        .connector {
          flex: 1;
          height: 3px;
          background-color: #0057ff; /* Blue */
          opacity: 0.3;
          transition: all 0.3s ease;
        }
        
        .progress-dot:hover + .progress-dot .connector,
        .progress-dot:hover .connector {
          opacity: 0.7;
          background-color: #000000; /* Black on hover */
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .step-card {
            flex: 0 0 calc(33.333% - 20px);
          }
          
          .steps-grid {
            gap: 25px;
          }
        }
        
        @media (max-width: 900px) {
          .step-card {
            flex: 0 0 calc(50% - 15px); /* 2 items on tablets */
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .progress-line {
            padding: 0 20px;
          }
        }
        
        @media (max-width: 768px) {
          .how-it-works {
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .section-subtitle {
            font-size: 1rem;
            margin-bottom: 40px;
            padding: 0 10px;
          }
          
          .step-card {
            padding: 35px 20px;
          }
          
          .step-icon {
            width: 70px;
            height: 70px;
            font-size: 1.8rem;
          }
          
          .step-title {
            font-size: 1.3rem;
            min-height: 50px;
          }
        }
        
        @media (max-width: 600px) {
          .step-card {
            flex: 0 0 100%; /* 1 item on mobile */
            max-width: 400px;
            margin: 0 auto;
          }
          
          .steps-grid {
            gap: 40px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .progress-line {
            display: none; /* Hide progress line on mobile */
          }
        }
        
        @media (max-width: 480px) {
          .step-card {
            padding: 30px 15px;
          }
          
          .step-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
          
          .step-number {
            width: 35px;
            height: 35px;
            font-size: 1.1rem;
          }
          
          .step-title {
            font-size: 1.2rem;
            min-height: 40px;
          }
          
          .step-description {
            font-size: 0.95rem;
          }
        }
        
        @media (max-width: 360px) {
          .container {
            padding: 0 15px;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
          
          .step-card {
            padding: 25px 15px;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;