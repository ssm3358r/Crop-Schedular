import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AdvisoryCategoryCard } from '@/components/AdvisoryCategoryCard';

type CropId = 'cotton' | 'chilli';
type CategoryId = 'pest' | 'disease' | 'nutrition';

type AdvisoryCategory = {
  id: CategoryId;
  title: string;
  description: string;
  color: string;
  iconName: SymbolViewProps['name'];
  features: Array<{
    label: string;
    iconName: SymbolViewProps['name'];
  }>;
};

const colors = {
  background: '#F6F8F2',
  primary: '#2E7D32',
  darkGreen: '#0F5132',
  text: '#1F2937',
  muted: '#6B7280',
  card: '#FFFFFF',
};

const icons = {
  advisory: { ios: 'leaf.fill', android: 'grass', web: 'grass' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  cotton: { ios: 'leaf.fill', android: 'eco', web: 'eco' },
  disease: { ios: 'allergens.fill', android: 'coronavirus', web: 'coronavirus' },
  dosage: { ios: 'takeoutbag.and.cup.and.straw.fill', android: 'inventory_2', web: 'inventory_2' },
  fungus: { ios: 'shield.lefthalf.filled', android: 'health_and_safety', web: 'health_and_safety' },
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  leaf: { ios: 'leaf.fill', android: 'eco', web: 'eco' },
  nutrition: { ios: 'drop.fill', android: 'water_drop', web: 'water_drop' },
  pest: { ios: 'ladybug.fill', android: 'pest_control', web: 'pest_control' },
  play: { ios: 'play.rectangle.fill', android: 'smart_display', web: 'smart_display' },
  product: { ios: 'testtube.2', android: 'inventory_2', web: 'inventory_2' },
  profile: { ios: 'person.fill', android: 'person', web: 'person' },
  settings: { ios: 'gearshape.fill', android: 'settings', web: 'settings' },
  symptoms: { ios: 'leaf.arrow.triangle.circlepath', android: 'compost', web: 'compost' },
} satisfies Record<string, SymbolViewProps['name']>;

const stageLabels: Record<string, string> = {
  'early-growth': 'Early Growth',
  'seedling-establishment': 'Seedling & Establishment',
  vegetative: 'Vegetative',
  flowering: 'Flowering',
  'boll-development': 'Boll Development',
  'boll-maturity': 'Boll Maturity',
  nursery: 'Nursery',
  transplanting: 'Transplanting',
  'fruit-setting': 'Fruit Setting',
  'fruit-development': 'Fruit Development',
  harvesting: 'Harvesting',
};

const categories: AdvisoryCategory[] = [
  {
    id: 'pest',
    title: 'Pest Management',
    description: 'Identify insect pests, symptoms, damage and control measures.',
    color: '#D4A017',
    iconName: icons.pest,
    features: [
      { label: 'Pest Identification', iconName: icons.pest },
      { label: 'Symptoms', iconName: icons.symptoms },
      { label: 'Damage', iconName: icons.leaf },
      { label: 'FPS Recommended Products', iconName: icons.product },
    ],
  },
  {
    id: 'disease',
    title: 'Disease Management',
    description: 'Identify crop diseases and learn prevention and treatment methods.',
    color: '#D85B8F',
    iconName: icons.disease,
    features: [
      { label: 'Disease Identification', iconName: icons.disease },
      { label: 'Symptoms', iconName: icons.symptoms },
      { label: 'Prevention', iconName: icons.fungus },
      { label: 'FPS Recommended Fungicides', iconName: icons.product },
    ],
  },
  {
    id: 'nutrition',
    title: 'Nutrition Management',
    description: 'Stage-wise nutrition recommendations for better crop growth and yield.',
    color: '#0F6B3E',
    iconName: icons.nutrition,
    features: [
      { label: 'Nutrient Requirements', iconName: icons.leaf },
      { label: 'Deficiency Symptoms', iconName: icons.symptoms },
      { label: 'Dosage', iconName: icons.dosage },
      { label: 'FPS Nutrition Products', iconName: icons.product },
    ],
  },
];

const navItems = [
  { label: 'Home', icon: icons.home },
  { label: 'Advisory', icon: icons.advisory, active: true },
  { label: 'Videos', icon: icons.play },
  { label: 'Products', icon: icons.product },
  { label: 'Profile', icon: icons.profile },
];

function AppIcon({
  name,
  size = 22,
  color = colors.primary,
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color?: string;
}) {
  return <SymbolView name={name} size={size} tintColor={color} type="hierarchical" />;
}

function HeroChip({ label, icon }: { label: string; icon: ReactNode }) {
  return (
    <View style={styles.heroChip}>
      {icon}
      <Text style={styles.heroChipText}>{label}</Text>
    </View>
  );
}

function HeroHeader({ cropName, stageName }: { cropName: string; stageName: string }) {
  return (
    <Animated.View entering={FadeInDown.duration(360)}>
      <LinearGradient colors={[colors.darkGreen, colors.primary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.heroCard}>
        <View style={[styles.decorCircle, styles.decorCircleLarge]} />
        <View style={[styles.decorCircle, styles.decorCircleMedium]} />
        <View style={[styles.decorCircle, styles.decorCircleSmall]} />

        <View style={styles.heroTopRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>CROP ADVISORY</Text>
          </View>
          <Pressable android_ripple={{ color: 'rgba(255,255,255,0.18)', borderless: true }} style={styles.settingsButton}>
            <AppIcon name={icons.settings} size={28} color="#FFFFFF" />
          </Pressable>
        </View>

        <Text style={styles.heroTitle}>{stageName}</Text>
        <Text style={styles.heroSubtitle}>
          {cropName} • tailored guidance for this growth stage.
        </Text>

        <View style={styles.heroChipRow}>
          <HeroChip label={cropName} icon={<AppIcon name={icons.cotton} size={21} color="#FFFFFF" />} />
          <HeroChip label={stageName} icon={<AppIcon name={icons.advisory} size={21} color="#FFFFFF" />} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

export default function CategorySelectionScreen() {
  const params = useLocalSearchParams<{ crop?: string; stage?: string }>();
  const crop: CropId = params.crop === 'chilli' ? 'chilli' : 'cotton';
  const cropName = crop === 'chilli' ? 'Chilli' : 'Cotton';
  const stageId = typeof params.stage === 'string' ? params.stage : 'boll-development';
  const stageName = stageLabels[stageId] ?? 'Boll Development';

  function openCategory(category: AdvisoryCategory) {
    if (category.id === 'nutrition') {
      router.push({ pathname: '/NutritionStagesScreen' as never, params: { cropType: crop } });
      return;
    }

    router.push({
      pathname: '/AdvisoryListScreen',
      params: { crop, stage: stageId, category: category.id },
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <HeroHeader cropName={cropName} stageName={stageName} />

        <Text style={styles.sectionTitle}>What would you like help with today?</Text>

        <View style={styles.cards}>
          {categories.map((category, index) => (
            <Animated.View key={category.id} entering={FadeInUp.delay(120 + index * 90).duration(320)}>
              <AdvisoryCategoryCard
                title={category.title}
                description={category.description}
                color={category.color}
                icon={<AppIcon name={category.iconName} size={38} color="#FFFFFF" />}
                features={category.features.map((feature) => ({
                  label: feature.label,
                  icon: <AppIcon name={feature.iconName} size={30} color={category.color} />,
                }))}
                onPress={() => openCategory(category)}
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <Pressable
            key={item.label}
            style={[styles.navItem, item.active && styles.navItemActive]}
            onPress={() => {
              if (item.label === 'Home') {
                router.push('/');
              }
            }}>
            <AppIcon name={item.icon} size={22} color={item.active ? '#FFFFFF' : '#7A7F78'} />
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: '#17231A',
  shadowOffset: { width: 0, height: 14 },
  shadowOpacity: 0.14,
  shadowRadius: 24,
  elevation: 8,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 126,
  },
  heroCard: {
    borderRadius: 28,
    minHeight: 274,
    overflow: 'hidden',
    padding: 26,
    ...shadow,
  },
  decorCircle: {
    backgroundColor: 'rgba(255,255,255,0.11)',
    position: 'absolute',
  },
  decorCircleLarge: {
    borderRadius: 118,
    height: 236,
    right: -28,
    top: -44,
    width: 236,
  },
  decorCircleMedium: {
    borderRadius: 72,
    bottom: -46,
    height: 144,
    left: -42,
    width: 144,
  },
  decorCircleSmall: {
    borderRadius: 54,
    height: 108,
    right: 156,
    top: 168,
    width: 108,
  },
  heroTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    backgroundColor: 'rgba(67, 160, 71, 0.78)',
    borderRadius: 999,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  settingsButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 46,
    marginTop: 24,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 28,
    marginTop: 12,
  },
  heroChipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 30,
  },
  heroChip: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderColor: 'rgba(255,255,255,0.23)',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 54,
    paddingHorizontal: 18,
  },
  heroChipText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 32,
    marginTop: 24,
  },
  cards: {
    marginTop: 18,
  },
  bottomNav: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderColor: 'rgba(31,41,55,0.08)',
    borderRadius: 32,
    borderWidth: 1,
    bottom: 16,
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'space-between',
    padding: 10,
    position: 'absolute',
    width: '91%',
    ...shadow,
  },
  navItem: {
    alignItems: 'center',
    borderRadius: 28,
    flex: 1,
    gap: 5,
    justifyContent: 'center',
    minHeight: 64,
  },
  navItemActive: {
    backgroundColor: colors.darkGreen,
  },
  navLabel: {
    color: '#6D716B',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
  },
  navLabelActive: {
    color: '#FFFFFF',
  },
});
