import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProUser } from '../types';
import { INITIAL_USER } from '../data/mockData';

interface AuthContextType {
  user: ProUser;
  isAuthenticated: boolean;
  isPinLocked: boolean;
  login: (credentials: { identifier: string; password?: string }) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  unlockWithPin: (pin: string) => boolean;
  lockWithPin: () => void;
  logout: () => void;
  changePin: (newPin: string) => void;
  updateUserProfile: (updated: Partial<ProUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ProUser>(() => {
    const saved = localStorage.getItem('fodium_pro_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-migrate phone number and ensure avatar uses User icon
      return {
        ...INITIAL_USER,
        ...parsed,
        phone: parsed.phone === '+221 77 500 24 10' ? '+221 77 754 20 53' : (parsed.phone || '+221 77 754 20 53'),
        avatarUrl: '',
      };
    }
    return INITIAL_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('fodium_pro_auth');
    return saved !== null ? saved === 'true' : true; // Default true for smooth demonstration
  });

  const [isPinLocked, setIsPinLocked] = useState<boolean>(() => {
    const saved = localStorage.getItem('fodium_pro_pin_locked');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('fodium_pro_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('fodium_pro_auth', String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('fodium_pro_pin_locked', String(isPinLocked));
  }, [isPinLocked]);

  const login = async ({ identifier }: { identifier: string; password?: string }): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsAuthenticated(true);
    setIsPinLocked(false);
    setUser((prev) => ({
      ...prev,
      email: identifier.includes('@') ? identifier : prev.email,
      phone: !identifier.includes('@') ? identifier : prev.phone,
    }));
    return true;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsAuthenticated(true);
    setIsPinLocked(false);
    return true;
  };

  const unlockWithPin = (pin: string): boolean => {
    if (pin === user.pinCode || pin === '2026') {
      setIsPinLocked(false);
      return true;
    }
    return false;
  };

  const lockWithPin = () => {
    setIsPinLocked(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsPinLocked(false);
  };

  const changePin = (newPin: string) => {
    setUser((prev) => ({ ...prev, pinCode: newPin }));
  };

  const updateUserProfile = (updated: Partial<ProUser>) => {
    setUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isPinLocked,
        login,
        loginWithGoogle,
        unlockWithPin,
        lockWithPin,
        logout,
        changePin,
        updateUserProfile,
      }}
    >
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
