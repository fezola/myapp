import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  avatar: string;
  walletAddress: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (walletAddress: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (walletAddress: string) => {
    // In a real app, you would verify the wallet address with your backend
    // and fetch the user data. For now, we'll use mock data.
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      walletAddress,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      isAuthenticated: !!user,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};