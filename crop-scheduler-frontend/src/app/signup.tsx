import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AuthLogo } from '@/components/AuthLogo';
import { colors } from '@/constants/colors';

const loginRoute = '/login' as never;
const homeRoute = '/home' as never;

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function Field({
  label,
  placeholder,
  optional,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  placeholder: string;
  optional?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}) {
  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={[styles.label, styles.inlineLabel]}>{label}</Text>
        {optional ? <Text style={styles.optional}>optional</Text> : null}
      </View>
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor="#878B83"
        style={styles.input}
      />
    </View>
  );
}

function PasswordField({ label, placeholder }: { label: string; placeholder: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWithAction}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#878B83"
          secureTextEntry={!visible}
          style={styles.flexInput}
        />
        <Pressable onPress={() => setVisible((value) => !value)} hitSlop={10}>
          <Text style={styles.showText}>{visible ? 'Hide' : 'Show'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function SignupScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <AuthLogo size={86} />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Get our farming advice</Text>
          </View>

          <View style={styles.card}>
            <SectionTitle>Personal Info</SectionTitle>
            <Field label="Full Name" placeholder="Ravi Kumar" autoCapitalize="words" />
            <Field label="Phone Number" placeholder="+91 98765 43210" keyboardType="phone-pad" />
            <Field
              label="Email"
              placeholder="ravi@example.com"
              optional
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.divider} />

            <SectionTitle>Account</SectionTitle>
            <Field
              label="Username"
              placeholder="e.g. rajesh_nanded"
              autoCapitalize="none"
            />
            <PasswordField label="Password" placeholder="Min. 8 characters" />
            <PasswordField label="Confirm Password" placeholder="Re-enter password" />

            <View style={styles.divider} />

            <SectionTitle>Details</SectionTitle>
            <Field label="Region" placeholder="e.g. Nanded, Guntur" autoCapitalize="words" />
          </View>

          <Pressable style={styles.primaryButton} onPress={() => router.replace(homeRoute)}>
            <Text style={styles.primaryText}>Create Account</Text>
          </Pressable>

          <Pressable style={styles.altRow} onPress={() => router.push(loginRoute)}>
            <Text style={styles.altText}>Already have an account? </Text>
            <Text style={styles.altLink}>Sign In</Text>
          </Pressable>

          <Pressable style={styles.guestButton} onPress={() => router.replace(homeRoute)}>
            <Text style={styles.guestText}>Continue without login</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.09,
  shadowRadius: 15,
  elevation: 4,
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  content: {
    paddingBottom: 28,
    paddingHorizontal: 22,
    paddingTop: 8,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 28,
  },
  title: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 32,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    marginTop: 7,
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
  sectionTitle: {
    color: '#68746A',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.4,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  field: {
    marginTop: 18,
  },
  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  label: {
    color: '#5D675E',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 10,
  },
  inlineLabel: {
    marginBottom: 0,
  },
  optional: {
    backgroundColor: '#F0EDE7',
    borderRadius: 7,
    color: '#6E746B',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
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
  divider: {
    backgroundColor: '#E5E8E1',
    height: 1,
    marginBottom: 16,
    marginTop: 30,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    marginTop: 26,
    minHeight: 62,
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
    marginTop: 24,
    minHeight: 34,
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
    minHeight: 34,
  },
  guestText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0,
  },
});
