import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import type { AuthSession } from '@/types/auth';

const authStorageKey = 'fps.auth.session';
const authCookieKey = 'fps_auth_session';

function syncWebCookie(session: AuthSession | null) {
  if (Platform.OS !== 'web' || typeof document === 'undefined') {
    return;
  }

  if (!session) {
    document.cookie = `${authCookieKey}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
    return;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${authCookieKey}=${encodeURIComponent(session.access)}; path=/; expires=${expiresAt}; SameSite=Lax`;
}

export async function getStoredSession() {
  const raw = await AsyncStorage.getItem(authStorageKey);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    await AsyncStorage.removeItem(authStorageKey);
    syncWebCookie(null);
    return null;
  }
}

export async function storeSession(session: AuthSession) {
  await AsyncStorage.setItem(authStorageKey, JSON.stringify(session));
  syncWebCookie(session);
}

export async function clearStoredSession() {
  await AsyncStorage.removeItem(authStorageKey);
  syncWebCookie(null);
}
