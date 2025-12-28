# Backend Server Setup

This backend server handles the AI question paper generation using Google's Gemini Flash API.

## Prerequisites

1. Node.js (v14 or higher)
2. npm or yarn
3. Gemini API Key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Installation

1. Install dependencies:
```bash
npm install express cors axios dotenv
```

2. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

3. Add your Gemini API key to `.env`:
```
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## Running the Server

The server file is located at `src/components/server.js`. You can run it in several ways:

### Option 1: Using Node directly
```bash
node src/components/server.js
```

### Option 2: Using nodemon (recommended for development)
```bash
npx nodemon src/components/server.js
```

### Option 3: Add to package.json scripts
Add this to your `package.json` scripts section:
```json
"scripts": {
  "server": "node src/components/server.js",
  "server:dev": "nodemon src/components/server.js"
}
```

Then run:
```bash
npm run server
```

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Generate Question Paper
- **POST** `/api/generate-paper`
- **Body:**
  ```json
  {
    "subject": "Computer Science",
    "examType": "Mid-term",
    "difficulty": "Medium"
  }
  ```
- **Response:** Returns Gemini API response with generated questions

## Testing

Test the server is running:
```bash
curl http://localhost:3001/health
```

Test question generation:
```bash
curl -X POST http://localhost:3001/api/generate-paper \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Mathematics",
    "examType": "Final Exam",
    "difficulty": "Hard"
  }'
```

## Notes

- The server runs on port 3001 by default
- Make sure your frontend is configured to call `http://localhost:3001/api/generate-paper`
- The server uses CORS to allow requests from the frontend
- The API key should be kept secure and not committed to version control

## Troubleshooting

1. **Port already in use**: Change the PORT in `.env` file
2. **CORS errors**: Make sure FRONTEND_URL matches your frontend URL
3. **API errors**: Verify your Gemini API key is correct and has sufficient quota
4. **Module errors**: Make sure all dependencies are installed with `npm install`

