import React, { useState } from 'react';
import { FaRobot, FaFilePdf, FaDownload, FaSync } from 'react-icons/fa';
import '../Styles/AIGenerator.css';
import Header from './Header';

const AIGenerator = () => {
  const [subject, setSubject] = useState('Computer Science');
  const [examType, setExamType] = useState('Mid-term');
  const [difficulty, setDifficulty] = useState('Medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const [error, setError] = useState(null);

  const subjects = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Business Studies'];
  const examTypes = ['Mid-term', 'Final Exam', 'Quiz', 'Entrance Test', 'Competitive Exam'];
  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Advanced'];

  const generateWithBackend = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/generate-paper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          examType,
          difficulty
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      // NEW LOGIC: Check for the current backend response structure
      console.log('Backend response structure:', Object.keys(data));
      
      if (data.success) {
        // Backend returns: {success: true, title: "...", subject: "...", questions: [...]}
        const paper = {
          id: Date.now(),
          title: data.title || `${subject} ${examType} Paper`,
          subject: data.subject || subject,
          difficulty: data.difficulty || difficulty,
          questions: Array.isArray(data.questions) ? data.questions : generateFallbackQuestions(),
          instructions: data.instructions || 'Answer all questions. Show your work where necessary.',
          generatedAt: new Date().toLocaleString(),
          isFallback: false,
          source: data.source || 'backend'
        };
        
        setGeneratedPaper(paper);
        setError(null);
        return;
      }
      
      // OLD STRUCTURE (for backward compatibility)
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        let generatedText = '';
        if (data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
          generatedText = data.candidates[0].content.parts[0].text || '';
        }
        
        if (generatedText) {
          try {
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            const jsonString = jsonMatch ? jsonMatch[0] : generatedText;
            const parsedData = JSON.parse(jsonString);
            
            const paper = {
              id: Date.now(),
              title: parsedData.title || `${subject} ${examType} Paper`,
              subject: parsedData.subject || subject,
              difficulty: parsedData.difficulty || difficulty,
              questions: Array.isArray(parsedData.questions) ? parsedData.questions : generateFallbackQuestions(),
              instructions: parsedData.instructions || 'Answer all questions. Show your work where necessary.',
              generatedAt: new Date().toLocaleString(),
              isFallback: false
            };
            
            setGeneratedPaper(paper);
            setError(null);
            return;
          } catch (parseError) {
            console.error('Parse error:', parseError);
          }
        }
      }
      
      // If we get here, no valid structure found
      throw new Error('No valid response from API');
      
    } catch (err) {
      console.error('Error calling backend:', err);
      setError(`Failed to generate paper: ${err.message}. Using fallback generation.`);
      generateFallbackPaper();
    }
  };

  const generateFallbackQuestions = () => {
    const fallbackQuestions = {
      'Computer Science': [
        "Explain the concept of recursion with an example.",
        "Differentiate between procedural and object-oriented programming.",
        "Write an algorithm for binary search.",
        "What is time complexity? Calculate for bubble sort.",
        "Explain the client-server architecture with a diagram."
      ],
      'Mathematics': [
        "Solve the quadratic equation: x² - 5x + 6 = 0",
        "Differentiate between mean, median and mode.",
        "Prove that the sum of angles in a triangle is 180 degrees.",
        "Calculate the derivative of f(x) = sin(x) + cos(x)",
        "Explain the concept of limits with an example."
      ],
      'Physics': [
        "State Newton's laws of motion with examples.",
        "Explain the difference between speed and velocity.",
        "Calculate the work done when a 5kg object is lifted 2m high.",
        "Describe the photoelectric effect.",
        "What is Ohm's law? Derive the formula."
      ],
      'Chemistry': [
        "Define mole concept with examples.",
        "Differentiate between ionic and covalent bonds.",
        "Write the electronic configuration of carbon atom.",
        "Explain the process of electrolysis.",
        "Balance the chemical equation: H2 + O2 → H2O"
      ],
      'Biology': [
        "Explain the process of photosynthesis.",
        "Differentiate between mitosis and meiosis.",
        "Describe the human digestive system.",
        "What is DNA replication? Explain the process.",
        "Explain the structure and function of cell membrane."
      ],
      'Business Studies': [
        "Explain the functions of management.",
        "Differentiate between goods and services.",
        "What is SWOT analysis? Provide an example.",
        "Explain the concept of supply and demand.",
        "Describe the marketing mix (4Ps)."
      ]
    };
    
    return fallbackQuestions[subject] || fallbackQuestions['Computer Science'];
  };

  const generateFallbackPaper = () => {
    const samplePaper = {
      id: Date.now(),
      title: `${subject} ${examType} Paper`,
      difficulty: difficulty,
      questions: generateFallbackQuestions(),
      instructions: 'Answer all questions. Write your answers in the space provided.',
      generatedAt: new Date().toLocaleString(),
      isFallback: true
    };
    
    setGeneratedPaper(samplePaper);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      await generateWithBackend();
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedPaper) return;
    
    const content = `
      ${generatedPaper.title}
      Subject: ${subject}
      Difficulty: ${difficulty}
      Exam Type: ${examType}
      Generated: ${generatedPaper.generatedAt}
      
      ${generatedPaper.instructions}
      
      Questions:
      ${generatedPaper.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${subject.replace(/\s+/g, '_')}_${examType.replace(/\s+/g, '_')}_Paper.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Question paper downloaded as text file!');
  };

  return (
    <section id="ai-generator" className="ai-generator">
      <Header />
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
            
            {error && (
              <div className="error-message">
                <p>⚠️ {error}</p>
              </div>
            )}
            
            {generatedPaper ? (
              <div className="paper-content">
                <div className="paper-meta">
                  <p><strong>Exam Type:</strong> {examType}</p>
                  <p><strong>Generated:</strong> {generatedPaper.generatedAt}</p>
                  {generatedPaper.isFallback && (
                    <p className="fallback-notice">⚠️ Using fallback generation (no backend connection)</p>
                  )}
                </div>
                
                <div className="paper-instructions">
                  <h4>Instructions:</h4>
                  <p>{generatedPaper.instructions}</p>
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
                    <FaDownload /> Download Paper
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
                <p className="placeholder-hint">
                  <small>Currently using fallback questions. Enable backend for real AI generation.</small>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIGenerator;