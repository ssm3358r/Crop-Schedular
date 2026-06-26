import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';
import { HeroCard } from '@/components/HeroCard';

const icons = {
  advisory: { ios: 'leaf.fill', android: 'grass', web: 'grass' },
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  basket: { ios: 'basket.fill', android: 'shopping_basket', web: 'shopping_basket' },
  cotton: { ios: 'leaf.fill', android: 'grass', web: 'grass' },
  flower: { ios: 'camera.macro', android: 'local_florist', web: 'local_florist' },
  fruit: { ios: 'circle.grid.cross.fill', android: 'nutrition', web: 'nutrition' },
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  nursery: { ios: 'leaf.fill', android: 'psychiatry', web: 'psychiatry' },
  play: { ios: 'play.rectangle.fill', android: 'smart_display', web: 'smart_display' },
  product: { ios: 'testtube.2', android: 'inventory_2', web: 'inventory_2' },
  profile: { ios: 'person.fill', android: 'person', web: 'person' },
  stage: { ios: 'leaf.fill', android: 'eco', web: 'eco' },
  transplant: { ios: 'tree.fill', android: 'potted_plant', web: 'potted_plant' },
} satisfies Record<string, SymbolViewProps['name']>;

type CropId = 'cotton' | 'chilli';

type GrowthStage = {
  id: string;
  name: string;
  description: string;
  icon: SymbolViewProps['name'];
  tint: string;
  accent: string;
};

const stageContent: Record<CropId, GrowthStage[]> = {
  cotton: [
    {
      id: 'early-growth',
      name: 'Early Growth',
      description: 'Healthy seed germination and establishment.',
      icon: icons.nursery,
      tint: colors.mint,
      accent: colors.primary,
    },
    {
      id: 'vegetative',
      name: 'Vegetative Stage',
      description: 'Rapid leaf and stem development.',
      icon: icons.stage,
      tint: colors.mint,
      accent: colors.secondary,
    },
    {
      id: 'flowering',
      name: 'Flowering Stage',
      description: 'Flower buds and flowering begin.',
      icon: icons.flower,
      tint: '#FFF8E1',
      accent: '#D99900',
    },
    {
      id: 'boll-development',
      name: 'Boll Development',
      description: 'Bolls start developing.',
      icon: icons.cotton,
      tint: '#F1F5F9',
      accent: colors.muted,
    },
    {
      id: 'boll-maturity',
      name: 'Boll Maturity',
      description: 'Crop is ready for harvesting.',
      icon: icons.basket,
      tint: '#FFF3E4',
      accent: '#B7791F',
    },
  ],
  chilli: [
    {
      id: 'nursery',
      name: 'Nursery Stage',
      description: 'Strong seedlings begin with careful nursery care.',
      icon: icons.nursery,
      tint: colors.mint,
      accent: colors.primary,
    },
    {
      id: 'transplanting',
      name: 'Transplanting',
      description: 'Seedlings move to the main field for establishment.',
      icon: icons.transplant,
      tint: colors.mint,
      accent: colors.secondary,
    },
    {
      id: 'vegetative',
      name: 'Vegetative Stage',
      description: 'Leaf, branch and canopy growth accelerates.',
      icon: icons.stage,
      tint: colors.mint,
      accent: colors.primary,
    },
    {
      id: 'flowering',
      name: 'Flowering Stage',
      description: 'Flower initiation needs careful crop protection.',
      icon: icons.flower,
      tint: '#FFF8E1',
      accent: '#D99900',
    },
    {
      id: 'fruit-setting',
      name: 'Fruit Setting',
      description: 'Flowers convert into young chilli fruits.',
      icon: icons.fruit,
      tint: '#FFEDE7',
      accent: '#E53935',
    },
    {
      id: 'fruit-development',
      name: 'Fruit Development',
      description: 'Fruit size, color and quality develop.',
      icon: icons.fruit,
      tint: '#FFF1E8',
      accent: '#F97316',
    },
    {
      id: 'harvesting',
      name: 'Harvesting',
      description: 'Pick mature fruits at the right marketable stage.',
      icon: icons.basket,
      tint: '#FFF3E4',
      accent: '#B7791F',
    },
  ],
};

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

function StageCard({
  crop,
  item,
  isLast,
}: {
  crop: CropId;
  item: GrowthStage;
  isLast: boolean;
}) {
  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineRail}>
        <View style={styles.timelineDot} />
        {!isLast && <View style={styles.timelineLine} />}
      </View>

      <Pressable
        style={({ pressed }) => [styles.stageCard, pressed && styles.cardPressed]}
        onPress={() =>
          router.push({
            pathname: '/category-selection',
            params: {
              crop,
              stage: item.id,
            },
          })
        }>
        <View style={[styles.stageIllustration, { backgroundColor: item.tint }]}>
          <View style={[styles.stageGlow, { backgroundColor: `${item.accent}20` }]} />
          <AppIcon name={item.icon} size={38} color={item.accent} />
          <View style={[styles.stageGround, { backgroundColor: `${item.accent}35` }]} />
        </View>

        <View style={styles.stageCopy}>
          <Text style={styles.stageTitle}>{item.name}</Text>
          <Text style={styles.stageDescription}>{item.description}</Text>
        </View>

        <View style={styles.arrowCircle}>
          <AppIcon name={icons.arrow} size={18} color={colors.primary} />
        </View>
      </Pressable>
    </View>
  );
}

export default function GrowthStageScreen() {
  const params = useLocalSearchParams<{ crop?: string }>();
  const crop: CropId = params.crop === 'chilli' ? 'chilli' : 'cotton';
  const cropName = crop === 'chilli' ? 'Chilli' : 'Cotton';
  const cropEmoji = crop === 'chilli' ? '🌶' : '🌿';
  const stages = stageContent[crop];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.appBar}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <AppIcon name={icons.back} color={colors.text} />
          </Pressable>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Growth Stage</Text>
            <Text style={styles.subtitle}>Select your crop&apos;s current growth stage.</Text>
          </View>
        </View>

        <HeroCard
          eyebrow={`${cropEmoji} ${cropName}`}
          title={`You selected ${cropName}`}
          subtitle="Pick the stage that best matches your field today."
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Growth Stage Timeline</Text>
          <Text style={styles.stageCount}>{stages.length} stages</Text>
        </View>

        <View style={styles.timeline}>
          {stages.map((stage, index) => (
            <StageCard
              key={stage.id}
              crop={crop}
              item={stage}
              isLast={index === stages.length - 1}
            />
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
            <AppIcon name={item.icon} size={20} color={item.active ? '#FFFFFF' : colors.inactive} />
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
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
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 120,
  },
  appBar: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 14,
    marginBottom: 18,
  },
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
  titleBlock: {
    flex: 1,
    paddingTop: 2,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 34,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 5,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
  },
  stageCount: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  timeline: {
    gap: 0,
  },
  timelineItem: {
    flexDirection: 'row',
    minHeight: 128,
  },
  timelineRail: {
    alignItems: 'center',
    width: 24,
  },
  timelineDot: {
    backgroundColor: colors.primary,
    borderColor: colors.line,
    borderRadius: 9,
    borderWidth: 4,
    height: 18,
    marginTop: 52,
    width: 18,
    zIndex: 2,
  },
  timelineLine: {
    backgroundColor: colors.badge,
    flex: 1,
    marginTop: -1,
    width: 2,
  },
  stageCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 22,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
    minHeight: 116,
    padding: 14,
    ...shadow,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  stageIllustration: {
    alignItems: 'center',
    borderRadius: 18,
    height: 82,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 82,
  },
  stageGlow: {
    borderRadius: 28,
    height: 56,
    position: 'absolute',
    width: 56,
  },
  stageGround: {
    borderRadius: 18,
    bottom: 11,
    height: 9,
    position: 'absolute',
    width: 48,
  },
  stageCopy: {
    flex: 1,
    paddingRight: 4,
  },
  stageTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 23,
  },
  stageDescription: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 19,
    marginTop: 5,
  },
  arrowCircle: {
    alignItems: 'center',
    backgroundColor: colors.mint,
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  bottomNav: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 28,
    borderWidth: 1,
    bottom: 16,
    flexDirection: 'row',
    gap: 4,
    justifyContent: 'space-between',
    padding: 8,
    position: 'absolute',
    width: '91%',
    ...shadow,
  },
  navItem: {
    alignItems: 'center',
    borderRadius: 22,
    flex: 1,
    gap: 4,
    justifyContent: 'center',
    minHeight: 58,
  },
  navItemActive: {
    backgroundColor: colors.primary,
  },
  navLabel: {
    color: colors.inactive,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
  navLabelActive: {
    color: '#FFFFFF',
  },
});
