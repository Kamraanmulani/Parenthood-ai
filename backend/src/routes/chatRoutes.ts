import express from 'express';
import { auth } from '../middleware/auth';
import { 
  getChatSessions, 
  getChatSessionById, 
  createChatSession, 
  addMessage,
  deleteChatSession,
  updateChatSessionTitle
} from '../controllers/chatController';

const router = express.Router();

// Get all chat sessions for the authenticated user
router.get('/sessions', auth, getChatSessions);

// Get a specific chat session by ID
router.get('/sessions/:sessionId', auth, getChatSessionById);

// Create a new chat session
router.post('/sessions', auth, createChatSession);

// Update a chat session title
router.patch('/sessions/:sessionId/title', auth, updateChatSessionTitle);

// Add a message to a chat session
router.post('/sessions/:sessionId/messages', auth, addMessage);

// Delete a chat session
router.delete('/sessions/:sessionId', auth, deleteChatSession);

export default router;
