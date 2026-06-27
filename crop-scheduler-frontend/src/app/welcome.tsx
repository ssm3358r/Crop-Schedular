import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthLogo } from '@/components/AuthLogo';
import { colors } from '@/constants/colors';

const loginRoute = '/login' as never;
const signupRoute = '/signup' as never;
const homeRoute = '/home' as never;

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.hero}>
        <AuthLogo size={118} />
        <Text style={styles.title}>Farm Prosperity Solutions</Text>
        <Text style={styles.subtitle}>Smart farming solutions</Text>
        <View style={styles.rule} />
        <Text style={styles.tagline}>Grow smart. Harvest more.</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.primaryButton} onPress={() => router.push(signupRoute)}>
          <Text style={styles.primaryText}>Create Account</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => router.push(loginRoute)}>
          <Text style={styles.secondaryText}>I already have an account</Text>
        </Pressable>
        <Pressable style={styles.skipButton} onPress={() => router.replace(homeRoute)}>
          <Text style={styles.skipText}>Continue without login</Text>
        </Pressable>
        <Text style={styles.version}>Farm Prosperity Solutions · v2.0</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 24,
  },
  hero: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 18,
  },
  title: {
    color: colors.primary,
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 34,
    marginTop: 30,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 27,
    marginTop: 12,
    textAlign: 'center',
  },
  rule: {
    backgroundColor: '#D7D8D2',
    height: 1,
    marginTop: 32,
    width: 74,
  },
  tagline: {
    color: '#7A7D76',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    letterSpacing: 0,
    marginTop: 22,
    textAlign: 'center',
  },
  actions: {
    gap: 16,
    paddingBottom: 18,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    minHeight: 64,
    justifyContent: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: 0,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: colors.primary,
    borderRadius: 16,
    borderWidth: 2,
    minHeight: 64,
    justifyContent: 'center',
  },
  secondaryText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0,
    textAlign: 'center',
  },
  skipButton: {
    alignItems: 'center',
    minHeight: 34,
    justifyContent: 'center',
  },
  skipText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0,
  },
  version: {
    color: '#83857E',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    marginTop: 2,
    textAlign: 'center',
  },
});
