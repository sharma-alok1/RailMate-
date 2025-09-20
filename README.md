# 🚂 RailMate AI - Intelligent Indian Railways Assistant

RailMate AI is a sophisticated web-based chatbot that uses real OpenAI GPT integration to provide intelligent assistance for Indian Railways queries.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- Google Gemini API key

### Setup
1. **Backend Setup**
```bash
cd backend
npm install
cp env.template .env
# Edit .env with your Gemini API key
npm run dev
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## ✨ Features
- Real Google Gemini AI integration
- Train search, availability, fares
- Modern glassmorphism UI
- Responsive design
- Conversation memory

## 🔧 Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

## 🎯 Test Queries
- "Train from Delhi to Mumbai tomorrow"
- "Check 2AC availability for Rajdhani Express"
- "What's the fare from Chennai to Bangalore in sleeper class?"
- "Station code for New Delhi"
