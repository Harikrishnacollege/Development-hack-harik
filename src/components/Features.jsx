import React from 'react';
import { FaNetworkWired, FaFileAlt, FaUsers, FaBell, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaNetworkWired />,
      title: "Unified Platform",
      description: "Combining LinkedIn-style networking with Unstop-like opportunities in one place for college students."
    },
    {
      icon: <FaFileAlt />,
      title: "Centralized Applications",
      description: "Apply to multiple colleges, internships, and competitions through a single dashboard."
    },
    {
      icon: <FaUsers />,
      title: "Student Network",
      description: "Connect with peers, alumni, and professionals in your field of study."
    },
    {
      icon: <FaBell />,
      title: "Smart Notifications",
      description: "Get alerts for application deadlines, new opportunities, and network activities."
    },
    {
      icon: <FaChartLine />,
      title: "Progress Tracking",
      description: "Monitor your application status, skill development, and academic growth."
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure & Private",
      description: "Enterprise-grade security to protect your data and application materials."
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Why Choose College Central Hub?</h2>
        <p className="section-subtitle">
          We bring together everything a college student needs for academic and career success in one integrated platform.
        </p>
        
        <div className="features-container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .features {
          background-color: white;
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
          color: #666666; /* Dark gray (using black as base) */
          max-width: 700px;
          margin: 0 auto 60px;
          line-height: 1.6;
        }
        
        .features-container {
          width: 100%;
          overflow: hidden;
        }
        
        .features-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          margin: 0 auto;
          max-width: 1200px;
        }
        
        .feature-card {
          flex: 0 0 calc(33.333% - 20px); /* 3 items per row with gap */
          background: #ffffff; /* White */
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          padding: 40px 25px;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 87, 255, 0.15);
          border-color: #0057ff; /* Blue */
        }
        
        .feature-icon-wrapper {
          width: 80px;
          height: 80px;
          background: #0057ff; /* Blue */
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 2rem;
          color: white;
          transition: all 0.3s ease;
        }
        
        .feature-card:hover .feature-icon-wrapper {
          background: #000000; /* Black on hover */
          transform: scale(1.05);
        }
        
        .feature-title {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #000000; /* Black */
          font-weight: 600;
        }
        
        .feature-description {
          color: #333333; /* Dark gray (using black as base) */
          line-height: 1.6;
          font-size: 1rem;
        }
        
        /* Responsive Design */
        @media (max-width: 1024px) {
          .feature-card {
            flex: 0 0 calc(33.333% - 20px); /* Still 3 items on tablets */
          }
          
          .features-grid {
            gap: 20px;
          }
        }
        
        @media (max-width: 900px) {
          .feature-card {
            flex: 0 0 calc(50% - 15px); /* 2 items on smaller tablets */
          }
          
          .section-title {
            font-size: 2.2rem;
          }
        }
        
        @media (max-width: 768px) {
          .features {
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
          
          .feature-card {
            padding: 30px 20px;
          }
          
          .feature-icon-wrapper {
            width: 70px;
            height: 70px;
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 600px) {
          .feature-card {
            flex: 0 0 100%; /* 1 item on mobile */
            max-width: 400px;
            margin: 0 auto;
          }
          
          .features-grid {
            gap: 25px;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
        }
        
        @media (max-width: 480px) {
          .feature-card {
            padding: 25px 15px;
          }
          
          .feature-icon-wrapper {
            width: 60px;
            height: 60px;
            font-size: 1.5rem;
          }
          
          .feature-title {
            font-size: 1.3rem;
          }
          
          .feature-description {
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
        }
      `}</style>
    </section>
  );
};

export default Features;