import { createContext, useContext, useState, useEffect } from 'react';
import { signUp, signIn } from '../api/vinylVaultApi'; // <-- Import the new API functions

// 1. Create the Context
const AuthContext = createContext();

// 2. Auth Provider Component
export const AuthProvider = ({ children }) => {
  // State to hold the token and user data
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state for initial check
  
  // NOTE: For this simple app, we rely on the username being passed during login
  // or stored in local storage for re-hydration.
  const getUserDataFromToken = (token) => {
    // In a real app, you would securely decode the token or call a /profile endpoint.
    // For now, we assume a username is stored in local storage for persistence.
    const username = localStorage.getItem('username');
    return username ? { username } : null; 
  };
  
  // --- Helper to save state after successful login/signup ---
  const handleAuthSuccess = (newToken, username) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('username', username);
    setToken(newToken);
    setUser({ username }); 
  };
  
  // --- Core Authentication Functions using the API Service ---
  
  const handleAuth = async (credentials, type) => {
    setIsLoading(true);
    try {
      let newToken;
      const { username, password } = credentials;

      if (type === 'signIn') {
        newToken = await signIn({ username, password });
      } else { // type === 'signUp'
        newToken = await signUp({ username, password });
      }
      
      handleAuthSuccess(newToken, username);
      return true; // Success
    } catch (error) {
      console.error(`${type} failed:`, error.message);
      // Optional: Clear token if it was invalid or expired during a silent refresh attempt
      // localStorage.removeItem('token'); 
      // setToken(null);
      return false; // Failure
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
  };
  
  // Effect to handle initial token check and state hydration
  useEffect(() => {
    if (token) {
      const storedUser = getUserDataFromToken(token);
      if (storedUser) {
        setUser(storedUser);
      } else {
        // If token exists but user data doesn't, clear the token (expired/corrupt)
        signOut();
      }
    }
    setIsLoading(false);
  }, [token]);

  // 3. Provide the state and functions to consumers
  const contextValue = {
    token,
    user,
    isAuthenticated: !!token,
    isLoading,
    signIn: (credentials) => handleAuth(credentials, 'signIn'),
    signUp: (credentials) => handleAuth(credentials, 'signUp'),
    signOut
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// 4. Custom Hook for easy consumption
export const useAuth = () => useContext(AuthContext);