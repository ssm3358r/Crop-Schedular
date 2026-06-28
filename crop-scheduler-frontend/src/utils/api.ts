import Constants from 'expo-constants';
import { Platform } from 'react-native';
import axios from 'axios';

const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

function getExpoHostApiUrl() {
  const hostUri =
    ((Constants.expoConfig as { hostUri?: string } | null)?.hostUri ??
      (Constants as unknown as { manifest2?: { extra?: { expoGo?: { debuggerHost?: string } } } }).manifest2?.extra
        ?.expoGo?.debuggerHost ??
      '')
      .split(':')[0]
      .trim();

  if (!hostUri) {
    return null;
  }

  return `http://${hostUri}:8000/api`;
}

function getDefaultApiUrl() {
  if (Platform.OS === 'android') {
    return getExpoHostApiUrl() || 'http://10.0.2.2:8000/api';
  }

  return getExpoHostApiUrl() || 'http://127.0.0.1:8000/api';
}

export const apiBaseUrl =
  configuredApiUrl ||
  Constants.expoConfig?.extra?.apiUrl ||
  getDefaultApiUrl();

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
  withCredentials: true,
});

export function setApiAccessToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
}
