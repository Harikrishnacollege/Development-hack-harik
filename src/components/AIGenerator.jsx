import React, { useState } from 'react';
import { FaRobot, FaFilePdf, FaDownload, FaSync } from 'react-icons/fa';

const AIGenerator = () => {
  const [subject, setSubject] = useState('Computer Science');
  const [examType, setExamType] = useState('Mid-term');
  const [difficulty, setDifficulty] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState(null);

  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Business Studies'];
  const examTypes = ['Mid-term', 'Final Exam', 'Quiz', 'Entrance Test', 'Competitive Exam'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Advanced'];

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const samplePaper = {
        id: 1,
        title: `${subject} ${examType} Paper`,
        difficulty: difficulty,
        questions: [
          "Explain the concept of recursion with an example.",
          "Differentiate between procedural and object-oriented programming.",
          "Write an algorithm for binary search.",
          "What is time complexity? Calculate for bubble sort.",
          "Explain the client-server architecture with a diagram."
        ],
        generatedAt: new Date().toLocaleString()
      };
      
      setGeneratedPaper(samplePaper);
      setIsGenerating(false);
    }, 1500);
  };

  const handleDownload = () => {
    alert('Question paper downloaded as PDF!');
  };

  return (
    <section id="ai-generator" className="ai-generator">
      <div className="container">
        <h2 className="section-title">AI-Powered Question Paper Generator</h2>
        <p className="section-subtitle">
          Create custom practice papers for any subject and exam type in seconds using our advanced AI.
        </p>
        
        <div className="generator-container">
          <div className="generator-controls card">
            <div className="control-group">
              <label htmlFor="subject">Subject</label>
              <div className="dropdown">
                <select 
                  id="subject" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {subjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="control-group">
              <label htmlFor="examType">Exam Type</label>
              <div className="dropdown">
                <select 
                  id="examType" 
                  value={examType} 
                  onChange={(e) => setExamType(e.target.value)}
                >
                  {examTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="control-group">
              <label htmlFor="difficulty">Difficulty</label>
              <div className="difficulty-buttons">
                {difficultyLevels.map(level => (
                  <button
                    key={level}
                    className={`difficulty-btn ${difficulty === level ? 'active' : ''}`}
                    onClick={() => setDifficulty(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="btn btn-accent generate-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <FaSync className="spin" /> Generating...
                </>
              ) : (
                <>
                  <FaRobot /> Generate Question Paper
                </>
              )}
            </button>
          </div>
          
          <div className="generator-output card">
            <div className="output-header">
              <h3>Generated Question Paper</h3>
              <div className="paper-info">
                <span className="paper-subject">{subject}</span>
                <span className="paper-difficulty">{difficulty}</span>
              </div>
            </div>
            
            {generatedPaper ? (
              <div className="paper-content">
                <div className="paper-meta">
                  <p><strong>Exam Type:</strong> {examType}</p>
                  <p><strong>Generated:</strong> {generatedPaper.generatedAt}</p>
                </div>
                
                <div className="questions-list">
                  <h4>Questions:</h4>
                  <ol>
                    {generatedPaper.questions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="output-actions">
                  <button className="btn btn-primary" onClick={handleDownload}>
                    <FaDownload /> Download PDF
                  </button>
                  <button className="btn btn-secondary" onClick={handleGenerate}>
                    <FaSync /> Generate Another
                  </button>
                </div>
              </div>
            ) : (
              <div className="output-placeholder">
                <FaFilePdf className="placeholder-icon" />
                <p>Your AI-generated question paper will appear here</p>
                <p className="placeholder-sub">Select your preferences and click "Generate"</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .ai-generator {
          background-color: #fffff;
          margin-left:30px;
        }
        .container{
          padding:0px;
          margin:0px;
          width:100vw;
        }
        .generator-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 30px;
        }
        
        .generator-controls {
          padding: 30px;
        }
        
        .control-group {
          margin-bottom: 25px;
        }
        
        .control-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: var(--dark-color);
        }
        
        .dropdown select {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          background-color: white;
          cursor: pointer;
        }
        
        .difficulty-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .difficulty-btn {
          padding: 8px 15px;
          border: 1px solid #ddd;
          border-radius: 20px;
          background: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .difficulty-btn.active {
          background-color: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }
        
        .generate-btn {
          width: 100%;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .generator-output {
          padding: 30px;
        }
        
        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        
        .paper-info {
          display: flex;
          gap: 10px;
        }
        
        .paper-subject, .paper-difficulty {
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .paper-subject {
          background-color: rgba(67, 97, 238, 0.1);
          color: var(--primary-color);
        }
        
        .paper-difficulty {
          background-color: rgba(76, 201, 240, 0.1);
          color: var(--accent-color);
        }
        
        .paper-meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px dashed #ddd;
        }
        
        .questions-list {
          margin-bottom: 25px;
        }
        
        .questions-list ol {
          margin-left: 20px;
          margin-top: 10px;
        }
        
        .questions-list li {
          margin-bottom: 10px;
          padding-left: 10px;
        }
        
        .output-actions {
          display: flex;
          gap: 15px;
        }
        
        .output-placeholder {
          text-align: center;
          padding: 50px 20px;
          color: var(--gray-color);
        }
        
        .placeholder-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          color: #ddd;
        }
        
        .placeholder-sub {
          font-size: 0.9rem;
          margin-top: 5px;
        }
        
        @media (max-width: 1024px) {
          .generator-container {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }

        @media (max-width: 768px) {
          .generator-controls,
          .generator-output {
            padding: 25px 20px;
          }
          
          .output-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
          
          .paper-meta {
            flex-direction: column;
            gap: 10px;
            width: 100%;
          }
          
          .output-actions {
            flex-direction: column;
            width: 100%;
          }
          
          .output-actions .btn {
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .generator-controls,
          .generator-output {
            padding: 20px 15px;
          }
          
          .difficulty-buttons {
            flex-direction: column;
          }
          
          .difficulty-btn {
            width: 100%;
          }
          
          .paper-meta {
            flex-direction: column;
            gap: 10px;
          }
          
          .output-actions {
            flex-direction: column;
          }
          
          .placeholder-icon {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default AIGenerator;