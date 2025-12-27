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
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card card" key={index}>
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .features {
          background-color: white;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .feature-card {
          text-align: center;
          padding: 40px 25px;
        }
        
        .feature-icon-wrapper {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 1.8rem;
          color: white;
        }
        
        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: var(--dark-color);
        }
        
        .feature-card p {
          color: var(--gray-color);
        }
        
        @media (max-width: 1024px) {
          .features-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
          }
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .feature-card {
            padding: 30px 20px;
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
          
          .feature-card h3 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Features;