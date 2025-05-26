import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';
import { Message } from '../components/chat/MessageList';
import { IUserProfile } from '../../backend/src/models/UserProfile';
import { UserProfile } from '@/types/user';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

interface ChatSession {
  _id: string;
  title: string;
  collectionName: string;
  createdAt: string;
  updatedAt: string;
}

class MongoDBService {
  private token: string | null = null;
  private profileCache: UserProfile | null = null;
  private profileCacheExpiry: number | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  private getHeaders() {
    if (!this.token) {
      console.warn("No authentication token available when creating headers");
      // Try to get token from localStorage as a fallback
      const token = localStorage.getItem('token');
      if (token) {
        console.log("Retrieved token from localStorage");
        this.token = token;
      }
    }
    
    return {
      'Content-Type': 'application/json',
      'Authorization': this.token ? `Bearer ${this.token}` : ''
    };
  }async getChatSessions(): Promise<ChatSession[]> {
    try {
      console.log("Fetching chat sessions with token:", this.token ? "Present" : "Missing");
      
      const response = await axios.get(`${API_URL}/chat/sessions`, {
        headers: this.getHeaders()
      });
      
      console.log("Chat sessions response:", response.status);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat sessions:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      return [];
    }
  }

  async getChatSessionById(sessionId: string): Promise<any> {
    try {
      const response = await axios.get(`${API_URL}/chat/sessions/${sessionId}`, {
        headers: this.getHeaders()
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching chat session ${sessionId}:`, error);
      throw error;
    }
  }  async createChatSession(title: string): Promise<ChatSession> {
    try {
      console.log("Creating chat session with token:", this.token ? "Present" : "Missing");
      
      if (!this.token) {
        console.error("Cannot create chat session without authentication token");
        throw new Error("Authentication required");
      }
      
      const response = await axios.post(`${API_URL}/chat/sessions`, 
        { title },
        { headers: this.getHeaders() }
      );
      
      console.log("Create session response:", response.status);
      return response.data;
    } catch (error) {
      console.error('Error creating chat session:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      throw error;
    }
  }

  async addMessage(sessionId: string, message: Omit<Message, 'id'>): Promise<Message> {
    try {
      const response = await axios.post(
        `${API_URL}/chat/sessions/${sessionId}/messages`,
        {
          content: message.content,
          sender: message.sender
        },
        { headers: this.getHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error(`Error adding message to session ${sessionId}:`, error);
      throw error;
    }
  }

  async deleteChatSession(sessionId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/chat/sessions/${sessionId}`, {
        headers: this.getHeaders()
      });
    } catch (error) {
      console.error(`Error deleting chat session ${sessionId}:`, error);
      throw error;
    }
  }

  async updateChatSessionTitle(sessionId: string, title: string): Promise<any> {
    try {
      if (!this.token) {
        console.error("Cannot update chat session without authentication token");
        throw new Error("Authentication required");
      }
      
      const response = await axios.patch(
        `${API_URL}/chat/sessions/${sessionId}/title`,
        { title },
        { headers: this.getHeaders() }
      );
      
      return response.data;
    } catch (error) {
      console.error(`Error updating chat session title for ${sessionId}:`, error);
      throw error;
    }
  }

  async getProfile(): Promise<UserProfile | null> {
    try {
      // Return cached profile if it's still valid
      if (this.profileCache && this.profileCacheExpiry && Date.now() < this.profileCacheExpiry) {
        return this.profileCache;
      }

      if (!this.token) {
        console.warn('No auth token available for profile fetch');
        return null;
      }

      const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update cache
      this.profileCache = data.profile;
      this.profileCacheExpiry = Date.now() + this.CACHE_DURATION;
      
      return data.profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Return cached profile as fallback if available
      return this.profileCache;
    }
  }

  // Clear profile cache when user logs out or token changes
  clearProfileCache() {
    this.profileCache = null;
    this.profileCacheExpiry = null;
  }

  setToken(token: string | null) {
    this.token = token;
    // Clear profile cache when token changes
    this.clearProfileCache();
  }
}

export const mongoDBService = new MongoDBService();
