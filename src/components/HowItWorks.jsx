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
          {steps.map((step, index) => (
            <div className="step-item" key={index}>
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="timeline">
          <div className="timeline-line"></div>
          {steps.map((_, index) => (
            <div className="timeline-dot" key={index}></div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .how-it-works {
          background-color: white;
        }
        
        .steps-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }
        
        .step-item {
          text-align: center;
          padding: 30px 20px;
          position: relative;
        }
        
        .step-number {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background-color: var(--primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }
        
        .step-icon {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 1.8rem;
          color: white;
        }
        
        .step-item h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: var(--dark-color);
        }
        
        .step-item p {
          color: var(--gray-color);
        }
        
        .timeline {
          position: relative;
          height: 5px;
          margin: 0 50px;
        }
        
        .timeline-line {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #eee;
          transform: translateY(-50%);
        }
        
        .timeline-dot {
          position: absolute;
          top: 50%;
          width: 10px;
          height: 10px;
          background-color: var(--primary-color);
          border-radius: 50%;
          transform: translateY(-50%);
        }
        
        .timeline-dot:nth-child(2) { left: 0; }
        .timeline-dot:nth-child(3) { left: 20%; }
        .timeline-dot:nth-child(4) { left: 40%; }
        .timeline-dot:nth-child(5) { left: 60%; }
        .timeline-dot:nth-child(6) { left: 80%; }
        .timeline-dot:nth-child(7) { left: 100%; }
        
        @media (max-width: 1024px) {
          .steps-container {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
          }
        }

        @media (max-width: 768px) {
          .steps-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .step-item {
            padding: 25px 15px;
          }
          
          .timeline {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .step-icon {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
          
          .step-item h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;