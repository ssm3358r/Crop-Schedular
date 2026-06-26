<<<<<<< HEAD
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function DiseaseListRedirect() {
  const params = useLocalSearchParams<{ crop?: string; stage?: string }>();

  return (
    <Redirect
      href={{
        pathname: '/AdvisoryListScreen',
        params: {
          crop: params.crop ?? 'cotton',
          stage: params.stage ?? 'flowering',
          category: 'disease',
        },
      }}
    />
  );
}
=======
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroCard } from '@/components/HeroCard';
import { colors } from '@/constants/colors';

const icons = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  disease: { ios: 'allergens.fill', android: 'coronavirus', web: 'coronavirus' },
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

export default function DiseaseListScreen() {
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
          eyebrow="Disease Advisory"
          title="Disease Management"
          subtitle={`${cropName} disease guidance for the selected stage will appear here.`}
          icon={<AppIcon name={icons.disease} size={34} color="#FFFFFF" />}
          iconBackground="rgba(216,46,77,0.28)"
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
  shadowColor: colors.shadow,
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
  },
});
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
