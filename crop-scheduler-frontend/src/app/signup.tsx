import axios from 'axios';
import { Redirect, router } from 'expo-router';
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

import { useAuth } from '@/components/auth/AuthProvider';
import { AuthLogo } from '@/components/AuthLogo';
import { colors } from '@/constants/colors';

const loginRoute = '/login' as never;
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

  return 'Unable to create your account right now. Please try again.';
}

function Field({
  label,
  placeholder,
  value,
  onChangeText,
  optional,
  keyboardType,
  autoCapitalize,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  optional?: boolean;
  keyboardType?: 'default' | 'phone-pad' | 'numeric';
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
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#878B83"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

function PasswordField({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWithAction}>
        <TextInput
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#878B83"
          secureTextEntry={!visible}
          style={styles.flexInput}
          value={value}
        />
        <Pressable onPress={() => setVisible((currentValue) => !currentValue)} hitSlop={10}>
          <Text style={styles.showText}>{visible ? 'Hide' : 'Show'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export default function SignupScreen() {
  const { isAuthenticated, isHydrating, signup } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [area, setArea] = useState('');
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');
  const [village, setVillage] = useState('');
  const [landArea, setLandArea] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (isHydrating) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  async function handleSignup() {
    if (!name.trim() || !phone.trim() || !password) {
      setErrorMessage('Name, phone number, and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password and confirm password must match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');
      await signup({
        name: name.trim(),
        phone: phone.trim(),
        password,
        area: area.trim() || undefined,
        state: stateName.trim() || undefined,
        district: district.trim() || undefined,
        village: village.trim() || undefined,
        land_area: landArea.trim() || undefined,
      });
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
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <AuthLogo size={86} />
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Create your farmer account</Text>
          </View>

          <View style={styles.card}>
            <SectionTitle>Personal Info</SectionTitle>
            <Field label="Full Name" placeholder="Ravi Kumar" value={name} onChangeText={setName} autoCapitalize="words" />
            <Field label="Phone Number" placeholder="9876543210" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

            <View style={styles.divider} />

            <SectionTitle>Account</SectionTitle>
            <PasswordField label="Password" placeholder="Min. 6 characters" value={password} onChangeText={setPassword} />
            <PasswordField label="Confirm Password" placeholder="Re-enter password" value={confirmPassword} onChangeText={setConfirmPassword} />

            <View style={styles.divider} />

            <SectionTitle>Farm Details</SectionTitle>
            <Field label="Area" placeholder="e.g. 12 acres" value={area} onChangeText={setArea} optional autoCapitalize="words" />
            <Field label="State" placeholder="Telangana" value={stateName} onChangeText={setStateName} optional autoCapitalize="words" />
            <Field label="District" placeholder="Warangal" value={district} onChangeText={setDistrict} optional autoCapitalize="words" />
            <Field label="Village" placeholder="Your village" value={village} onChangeText={setVillage} optional autoCapitalize="words" />
            <Field label="Land Area" placeholder="2.5" value={landArea} onChangeText={setLandArea} optional keyboardType="numeric" />

            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>

          <Pressable style={[styles.primaryButton, isSubmitting && styles.buttonDisabled]} onPress={handleSignup} disabled={isSubmitting}>
            <Text style={styles.primaryText}>{isSubmitting ? 'Creating Account...' : 'Create Account'}</Text>
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
  errorText: {
    color: '#B42318',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 18,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    marginTop: 26,
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
