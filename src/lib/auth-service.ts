/**
 * Service to handle authentication concerns
 */

// Get the JWT token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

// Get the user data from localStorage
export const getUser = (): any => {
  const userData = localStorage.getItem('user');
  if (!userData) {
    console.log('No user data found in localStorage');
    return null;
  }
  
  try {
    const user = JSON.parse(userData);
    console.log('Retrieved user data from localStorage:', user);
    return user;
  } catch (e) {
    console.error('Failed to parse user data from localStorage:', e);
    return null;
  }
};

// Get the user ID from stored user data
export const getUserId = (): string | null => {
  const user = getUser();
  if (!user) return null;
  
  // Check different possible ID field names
  const userId = user.id || user._id || user.userId || null;
  console.log('Retrieved userId from user data:', userId);
  return userId;
};

// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Set token and user data in localStorage
export const setAuth = (token: string, userData: any): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
  
  // Dispatch auth change event for components that listen for it
  window.dispatchEvent(new Event('authChange'));
};

// Clear authentication data
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Dispatch auth change event
  window.dispatchEvent(new Event('authChange'));
};

export const authService = {
  getToken,
  getUser,
  getUserId,
  isAuthenticated,
  setAuth,
  logout
};
