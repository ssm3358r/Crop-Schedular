import axios from 'axios';
import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/components/auth/AuthProvider';
import { AuthLogo } from '@/components/AuthLogo';
import { colors } from '@/constants/colors';

const signupRoute = '/signup' as never;
const homeRoute = '/home' as never;

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    if (typeof data === 'string') {
      return data;
    }

    if (data && typeof data === 'object') {
      const messages = Object.values(data)
        .flatMap((value) => (Array.isArray(value) ? value : [value]))
        .filter((value): value is string => typeof value === 'string');

      if (messages.length > 0) {
        return messages[0];
      }
    }
  }

  return 'Unable to sign in right now. Please try again.';
}

export default function LoginScreen() {
  const { isAuthenticated, isHydrating, login } = useAuth();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (isHydrating) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  async function handleLogin() {
    if (!phone.trim() || !password) {
      setErrorMessage('Please enter your phone number and password.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      await login({ phone: phone.trim(), password });
      router.replace(homeRoute);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}>
        <View style={styles.header}>
          <AuthLogo size={116} />
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="phone-pad"
            onChangeText={setPhone}
            placeholder="Enter your phone number"
            placeholderTextColor="#878B83"
            style={styles.input}
            value={phone}
          />

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWithAction}>
            <TextInput
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#878B83"
              secureTextEntry={!showPassword}
              style={styles.flexInput}
              value={password}
            />
            <Pressable onPress={() => setShowPassword((value) => !value)} hitSlop={10}>
              <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Pressable style={[styles.primaryButton, isSubmitting && styles.buttonDisabled]} onPress={handleLogin} disabled={isSubmitting}>
            <Text style={styles.primaryText}>{isSubmitting ? 'Signing In...' : 'Sign In'}</Text>
          </Pressable>
        </View>

        <Pressable style={styles.altRow} onPress={() => router.push(signupRoute)}>
          <Text style={styles.altText}>Don&apos;t have an account? </Text>
          <Text style={styles.altLink}>Create one</Text>
        </Pressable>

        <Pressable style={styles.guestButton} onPress={() => router.replace(homeRoute)}>
          <Text style={styles.guestText}>Continue without login</Text>
        </Pressable>

        <Text style={styles.version}>Farm Prosperity Solutions | v2.0</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 18,
  elevation: 5,
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 34,
  },
  title: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 38,
    marginTop: 28,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    padding: 20,
    ...shadow,
  },
  label: {
    color: '#5D675E',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 10,
    marginTop: 18,
  },
  input: {
    borderColor: '#D9DDD4',
    borderRadius: 15,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    minHeight: 58,
    paddingHorizontal: 16,
  },
  inputWithAction: {
    alignItems: 'center',
    borderColor: '#D9DDD4',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 58,
    paddingHorizontal: 16,
  },
  flexInput: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    minHeight: 56,
  },
  showText: {
    color: '#5D675E',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  errorText: {
    color: '#B42318',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 14,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    marginTop: 28,
    minHeight: 62,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  altRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    minHeight: 36,
  },
  altText: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
  },
  altLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  guestButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 36,
  },
  guestText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0,
  },
  version: {
    color: '#83857E',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    marginTop: 26,
    textAlign: 'center',
  },
});
