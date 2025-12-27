import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student, IIT Delhi",
      content: "College Central Hub saved me hours of application work. The AI question generator is a game-changer for exam prep!",
      rating: 5
    },
    {
      name: "Rahul Verma",
      role: "Engineering Aspirant",
      content: "I applied to 15 colleges through this platform. The centralized dashboard made tracking everything so much easier.",
      rating: 5
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Professor, University of Mumbai",
      content: "As an educator, I'm impressed by the AI question generator. It creates well-structured papers that align with curriculum standards.",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <h2 className="section-title">What Students & Educators Say</h2>
        <p className="section-subtitle">
          Join thousands of students and educators who are already using College Central Hub.
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card card" key={index}>
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-content">{testimonial.content}</p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < testimonial.rating ? "star filled" : "star"}
                  />
                ))}
              </div>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .testimonials {
          background-color: #f8f9fa;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .testimonial-card {
          padding: 30px;
          position: relative;
        }
        
        .quote-icon {
          font-size: 1.5rem;
          color: var(--accent-color);
          margin-bottom: 20px;
        }
        
        .testimonial-content {
          font-style: italic;
          margin-bottom: 20px;
          color: var(--dark-color);
        }
        
        .testimonial-rating {
          display: flex;
          gap: 5px;
          margin-bottom: 20px;
        }
        
        .star {
          color: #ddd;
        }
        
        .star.filled {
          color: #ffc107;
        }
        
        .testimonial-author h4 {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: var(--dark-color);
        }
        
        .testimonial-author p {
          color: var(--gray-color);
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 25px;
          }
        }

        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .testimonial-card {
            padding: 25px 20px;
          }
        }

        @media (max-width: 480px) {
          .testimonial-card {
            padding: 20px 15px;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;