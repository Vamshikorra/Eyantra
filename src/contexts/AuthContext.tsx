import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const rolePermissions: Record<UserRole, string[]> = {
  admin: ['all'],
  secretary: ['post_create', 'post_moderate', 'event_create', 'gallery_upload', 'member_view', 'comment_moderate'],
  joint_secretary: ['post_create', 'event_create', 'gallery_upload', 'member_view', 'comment_moderate'],
  volunteer: ['post_propose', 'comment_create', 'gallery_view'],
  executive: ['post_propose', 'comment_create', 'comment_moderate', 'gallery_view', 'resource_manage'],
  student: ['comment_create', 'gallery_view', 'event_view']
};

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@student.nitandhra.ac.in',
    role: 'admin',
    batch: '2022',
    joinedAt: new Date(),
    isActive: true
  },
  {
    id: '2',
    name: 'Secretary',
    email: 'secretary@student.nitandhra.ac.in',
    role: 'secretary',
    batch: '2021',
    joinedAt: new Date(),
    isActive: true
  },
  {
    id: '3',
    name: 'Student User',
    email: 'student@student.nitandhra.ac.in',
    role: 'student',
    batch: '2023',
    joinedAt: new Date(),
    isActive: true
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const validateEmail = (email: string): boolean => {
    return email.endsWith('@student.nitandhra.ac.in');
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!validateEmail(email)) {
      return false;
    }

    // Mock authentication - in real app, this would be API call
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    const userPermissions = rolePermissions[user.role];
    return userPermissions.includes('all') || userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};