const express = require('express');
const ChatController = require('../controllers/chatController');

const router = express.Router();

// Initialize a new conversation
router.post('/initialize', ChatController.initializeConversation);

// Process user message and get AI response
router.post('/message', ChatController.processMessage);

// Get conversation history
router.get('/history/:sessionId', ChatController.getConversationHistory);

// Clear conversation
router.delete('/clear/:sessionId', ChatController.clearConversation);

module.exports = router;
