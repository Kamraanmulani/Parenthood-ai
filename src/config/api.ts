const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/auth/login`,
    SIGNUP: `${API_URL}/auth/signup`,
  },
  USER: {
    PROFILE: `${API_URL}/user/profile`,
  },
  CHAT: {
    SESSIONS: `${API_URL}/chat/sessions`,
    MESSAGES: (sessionId: string) => `${API_URL}/chat/sessions/${sessionId}/messages`,
  }
} as const;