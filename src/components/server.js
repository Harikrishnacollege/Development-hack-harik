// server.js - Updated with working Gemini 3.0 Flash model
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAjah9JmB0TuLFj5RuQGRfSBMKN_U5RJI0';

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Generate question paper endpoint - USING Gemini 3.0 Flash
app.post('/api/generate-paper', async (req, res) => {
  try {
    const { subject, examType, difficulty } = req.body;
    
    if (!subject || !examType || !difficulty) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }

    console.log('Generating paper for:', { subject, examType, difficulty });

    // Use Gemini 3.0 Flash Preview (from your available models)
    const MODEL_NAME = 'gemini-3-flash-preview';
    
    const prompt = `You are an expert educational content creator. Generate a ${difficulty} level ${examType} question paper for ${subject}.

Return ONLY a valid JSON object in this exact format (no markdown, no code blocks, no additional text):

{
  "title": "Descriptive title here",
  "subject": "${subject}",
  "difficulty": "${difficulty}",
  "instructions": "Clear instructions for students",
  "questions": [
    "Question 1 text",
    "Question 2 text", 
    "Question 3 text",
    "Question 4 text",
    "Question 5 text"
  ]
}

Requirements:
- Generate exactly 5 questions
- Questions should be ${difficulty} difficulty
- Questions should be suitable for ${examType}
- Make questions practical and answerable
- Instructions should be helpful and specific`;

    console.log(`Calling Gemini API with model: ${MODEL_NAME}`);
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    console.log('Gemini API response received');
    
    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log('No valid response from Gemini, using fallback');
      throw new Error('Invalid Gemini response');
    }

    const responseText = response.data.candidates[0].content.parts[0].text;
    console.log('Gemini raw response:', responseText.substring(0, 200) + '...');

    // Parse the JSON response
    let parsedData;
    try {
      // Extract JSON from response (remove any markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        parsedData = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError.message);
      console.log('Raw response was:', responseText);
      throw new Error('Failed to parse Gemini response');
    }

    // Validate the parsed data
    if (!parsedData.questions || !Array.isArray(parsedData.questions)) {
      parsedData.questions = [
        `1. Explain key concepts of ${subject}.`,
        `2. Solve a ${difficulty} level problem in ${subject}.`,
        `3. Discuss applications of ${subject}.`,
        `4. Analyze a case study in ${subject}.`,
        `5. Compare different approaches in ${subject}.`
      ];
    }

    res.json({
      success: true,
      source: 'gemini-3.0-flash',
      ...parsedData
    });

  } catch (error) {
    console.error('Error in /api/generate-paper:', error.message);
    
    // Fallback response
    const { subject, examType, difficulty } = req.body || {};
    
    res.json({
      success: true,
      source: 'fallback',
      title: `${subject || 'Subject'} ${examType || 'Exam'} - ${difficulty || 'Medium'} Level`,
      subject: subject || 'General',
      difficulty: difficulty || 'Medium',
      instructions: `Answer all ${difficulty || 'Medium'} level questions. Show your work where necessary.`,
      questions: [
        `1. What are the fundamental principles of ${subject || 'this subject'}?`,
        `2. How would you approach a ${difficulty || 'Medium'} level problem in ${subject || 'this field'}?`,
        `3. Discuss the practical applications of ${subject || 'this subject'}.`,
        `4. Compare different methodologies in ${subject || 'this field'}.`,
        `5. Analyze a real-world scenario using ${subject || 'this subject'} principles.`
      ]
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🔑 Gemini API Key: ${GEMINI_API_KEY.substring(0, 15)}...`);
  console.log(`🤖 Using model: gemini-3-flash-preview`);
});

export default app;