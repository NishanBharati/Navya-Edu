import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import * as auth from '../lib/auth';

interface LoginResult {
  ok: boolean;
  error?: string;
}

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  account: auth.AdminAccount | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthState | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<auth.AdminAccount | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      setIsAuthenticated(!!user);
      setAccount(user ? { name: 'Admin', email: user.email ?? '' } : null);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      setIsAuthenticated(!!user);
      setAccount(user ? { name: 'Admin', email: user.email ?? '' } : null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<LoginResult> => {
    return auth.signIn(email, password);
  }, []);

  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, account, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth(): AdminAuthState {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return ctx;
}
