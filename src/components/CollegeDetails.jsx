import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaGlobe, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaMoneyBillWave, 
  FaStar, 
  FaCalendarAlt,
  FaFileAlt,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaCheckCircle,
  FaClock,
  FaUniversity,
  FaDownload
} from 'react-icons/fa';
import collegesData from '../data/college.json';
import '../Styles/CollegeDetails.css';

const CollegeDetails = () => {
  const { id } = useParams(); // Get id from URL params
  const [college, setCollege] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: '',
    message: '',
    documents: []
  });

  useEffect(() => {
    // Check if id exists before using it
    if (id) {
      const foundCollege = collegesData.find(c => c.id === parseInt(id));
      if (foundCollege) {
        setCollege(foundCollege);
        // Set default program
        if (foundCollege.programs && foundCollege.programs.length > 0) {
          setApplicationData(prev => ({
            ...prev,
            program: foundCollege.programs[0].name
          }));
        }
      }
    }
  }, [id]); // Add id to dependency array

  const handleApply = () => {
    setIsApplying(true);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      alert('Application submitted successfully! The college will contact you soon.');
      setIsApplying(false);
      setApplicationData({
        fullName: '',
        email: '',
        phone: '',
        program: '',
        message: '',
        documents: []
      });
    }, 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!college) {
    return (
      <div className="loading">
        <div className="loading-content">
          <h2>Loading college details...</h2>
          <Link to="/colleges" className="back-btn">
            <FaArrowLeft /> Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="college-details-page">
      {/* Back Button */}
      <div className="back-nav">
        <Link to="/colleges" className="back-btn">
          <FaArrowLeft /> Back to Colleges
        </Link>
      </div>

      {/* Hero Section */}
      <div className="college-hero">
        <div className="hero-image">
          <img src={college.image} alt={college.name} />
          <div className="hero-overlay">
            <div className="hero-content">
              <h1>{college.name}</h1>
              <div className="hero-meta">
                <span className="location">
                  <FaMapMarkerAlt /> {college.location}
                </span>
                <span className="ranking">
                  <FaStar /> Rank #{college.ranking}
                </span>
                <span className="type">
                  <FaUniversity /> {college.type} University
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="content-wrapper">
          {/* Main Content */}
          <main className="main-content">
            {/* Tabs Navigation */}
            <div className="tabs-navigation">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={`tab-btn ${activeTab === 'programs' ? 'active' : ''}`}
                onClick={() => setActiveTab('programs')}
              >
                Programs
              </button>
              <button 
                className={`tab-btn ${activeTab === 'deadlines' ? 'active' : ''}`}
                onClick={() => setActiveTab('deadlines')}
              >
                Deadlines
              </button>
              <button 
                className={`tab-btn ${activeTab === 'requirements' ? 'active' : ''}`}
                onClick={() => setActiveTab('requirements')}
              >
                Requirements
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  <h2>About {college.name}</h2>
                  <p className="college-description">{college.description}</p>
                  
                  <div className="quick-stats">
                    <div className="stat-card">
                      <FaUsers className="stat-icon" />
                      <div className="stat-content">
                        <h3>{college.campusLife?.students?.toLocaleString() || 'N/A'}</h3>
                        <p>Total Students</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <FaGraduationCap className="stat-icon" />
                      <div className="stat-content">
                        <h3>{college.acceptanceRate}%</h3>
                        <p>Acceptance Rate</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <FaMoneyBillWave className="stat-icon" />
                      <div className="stat-content">
                        <h3>${college.tuition?.toLocaleString()}</h3>
                        <p>Annual Tuition</p>
                      </div>
                    </div>
                    <div className="stat-card">
                      <FaBuilding className="stat-icon" />
                      <div className="stat-content">
                        <h3>{college.campusLife?.campusSize || 'N/A'}</h3>
                        <p>Campus Size</p>
                      </div>
                    </div>
                  </div>

                  {/* Courses */}
                  <div className="courses-section">
                    <h3>Popular Courses</h3>
                    <div className="courses-grid">
                      {college.courses?.map((course, index) => (
                        <div key={index} className="course-card">
                          <FaGraduationCap className="course-icon" />
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="specializations-section">
                    <h3>Specializations</h3>
                    <div className="specializations-grid">
                      {college.specializations?.map((spec, index) => (
                        <div key={index} className="specialization-card">
                          <FaCheckCircle className="spec-icon" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'programs' && (
                <div className="programs-tab">
                  <h2>Academic Programs</h2>
                  <div className="programs-grid">
                    {college.programs?.map((program, index) => (
                      <div key={index} className="program-card">
                        <h3>{program.name}</h3>
                        <div className="program-details">
                          <span className="duration">
                            <FaClock /> {program.duration}
                          </span>
                          <span className="fee">
                            <FaMoneyBillWave /> ${program.fee?.toLocaleString()}/year
                          </span>
                        </div>
                        <div className="program-requirements">
                          <h4>Requirements:</h4>
                          <ul>
                            {program.requirements?.map((req, reqIndex) => (
                              <li key={reqIndex}>{req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )) || <p>No program information available.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'deadlines' && (
                <div className="deadlines-tab">
                  <h2>Application Deadlines</h2>
                  <div className="deadline-cards">
                    <div className="deadline-card important">
                      <div className="deadline-header">
                        <FaCalendarAlt className="deadline-icon" />
                        <h3>Fall Semester 2024</h3>
                      </div>
                      <div className="deadline-date">{college.deadlines?.fall || 'Not specified'}</div>
                      <p className="deadline-note">Priority deadline for all programs</p>
                    </div>
                    
                    <div className="deadline-card">
                      <div className="deadline-header">
                        <FaCalendarAlt className="deadline-icon" />
                        <h3>Spring Semester 2024</h3>
                      </div>
                      <div className="deadline-date">{college.deadlines?.spring || 'Not specified'}</div>
                      <p className="deadline-note">Limited programs available</p>
                    </div>
                    
                    <div className="deadline-card">
                      <div className="deadline-header">
                        <FaCalendarAlt className="deadline-icon" />
                        <h3>Summer Semester 2024</h3>
                      </div>
                      <div className="deadline-date">{college.deadlines?.summer || 'Not specified'}</div>
                      <p className="deadline-note">International students only</p>
                    </div>
                  </div>

                  <div className="application-fee">
                    <h3>Application Fee</h3>
                    <div className="fee-amount">
                      ${college.applicationFee?.toLocaleString() || '75'}
                    </div>
                    <p className="fee-note">Non-refundable application processing fee</p>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="requirements-tab">
                  <h2>Application Requirements</h2>
                  
                  <div className="requirements-list">
                    <h3>Documents Required:</h3>
                    <ul>
                      {college.requirements?.map((req, index) => (
                        <li key={index}>
                          <FaFileAlt className="req-icon" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="scholarships-section">
                    <h3>Available Scholarships</h3>
                    <div className="scholarships-grid">
                      {college.scholarships?.map((scholarship, index) => (
                        <div key={index} className="scholarship-card">
                          <FaStar className="scholarship-icon" />
                          <span>{scholarship}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="contact-section">
                    <h3>Admissions Office</h3>
                    <div className="contact-info">
                      <div className="contact-item">
                        <FaEnvelope className="contact-icon" />
                        <div>
                          <strong>Email:</strong>
                          <p>{college.contact?.email || 'admissions@college.edu'}</p>
                        </div>
                      </div>
                      <div className="contact-item">
                        <FaPhone className="contact-icon" />
                        <div>
                          <strong>Phone:</strong>
                          <p>{college.contact?.phone || '+1-000-000-0000'}</p>
                        </div>
                      </div>
                      <div className="contact-item">
                        <FaMapMarkerAlt className="contact-icon" />
                        <div>
                          <strong>Address:</strong>
                          <p>{college.contact?.address || 'College Address'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Sidebar - Application Section */}
          <aside className="application-sidebar">
            <div className="sidebar-card">
              <h3>Ready to Apply?</h3>
              
              <div className="deadline-alert">
                <FaCalendarAlt className="alert-icon" />
                <div className="alert-content">
                  <strong>Next Deadline:</strong>
                  <p>{college.deadlines?.fall || 'January 1, 2024'}</p>
                </div>
              </div>

              {!isApplying ? (
                <>
                  <button className="apply-now-btn" onClick={handleApply}>
                    Apply Now
                  </button>
                  
                  <a 
                    href={college.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="website-btn"
                    style={{width:'23vw'}}
                  >
                    <FaGlobe /> VisitWebsite
                  </a>
                  
                  <div className="quick-info">
                    <h4>Quick Info:</h4>
                    <ul>
                      <li>Application Fee: ${college.applicationFee || 75}</li>
                      <li>Acceptance Rate: {college.acceptanceRate}%</li>
                      <li>Annual Tuition: ${college.tuition?.toLocaleString()}</li>
                      {college.scholarships && (
                        <li>Scholarships: {college.scholarships.length} types available</li>
                      )}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="application-form">
                  <h4>Application Form</h4>
                  <form onSubmit={handleSubmitApplication}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={applicationData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={applicationData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={applicationData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                    
                    {college.programs && college.programs.length > 0 && (
                      <div className="form-group">
                        <label>Program *</label>
                        <select
                          name="program"
                          value={applicationData.program}
                          onChange={handleInputChange}
                          required
                        >
                          {college.programs.map((program, index) => (
                            <option key={index} value={program.name}>
                              {program.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    <div className="form-group">
                      <label>Additional Message</label>
                      <textarea
                        name="message"
                        value={applicationData.message}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Tell us why you're interested..."
                      />
                    </div>
                    
                    <div className="form-actions">
                      <button type="submit" className="submit-btn">
                        Submit Application
                      </button>
                      <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => setIsApplying(false)}
                      >
                        Cancel
                      </button>
                    </div>
                    
                    <p className="form-note">
                      * Required fields. After submission, our admissions team will contact you with next steps.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;