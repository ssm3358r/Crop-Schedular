import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const colors = {
  primary: '#2E7D32',
  background: '#F8FAF8',
  card: '#FFFFFF',
  text: '#1E293B',
  muted: '#64748B',
  line: '#E2ECE2',
};

const icons = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  disease: { ios: 'allergens.fill', android: 'coronavirus', web: 'coronavirus' },
} satisfies Record<string, SymbolViewProps['name']>;

function AppIcon({ name, size = 24, color = colors.primary }: { name: SymbolViewProps['name']; size?: number; color?: string }) {
  return <SymbolView name={name} size={size} tintColor={color} type="hierarchical" />;
}

export default function DiseaseListScreen() {
  const params = useLocalSearchParams<{ crop?: string; stage?: string }>();
  const cropName = params.crop === 'chilli' ? 'Chilli' : 'Cotton';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <AppIcon name={icons.back} color={colors.text} />
        </Pressable>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <AppIcon name={icons.disease} size={38} />
          </View>
          <Text style={styles.title}>Disease Management</Text>
          <Text style={styles.subtitle}>{cropName} disease advisory for the selected stage will appear here.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: '#1B5E20',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.08,
  shadowRadius: 18,
  elevation: 5,
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: 20 },
  backButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    width: 48,
    ...shadow,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 24,
    borderWidth: 1,
    marginTop: 24,
    padding: 24,
    ...shadow,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: '#FEEDEF',
    borderRadius: 28,
    height: 76,
    justifyContent: 'center',
    width: 76,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 34,
    marginTop: 18,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
});
