import { Request, Response } from 'express';
import { ChatSession } from '../models/ChatHistory';
import mongoose from 'mongoose';

// Get all chat sessions for a user
export const getChatSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const sessions = await ChatSession.find({ userId })
      .select('_id title createdAt updatedAt')
      .sort({ updatedAt: -1 });
    
    res.status(200).json(sessions);
  } catch (error) {
    console.error('Error getting chat sessions:', error);
    res.status(500).json({ message: 'Failed to get chat sessions' });
  }
};

// Get a chat session by ID
export const getChatSessionById = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: 'Invalid session ID' });
    }

    const session = await ChatSession.findOne({ 
      _id: sessionId,
      userId 
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    res.status(200).json(session);
  } catch (error) {
    console.error('Error getting chat session:', error);
    res.status(500).json({ message: 'Failed to get chat session' });
  }
};

// Create a new chat session
export const createChatSession = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const userId = req.user.id;
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    // Generate a unique collection name for this chat session with Qdrant
    const collectionName = `chat_${userId}_${Date.now()}`;
    
    const newSession = new ChatSession({
      title,
      userId,
      collectionName,
      messages: []
    });
    
    await newSession.save();
    
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error creating chat session:', error);
    res.status(500).json({ message: 'Failed to create chat session' });
  }
};

// Add a message to a chat session
export const addMessage = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { content, sender } = req.body;
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: 'Invalid session ID' });
    }
    
    if (!content || !sender) {
      return res.status(400).json({ message: 'Content and sender are required' });
    }
    
    const session = await ChatSession.findOne({ 
      _id: sessionId,
      userId 
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    const message = {
      content,
      sender,
      timestamp: new Date()
    };
    
    session.messages.push(message);
    session.updatedAt = new Date();
    await session.save();
    
    res.status(201).json(message);
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ message: 'Failed to add message' });
  }
};

// Delete a chat session
export const deleteChatSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: 'Invalid session ID' });
    }
    
    const session = await ChatSession.findOneAndDelete({ 
      _id: sessionId,
      userId 
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    // Note: The deletion of the associated Qdrant collection should be handled separately
    
    res.status(200).json({ message: 'Chat session deleted' });
  } catch (error) {
    console.error('Error deleting chat session:', error);
    res.status(500).json({ message: 'Failed to delete chat session' });
  }
};

// Update a chat session title
export const updateChatSessionTitle = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { title } = req.body;
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: 'Invalid session ID' });
    }
    
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    
    const session = await ChatSession.findOne({ 
      _id: sessionId,
      userId 
    });
    
    if (!session) {
      return res.status(404).json({ message: 'Chat session not found' });
    }
    
    session.title = title;
    session.updatedAt = new Date();
    await session.save();
    
    res.status(200).json(session);
  } catch (error) {
    console.error('Error updating chat session title:', error);
    res.status(500).json({ message: 'Failed to update chat session title' });
  }
};
