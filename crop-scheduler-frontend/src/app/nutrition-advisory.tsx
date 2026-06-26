import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

<<<<<<< HEAD
const colors = {
  primary: '#0F4D2E',
  background: '#F7F6F2',
  card: '#FFFFFF',
  text: '#1F2F27',
  muted: '#6E766F',
  line: '#E5E2DA',
};
=======
import { HeroCard } from '@/components/HeroCard';
import { colors } from '@/constants/colors';
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330

const icons = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  nutrition: { ios: 'drop.fill', android: 'water_drop', web: 'water_drop' },
} satisfies Record<string, SymbolViewProps['name']>;

const stageLabels: Record<string, string> = {
  'early-growth': 'Early Growth',
  vegetative: 'Vegetative Stage',
  flowering: 'Flowering Stage',
  'boll-development': 'Boll Development',
  'boll-maturity': 'Boll Maturity',
  nursery: 'Nursery Stage',
  transplanting: 'Transplanting',
  'fruit-setting': 'Fruit Setting',
  'fruit-development': 'Fruit Development',
  harvesting: 'Harvesting',
};

function AppIcon({ name, size = 24, color = colors.primary }: { name: SymbolViewProps['name']; size?: number; color?: string }) {
  return <SymbolView name={name} size={size} tintColor={color} type="hierarchical" />;
}

export default function NutritionAdvisoryScreen() {
  const params = useLocalSearchParams<{ crop?: string; stage?: string }>();
  const cropName = params.crop === 'chilli' ? 'Chilli' : 'Cotton';
  const stageId = typeof params.stage === 'string' ? params.stage : 'flowering';
  const stageName = stageLabels[stageId] ?? 'Current Stage';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <AppIcon name={icons.back} color={colors.text} />
        </Pressable>
        <HeroCard
          centered
          eyebrow="Nutrition Advisory"
          title="Nutrition Management"
          subtitle={`${cropName} nutrition recommendations for the selected stage will appear here.`}
          icon={<AppIcon name={icons.nutrition} size={34} color="#FFFFFF" />}
          iconBackground="rgba(124,179,66,0.28)"
          pills={[
            { label: cropName },
            { label: stageName },
          ]}
          style={styles.heroCard}
        />
      </View>
    </SafeAreaView>
  );
}

const shadow = {
<<<<<<< HEAD
  shadowColor: '#0F2E1C',
=======
  shadowColor: colors.shadow,
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
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
  heroCard: {
    marginTop: 24,
<<<<<<< HEAD
    padding: 24,
    ...shadow,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: '#DDEFE5',
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
=======
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
  },
});
