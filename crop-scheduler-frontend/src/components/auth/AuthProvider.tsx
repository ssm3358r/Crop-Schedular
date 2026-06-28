import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import type { AuthSession, FarmerLoginPayload, FarmerSignupPayload } from '@/types/auth';
import { api, setApiAccessToken } from '@/utils/api';
import { clearStoredSession, getStoredSession, storeSession } from '@/utils/auth-storage';

type AuthContextValue = {
  isAuthenticated: boolean;
  isHydrating: boolean;
  session: AuthSession | null;
  login: (payload: FarmerLoginPayload) => Promise<AuthSession>;
  signup: (payload: FarmerSignupPayload) => Promise<AuthSession>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isHydrating, setIsHydrating] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function hydrateSession() {
      try {
        const storedSession = await getStoredSession();

        if (!isMounted) {
          return;
        }

        setSession(storedSession);
        setApiAccessToken(storedSession?.access ?? null);
      } finally {
        if (isMounted) {
          setIsHydrating(false);
        }
      }
    }

    hydrateSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function persistSession(nextSession: AuthSession) {
    setSession(nextSession);
    setApiAccessToken(nextSession.access);
    await storeSession(nextSession);
    return nextSession;
  }

  async function login(payload: FarmerLoginPayload) {
    const response = await api.post<AuthSession>('/auth/farmers/login/', payload);
    return persistSession(response.data);
  }

  async function signup(payload: FarmerSignupPayload) {
    const response = await api.post<AuthSession>('/auth/farmers/signup/', payload);
    return persistSession(response.data);
  }

  async function logout() {
    setSession(null);
    setApiAccessToken(null);
    await clearStoredSession();
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: Boolean(session?.access),
        isHydrating,
        session,
        login,
        signup,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
