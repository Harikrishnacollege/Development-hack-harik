import React from 'react';
import { FaMapMarkerAlt, FaGraduationCap, FaMoneyBillWave, FaGlobe, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../Styles/CollegeCard.css';

const CollegeCard = ({ college }) => {
  return (
    <div className="college-card">
      <div className="card-header">
        <img 
          src={college.image} 
          alt={college.name} 
          className="college-image"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
          }}
        />
        <div className="college-ranking">
          <FaStar className="star-icon" />
          <span>Rank #{college.ranking}</span>
        </div>
      </div>
      
      <div className="card-body">
        <h3 className="college-name">{college.name}</h3>
        
        <div className="college-info">
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <span>{college.location}</span>
          </div>
          
          <div className="info-item">
            <FaGraduationCap className="info-icon" />
            <span>{college.type} University</span>
          </div>
          
          <div className="info-item">
            <FaMoneyBillWave className="info-icon" />
            <span>${college.tuition.toLocaleString()}/year</span>
          </div>
          
          <div className="info-item">
            <FaGlobe className="info-icon" />
            <span>{college.country}</span>
          </div>
        </div>
        
        <div className="acceptance-rate">
          <div className="rate-label">Acceptance Rate</div>
          <div className="rate-value">{college.acceptanceRate}%</div>
        </div>
        
        <p className="college-description">{college.description}</p>
        
        <div className="courses-section">
          <h4>Popular Courses:</h4>
          <div className="courses-tags">
            {college.courses.slice(0, 3).map((course, index) => (
              <span key={index} className="course-tag">{course}</span>
            ))}
          </div>
        </div>
        
        <div className="specializations-section">
          <h4>Specializations:</h4>
          <div className="specializations-tags">
            {college.specializations.slice(0, 2).map((spec, index) => (
              <span key={index} className="specialization-tag">{spec}</span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        <a 
          href={college.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="website-btn"
        >
          Visit Website
        </a>
        <Link to={`/college/${college.id}`} className="apply-btn-card" style={{height:'8vh'}} >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default CollegeCard;