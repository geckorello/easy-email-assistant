
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the structure of a user
interface User {
  id: string;
  email: string;
  name?: string;
  industry?: string;
  photoUrl?: string; // Added photoUrl property
}

// Define the structure of the AuthContext
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticating: boolean;
  isAuthenticated: boolean; // Added isAuthenticated property
  login: (email: string, password: string) => Promise<void>;
  loginWithOutlook: () => Promise<void>; // Added loginWithOutlook method
  logout: () => void;
  handleAuthCallback: (code: string) => Promise<void>; // Added handleAuthCallback method
  updateUserOnOnBoarding: (email: string, name: string, industry: string) => Promise<void>; // Added updateUserOnOnBoarding method
}

// Create the AuthContext with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsAuthenticating(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const fakeUser = {
      id: '1',
      email: email,
      name: 'Test User',
      industry: 'generic'
    };

    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setIsAuthenticating(false);
  };

  // Added loginWithOutlook implementation
  const loginWithOutlook = async () => {
    setIsAuthenticating(true);
    // Simulate redirect to Outlook login page
    console.log('Redirecting to Outlook login...');
    // This would normally redirect to Outlook OAuth login
    await new Promise((resolve) => setTimeout(resolve, 500));
    // For demo purposes, we'll just simulate the login with a fake user
    const fakeUser = {
      id: '2',
      email: 'outlook.user@example.com',
      name: 'Outlook User',
      industry: 'generic',
      photoUrl: '/placeholder.svg'
    };
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setIsAuthenticating(false);
  };

  // Added handleAuthCallback implementation
  const handleAuthCallback = async (code: string) => {
    setIsAuthenticating(true);
    // This would normally exchange the code for tokens
    console.log('Processing authentication callback with code:', code);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const fakeUser = {
      id: '3',
      email: 'auth.callback@example.com',
      name: 'Auth Callback User',
      industry: 'generic',
      photoUrl: '/placeholder.svg'
    };
    
    setUser(fakeUser);
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setIsAuthenticating(false);
  };

  // Added updateUserOnOnBoarding implementation
  const updateUserOnOnBoarding = async (email: string, name: string, industry: string) => {
    setIsAuthenticating(true);
    // This would normally update the user on the server
    console.log('Updating user onboarding info:', { email, name, industry });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Update the current user with the new information
    const updatedUser = {
      ...(user || { id: '4' }),
      email,
      name,
      industry,
      photoUrl: user?.photoUrl || '/placeholder.svg'
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsAuthenticating(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticating,
    isAuthenticated: !!user, // Computed property based on user existence
    login,
    loginWithOutlook,
    logout,
    handleAuthCallback,
    updateUserOnOnBoarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
