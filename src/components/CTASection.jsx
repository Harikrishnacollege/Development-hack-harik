import React, { useState } from 'react';
import { FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const CTASection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // In a real app, you would send this to your backend
      console.log('Email submitted:', email);
      setSubmitted(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Transform Your College Experience?</h2>
          <p>Join the waitlist for early access to College Central Hub. Be among the first to experience the future of college applications and AI-powered learning.</p>
          
          {submitted ? (
            <div className="success-message">
              <FaCheckCircle className="success-icon" />
              <p>Thank you! We'll notify you when we launch.</p>
            </div>
          ) : (
            <form className="cta-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-accent">Join Waitlist</button>
              </div>
              <p className="form-note">We respect your privacy. No spam, ever.</p>
            </form>
          )}
          
          <div className="cta-stats">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Students on Waitlist</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Colleges Registered</p>
            </div>
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Questions Generated</p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .cta-section {
          background: linear-gradient(135deg, var(--secondary-color), var(--primary-color));
          color: white;
          text-align: center;
          padding: 100px 0;
        }
        
        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .cta-content > p {
          font-size: 1.2rem;
          max-width: 700px;
          margin: 0 auto 40px;
          opacity: 0.9;
        }
        
        .cta-form {
          max-width: 500px;
          margin: 0 auto 50px;
        }
        
        .form-group {
          display: flex;
          position: relative;
          margin-bottom: 15px;
        }
        
        .input-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray-color);
          z-index: 1;
        }
        
        .cta-form input {
          flex: 1;
          padding: 15px 20px 15px 50px;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .cta-form button {
          position: absolute;
          right: 5px;
          top: 5px;
          bottom: 5px;
          padding: 0 25px;
        }
        
        .form-note {
          font-size: 0.9rem;
          opacity: 0.8;
        }
        
        .success-message {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          background: rgba(255, 255, 255, 0.1);
          padding: 20px;
          border-radius: 10px;
          max-width: 500px;
          margin: 0 auto 50px;
        }
        
        .success-icon {
          font-size: 2rem;
          color: var(--success-color);
        }
        
        .cta-stats {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 50px;
          margin-top: 30px;
        }
        
        .stat-item h3 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }
        
        .stat-item p {
          opacity: 0.9;
          font-size: 0.9rem;
        }
        
        @media (max-width: 1024px) {
          .cta-content h2 {
            font-size: 2.3rem;
          }
          
          .cta-stats {
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .cta-section {
            padding: 70px 0;
          }
          
          .cta-content h2 {
            font-size: 2rem;
          }
          
          .cta-content > p {
            font-size: 1.1rem;
          }
          
          .form-group {
            flex-direction: column;
            gap: 15px;
          }
          
          .cta-form button {
            position: relative;
            right: auto;
            top: auto;
            bottom: auto;
            width: 100%;
          }
          
          .cta-stats {
            gap: 30px;
          }
          
          .stat-item h3 {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .cta-section {
            padding: 60px 0;
          }
          
          .cta-content h2 {
            font-size: 1.75rem;
          }
          
          .cta-content > p {
            font-size: 1rem;
          }
          
          .cta-stats {
            flex-direction: column;
            gap: 25px;
          }
          
          .stat-item h3 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </section>
  );
};

export default CTASection;