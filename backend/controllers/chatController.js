const { GoogleGenerativeAI } = require('@google/generative-ai');
const { v4: uuidv4 } = require('uuid');

// Initialize Google Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// In-memory storage for conversation sessions
const conversationSessions = new Map();

// System prompt for the AI
const SYSTEM_PROMPT = `You are RailMate AI, an intelligent Indian Railways assistant. You help users with:

1. Train searches between stations
2. Seat availability checks
3. Fare information
4. Station details and codes
5. Train schedules and running days

When users ask for specific railway information, respond naturally and helpfully. If they need data like train schedules, availability, or fares, you can mention that you can provide that information.

Be conversational, helpful, and knowledgeable about Indian Railways. Use emojis occasionally to make responses friendly.

Current date: ${new Date().toLocaleDateString('en-IN')}`;

/**
 * Initialize a new conversation session
 */
const initializeConversation = async (req, res) => {
  try {
    const sessionId = uuidv4();
    
    // Initialize session with system prompt
    conversationSessions.set(sessionId, {
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'assistant',
          content: "Hello! I'm RailMate AI, your intelligent Indian Railways assistant. I can help you with train searches, seat availability, fare information, station details, and more. How can I assist you today? 🚂"
        }
      ],
      createdAt: new Date(),
      lastActivity: new Date()
    });

    res.json({
      success: true,
      sessionId,
      message: 'Conversation initialized successfully'
    });
  } catch (error) {
    console.error('Error initializing conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initialize conversation'
    });
  }
};

/**
 * Process user message and generate AI response
 */
const processMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({
        success: false,
        error: 'Session ID and message are required'
      });
    }

    // Get or create session
    let session = conversationSessions.get(sessionId);
    if (!session) {
      session = {
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          }
        ],
        createdAt: new Date(),
        lastActivity: new Date()
      };
      conversationSessions.set(sessionId, session);
    }

    // Add user message to session
    session.messages.push({
      role: 'user',
      content: message
    });

    // Update last activity
    session.lastActivity = new Date();

    try {
      // Get Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      // Convert messages to Gemini format
      const chat = model.startChat({
        history: session.messages.slice(0, -1).map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }))
      });
      
      // Send message to Gemini
      const result = await chat.sendMessage(message);
      const aiResponse = result.response.text();
      console.log('Gemini response:', aiResponse); // Debug log

      // Add AI response to session
      session.messages.push({
        role: 'assistant',
        content: aiResponse
      });

      // Keeping only last 20 messages to prevent context overflow
      if (session.messages.length > 20) {
        session.messages = [
          session.messages[0], // Keep system prompt
          ...session.messages.slice(-19) // Keep last 19 messages
        ];
      }

      console.log('Sending response to frontend:', { success: true, response: aiResponse, sessionId }); // Debug log
      res.json({
        success: true,
        response: aiResponse,
        sessionId
      });

    } catch (geminiError) {
      console.error('Gemini API error:', geminiError);
      
      // Fallback response when Gemini fails
      const fallbackResponse = "I apologize, but I'm experiencing some technical difficulties right now. Please try again in a moment, or you can ask me about train information, schedules, or station details. 🚂";
      
      // Add fallback response to session
      session.messages.push({
        role: 'assistant',
        content: fallbackResponse
      });

      res.json({
        success: true,
        response: fallbackResponse,
        sessionId,
        warning: 'Using fallback response due to Gemini API issues'
      });
    }

  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message'
    });
  }
};

/**
 * Get conversation history for a session
 */
const getConversationHistory = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    const session = conversationSessions.get(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: 'Session not found'
      });
    }

    // Return messages excluding system prompt
    const userMessages = session.messages.filter(msg => msg.role !== 'system');

    res.json({
      success: true,
      messages: userMessages,
      sessionId
    });

  } catch (error) {
    console.error('Error getting conversation history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get conversation history'
    });
  }
};

/**
 * Clearing conversation for a session
 */
const clearConversation = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        error: 'Session ID is required'
      });
    }

    const session = conversationSessions.get(sessionId);
    if (session) {
      // Reset to initial state
      session.messages = [
        {
          role: 'system',
          content: SYSTEM_PROMPT
        },
        {
          role: 'assistant',
          content: "Hello! I'm RailMate AI, your intelligent Indian Railways assistant. I can help you with train searches, seat availability, fare information, station details, and more. How can I assist you today? 🚂"
        }
      ];
      session.lastActivity = new Date();
    }

    res.json({
      success: true,
      message: 'Conversation cleared successfully',
      sessionId
    });

  } catch (error) {
    console.error('Error clearing conversation:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to clear conversation'
    });
  }
};

/**
 * Cleaning up old sessions-periodically
 */
const cleanupOldSessions = () => {
  const now = new Date();
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours

  for (const [sessionId, session] of conversationSessions.entries()) {
    if (now - session.lastActivity > maxAge) {
      conversationSessions.delete(sessionId);
    }
  }
};

// Clean up old sessions every hour
setInterval(cleanupOldSessions, 60 * 60 * 1000);

module.exports = {
  initializeConversation,
  processMessage,
  getConversationHistory,
  clearConversation
};
