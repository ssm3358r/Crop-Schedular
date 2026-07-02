import Constants from 'expo-constants';
import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import type { ReactNode } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/components/auth/AuthProvider';
import type { AuthUser } from '@/types/auth';

const lightPalette = {
  primary: '#184D2F',
  secondary: '#2E7D32',
  accent: '#8BC34A',
  background: '#F7F8F3',
  card: '#FFFFFF',
  border: '#E5E7EB',
  text: '#1F2937',
  muted: '#6B7280',
  softGreen: '#EAF5E8',
  red: '#DC2626',
  redSoft: '#FEF2F2',
  shadow: '#184D2F',
};

const darkPalette = {
  ...lightPalette,
  background: '#101A14',
  card: '#17231B',
  border: '#2C3A31',
  text: '#F3F4F6',
  muted: '#B7C0B8',
  softGreen: '#203829',
  redSoft: '#331D1D',
  shadow: '#000000',
};

const icons = {
  arrow: { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  edit: { ios: 'pencil', android: 'edit', web: 'edit' },
  globe: { ios: 'globe', android: 'language', web: 'language' },
  lock: { ios: 'lock.fill', android: 'lock', web: 'lock' },
  logout: { ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' },
  offline: { ios: 'arrow.down.circle.fill', android: 'download', web: 'download' },
  shield: { ios: 'shield.checkered', android: 'verified_user', web: 'verified_user' },
  sync: { ios: 'arrow.triangle.2.circlepath', android: 'sync', web: 'sync' },
  user: { ios: 'person.crop.circle.fill', android: 'account_circle', web: 'account_circle' },
  verified: { ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' },
} satisfies Record<string, SymbolViewProps['name']>;

type Palette = typeof lightPalette;
type AccountUser = AuthUser & {
  date_joined?: string | null;
  last_login?: string | null;
};

type InfoRow = {
  label: string;
  value?: string | number | null;
  showWhenEmpty?: boolean;
};

function AppIcon({
  name,
  size = 21,
  color,
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color: string;
}) {
  return <SymbolView name={name} size={size} tintColor={color} type="hierarchical" />;
}

function formatDate(value?: string | null) {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');
  return initials || 'FP';
}

function Card({
  title,
  children,
  palette,
}: {
  title: string;
  children: ReactNode;
  palette: Palette;
}) {
  const styles = createStyles(palette);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

function DetailRows({ rows, palette }: { rows: InfoRow[]; palette: Palette }) {
  const styles = createStyles(palette);
  const visibleRows = rows.filter((row) => row.showWhenEmpty || String(row.value ?? '').trim().length > 0);

  return (
    <View>
      {visibleRows.map((row, index) => (
        <View key={row.label} style={[styles.infoRow, index === visibleRows.length - 1 && styles.infoRowLast]}>
          <Text style={styles.infoLabel}>{row.label}</Text>
          <Text numberOfLines={2} style={styles.infoValue}>
            {row.value || 'Not Available'}
          </Text>
        </View>
      ))}
    </View>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
  palette,
}: {
  icon: SymbolViewProps['name'];
  label: string;
  onPress: () => void;
  palette: Palette;
}) {
  const styles = createStyles(palette);

  return (
    <Pressable style={styles.actionButton} onPress={onPress}>
      <View style={styles.actionIcon}>
        <AppIcon name={icon} size={20} color={palette.primary} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
      <AppIcon name={icons.arrow} size={19} color={palette.muted} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const scheme = useColorScheme();
  const palette = scheme === 'dark' ? darkPalette : lightPalette;
  const styles = createStyles(palette);
  const { session, logout } = useAuth();
  const user = session?.user as AccountUser | undefined;
  const profile = user?.farmer_profile;

  const fullName = profile?.name?.trim() || [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim() || 'Farmer';
  const phoneNumber = profile?.phone?.trim() || user?.username || 'Not Available';
  const landArea = profile?.land_area ? `${profile.land_area} Acres` : null;
  const primaryCrop = profile?.crop_name?.trim() || 'Not Selected';
  const version = Constants.expoConfig?.version || '3.0';
  const joinedDate = formatDate(user?.date_joined);
  const lastLogin = formatDate(user?.last_login) || (session ? 'Today' : null);

  function showPendingAction(title: string) {
    Alert.alert(title, 'This option will be available soon.');
  }

  function confirmLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/welcome');
        },
      },
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.iconButton} onPress={() => router.back()}>
            <AppIcon name={icons.back} size={22} color={palette.text} />
          </Pressable>
          <Text style={styles.headerTitle}>My Profile</Text>
          <Pressable style={styles.iconButton} onPress={() => showPendingAction('Edit Profile')}>
            <AppIcon name={icons.edit} size={20} color={palette.primary} />
          </Pressable>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(fullName)}</Text>
            </View>
          </View>
          <Text style={styles.name}>{fullName}</Text>
          <View style={styles.phoneLine}>
            <Text style={styles.phone}>{phoneNumber}</Text>
            <AppIcon name={icons.verified} size={17} color={palette.secondary} />
          </View>
          <View style={styles.badge}>
            <AppIcon name={icons.user} size={15} color={palette.primary} />
            <Text style={styles.badgeText}>Farmer</Text>
          </View>
        </View>

        <Card title="PERSONAL INFORMATION" palette={palette}>
          <DetailRows
            palette={palette}
            rows={[
              { label: 'Full Name', value: fullName, showWhenEmpty: true },
              { label: 'Phone Number', value: phoneNumber, showWhenEmpty: true },
              { label: 'State', value: profile?.state },
              { label: 'District', value: profile?.district },
              { label: 'Village', value: profile?.village },
            ]}
          />
        </Card>

        <Card title="FARM INFORMATION" palette={palette}>
          <DetailRows
            palette={palette}
            rows={[
              { label: 'Land Area', value: landArea },
              { label: 'Primary Crop', value: primaryCrop, showWhenEmpty: true },
              { label: 'Language', value: 'English', showWhenEmpty: true },
            ]}
          />
        </Card>

        <Card title="ACCOUNT" palette={palette}>
          <DetailRows
            palette={palette}
            rows={[
              { label: 'Username', value: user?.username || phoneNumber, showWhenEmpty: true },
              { label: 'Joined', value: joinedDate },
              { label: 'Last Login', value: lastLogin, showWhenEmpty: true },
              { label: 'Offline Data', value: 'Available', showWhenEmpty: true },
            ]}
          />
        </Card>

        <Card title="QUICK ACTIONS" palette={palette}>
          <View style={styles.actionList}>
            <ActionButton icon={icons.edit} label="Edit Profile" palette={palette} onPress={() => showPendingAction('Edit Profile')} />
            <ActionButton icon={icons.lock} label="Change Password" palette={palette} onPress={() => showPendingAction('Change Password')} />
            <ActionButton icon={icons.globe} label="Change Language" palette={palette} onPress={() => showPendingAction('Change Language')} />
            <ActionButton icon={icons.sync} label="Sync Offline Data" palette={palette} onPress={() => showPendingAction('Sync Offline Data')} />
          </View>
        </Card>

        <Card title="APP INFORMATION" palette={palette}>
          <DetailRows
            palette={palette}
            rows={[
              { label: 'Version', value: version, showWhenEmpty: true },
              { label: 'Mode', value: 'Offline First', showWhenEmpty: true },
              { label: 'Server', value: session ? 'Connected' : 'Guest Mode', showWhenEmpty: true },
              { label: 'Privacy', value: 'View Policy', showWhenEmpty: true },
            ]}
          />
        </Card>

        <Pressable style={styles.logoutButton} onPress={confirmLogout}>
          <AppIcon name={icons.logout} size={22} color={palette.red} />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function createStyles(palette: Palette) {
  const shadow = {
    shadowColor: palette.shadow,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: palette === lightPalette ? 0.08 : 0.24,
    shadowRadius: 22,
    elevation: 5,
  };

  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: palette.background,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: 34,
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    headerTitle: {
      color: palette.text,
      fontSize: 22,
      fontWeight: '900',
      letterSpacing: 0,
    },
    iconButton: {
      alignItems: 'center',
      backgroundColor: palette.card,
      borderColor: palette.border,
      borderRadius: 18,
      borderWidth: 1,
      height: 48,
      justifyContent: 'center',
      width: 48,
      ...shadow,
    },
    profileCard: {
      alignItems: 'center',
      backgroundColor: palette.card,
      borderColor: palette.border,
      borderRadius: 24,
      borderWidth: 1,
      marginBottom: 18,
      overflow: 'hidden',
      paddingHorizontal: 20,
      paddingVertical: 24,
      ...shadow,
    },
    avatarRing: {
      alignItems: 'center',
      backgroundColor: palette.softGreen,
      borderColor: `${palette.accent}66`,
      borderRadius: 54,
      borderWidth: 1,
      height: 108,
      justifyContent: 'center',
      width: 108,
    },
    avatar: {
      alignItems: 'center',
      backgroundColor: palette.primary,
      borderRadius: 45,
      height: 90,
      justifyContent: 'center',
      width: 90,
    },
    avatarText: {
      color: '#FFFFFF',
      fontSize: 29,
      fontWeight: '900',
      letterSpacing: 0,
    },
    name: {
      color: palette.text,
      fontSize: 26,
      fontWeight: '900',
      letterSpacing: 0,
      lineHeight: 32,
      marginTop: 16,
      textAlign: 'center',
    },
    phoneLine: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 7,
      marginTop: 6,
    },
    phone: {
      color: palette.muted,
      fontSize: 15,
      fontWeight: '700',
      letterSpacing: 0,
    },
    badge: {
      alignItems: 'center',
      backgroundColor: palette.softGreen,
      borderColor: `${palette.accent}77`,
      borderRadius: 999,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 6,
      marginTop: 14,
      paddingHorizontal: 13,
      paddingVertical: 7,
    },
    badgeText: {
      color: palette.primary,
      fontSize: 13,
      fontWeight: '900',
      letterSpacing: 0,
    },
    card: {
      backgroundColor: palette.card,
      borderColor: palette.border,
      borderRadius: 22,
      borderWidth: 1,
      marginTop: 16,
      padding: 18,
      ...shadow,
    },
    cardTitle: {
      color: palette.primary,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 0,
      marginBottom: 6,
    },
    cardBody: {
      marginTop: 2,
    },
    infoRow: {
      alignItems: 'flex-start',
      borderBottomColor: palette.border,
      borderBottomWidth: 1,
      flexDirection: 'row',
      gap: 14,
      justifyContent: 'space-between',
      minHeight: 47,
      paddingVertical: 12,
    },
    infoRowLast: {
      borderBottomWidth: 0,
      paddingBottom: 2,
    },
    infoLabel: {
      color: palette.muted,
      flex: 0.9,
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 0,
      lineHeight: 20,
    },
    infoValue: {
      color: palette.text,
      flex: 1.1,
      fontSize: 14,
      fontWeight: '900',
      letterSpacing: 0,
      lineHeight: 20,
      textAlign: 'right',
    },
    actionList: {
      gap: 10,
      paddingTop: 6,
    },
    actionButton: {
      alignItems: 'center',
      backgroundColor: palette.background,
      borderColor: palette.border,
      borderRadius: 18,
      borderWidth: 1,
      flexDirection: 'row',
      gap: 12,
      minHeight: 58,
      paddingHorizontal: 13,
    },
    actionIcon: {
      alignItems: 'center',
      backgroundColor: palette.softGreen,
      borderRadius: 14,
      height: 40,
      justifyContent: 'center',
      width: 40,
    },
    actionLabel: {
      color: palette.text,
      flex: 1,
      fontSize: 15,
      fontWeight: '900',
      letterSpacing: 0,
    },
    logoutButton: {
      alignItems: 'center',
      backgroundColor: palette.redSoft,
      borderColor: palette.red,
      borderRadius: 22,
      borderWidth: 1.5,
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      marginTop: 20,
      minHeight: 60,
    },
    logoutText: {
      color: palette.red,
      fontSize: 16,
      fontWeight: '900',
      letterSpacing: 0,
    },
  });
}
