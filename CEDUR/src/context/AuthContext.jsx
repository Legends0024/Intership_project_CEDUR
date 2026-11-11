import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'cedur_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Failed to load user session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    const fullName = userData.name || (userData.email ? userData.email.split('@')[0] : 'Admin User');
    const parts = fullName.trim().split(/\s+/);
    const initials = parts.length > 1
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : fullName.slice(0, 2).toUpperCase();

    const session = {
      name: fullName,
      email: userData.email || 'admin@company.com',
      company: userData.company || 'Cedur Enterprises Ltd',
      role: userData.role || 'Workspace Administrator',
      plan: userData.plan || 'Growth Plan',
      initials,
      loggedInAt: new Date().toISOString(),
    };

    setUser(session);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (err) {
      console.error('Failed to save user session:', err);
    }
    return session;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to clear user session:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
