import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroCard } from '@/components/HeroCard';

const colors = {
  primary: '#0F4D2E',
  secondary: '#3F7D57',
  background: '#F7F6F2',
  accent: '#D6A331',
  card: '#FFFFFF',
  text: '#1F2F27',
  muted: '#6E766F',
  line: '#E5E2DA',
};

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
      tint: '#DDEFE5',
      accent: '#0F4D2E',
    },
    {
      id: 'vegetative',
      name: 'Vegetative Stage',
      description: 'Rapid leaf and stem development.',
      icon: icons.stage,
      tint: '#DDEFE5',
      accent: '#3F7D57',
    },
    {
      id: 'flowering',
      name: 'Flowering Stage',
      description: 'Flower buds and flowering begin.',
      icon: icons.flower,
      tint: '#FFF3DA',
      accent: '#B88316',
    },
    {
      id: 'boll-development',
      name: 'Boll Development',
      description: 'Bolls start developing.',
      icon: icons.cotton,
      tint: '#F7F6F2',
      accent: '#6E766F',
    },
    {
      id: 'boll-maturity',
      name: 'Boll Maturity',
      description: 'Crop is ready for harvesting.',
      icon: icons.basket,
      tint: '#FFF3DA',
      accent: '#B88316',
    },
  ],
  chilli: [
    {
      id: 'nursery',
      name: 'Nursery Stage',
      description: 'Strong seedlings begin with careful nursery care.',
      icon: icons.nursery,
      tint: '#DDEFE5',
      accent: '#0F4D2E',
    },
    {
      id: 'transplanting',
      name: 'Transplanting',
      description: 'Seedlings move to the main field for establishment.',
      icon: icons.transplant,
      tint: '#DDEFE5',
      accent: '#3F7D57',
    },
    {
      id: 'vegetative',
      name: 'Vegetative Stage',
      description: 'Leaf, branch and canopy growth accelerates.',
      icon: icons.stage,
      tint: '#DDEFE5',
      accent: '#0F4D2E',
    },
    {
      id: 'flowering',
      name: 'Flowering Stage',
      description: 'Flower initiation needs careful crop protection.',
      icon: icons.flower,
      tint: '#FFF3DA',
      accent: '#B88316',
    },
    {
      id: 'fruit-setting',
      name: 'Fruit Setting',
      description: 'Flowers convert into young chilli fruits.',
      icon: icons.fruit,
      tint: '#FFF3DA',
      accent: '#E53935',
    },
    {
      id: 'fruit-development',
      name: 'Fruit Development',
      description: 'Fruit size, color and quality develop.',
      icon: icons.fruit,
      tint: '#FFF3DA',
      accent: '#F97316',
    },
    {
      id: 'harvesting',
      name: 'Harvesting',
      description: 'Pick mature fruits at the right marketable stage.',
      icon: icons.basket,
      tint: '#FFF3DA',
      accent: '#B88316',
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
            <AppIcon name={item.icon} size={20} color={item.active ? '#FFFFFF' : '#7A8079'} />
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: '#0F2E1C',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.08,
  shadowRadius: 18,
  elevation: 5,
};

const styles: Record<string, any> = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 120,
  },
  appBar: {
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    gap: 14,
    marginHorizontal: -20,
    marginBottom: 18,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
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
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 34,
  },
  subtitle: {
    color: '#DDEFE5',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 5,
  },
  headerCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 170,
    overflow: 'hidden',
    padding: 18,
    ...shadow,
  },
  headerCopy: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
  cropLabel: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 30,
    marginTop: 6,
  },
  headerText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 6,
    maxWidth: 185,
  },
  cropArt: {
    bottom: 0,
    height: 155,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    width: 185,
  },
  artSun: {
    backgroundColor: '#FFD76A',
    borderRadius: 20,
    height: 40,
    position: 'absolute',
    right: 20,
    top: 13,
    width: 40,
  },
  artField: {
    backgroundColor: '#D4E8C6',
    borderTopLeftRadius: 78,
    bottom: -10,
    height: 94,
    overflow: 'hidden',
    position: 'absolute',
    right: -10,
    width: 195,
  },
  artPlant: {
    bottom: 14,
    height: 58,
    position: 'absolute',
    width: 22,
  },
  artStem: {
    backgroundColor: colors.primary,
    borderRadius: 3,
    bottom: 0,
    height: 38,
    left: 9,
    position: 'absolute',
    width: 5,
  },
  artLeafLeft: {
    backgroundColor: '#0F4D2E',
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    bottom: 20,
    height: 17,
    position: 'absolute',
    right: 11,
    transform: [{ rotate: '-28deg' }],
    width: 11,
  },
  artLeafRight: {
    backgroundColor: colors.secondary,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    bottom: 13,
    height: 17,
    left: 11,
    position: 'absolute',
    transform: [{ rotate: '28deg' }],
    width: 11,
  },
  artCotton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDE8DD',
    borderRadius: 11,
    borderWidth: 1,
    height: 22,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 22,
  },
  artChilli: {
    backgroundColor: '#E53935',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 28,
    left: 6,
    position: 'absolute',
    top: 1,
    transform: [{ rotate: '12deg' }],
    width: 11,
  },
  artChilliAlt: {
    transform: [{ rotate: '-16deg' }],
  },
  cropBadge: {
    alignItems: 'center',
    backgroundColor: '#DDEFE5',
    borderRadius: 14,
    bottom: 16,
    justifyContent: 'center',
    minHeight: 30,
    paddingHorizontal: 12,
    position: 'absolute',
    right: 18,
  },
  cropBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  timelineDot: {
    backgroundColor: colors.primary,
    borderColor: '#EFECE4',
    borderRadius: 9,
    borderWidth: 4,
    height: 18,
    marginTop: 52,
    width: 18,
    zIndex: 2,
  },
  timelineLine: {
    backgroundColor: '#D8D5CC',
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
    backgroundColor: '#DDEFE5',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  bottomNav: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderColor: '#E5E2DA',
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
    color: '#7A8079',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
  navLabelActive: {
    color: '#FFFFFF',
  },
});
