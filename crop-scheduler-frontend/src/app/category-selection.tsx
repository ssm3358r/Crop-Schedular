import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

<<<<<<< HEAD
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
=======
import { colors } from '@/constants/colors';
import { HeroCard } from '@/components/HeroCard';
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330

const icons = {
  advisory: { ios: 'leaf.fill', android: 'grass', web: 'grass' },
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  disease: { ios: 'allergens.fill', android: 'coronavirus', web: 'coronavirus' },
  flower: { ios: 'camera.macro', android: 'local_florist', web: 'local_florist' },
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  nutrition: { ios: 'drop.fill', android: 'water_drop', web: 'water_drop' },
  pest: { ios: 'ladybug.fill', android: 'pest_control', web: 'pest_control' },
  play: { ios: 'play.rectangle.fill', android: 'smart_display', web: 'smart_display' },
  product: { ios: 'testtube.2', android: 'inventory_2', web: 'inventory_2' },
  profile: { ios: 'person.fill', android: 'person', web: 'person' },
  stage: { ios: 'leaf.fill', android: 'eco', web: 'eco' },
  tip: { ios: 'lightbulb.fill', android: 'lightbulb', web: 'lightbulb' },
} satisfies Record<string, SymbolViewProps['name']>;

type CropId = 'cotton' | 'chilli';

type Category = {
  id: 'pest' | 'disease' | 'nutrition';
  title: string;
  description: string;
  features: string[];
  icon: SymbolViewProps['name'];
  tint: string;
  accent: string;
};

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

const categories: Category[] = [
  {
    id: 'pest',
    title: 'Pest Management',
    description: 'Identify insect pests, symptoms, damage and control measures.',
    features: ['Pest Identification', 'Symptoms', 'Damage', 'FPS Recommended Products'],
    icon: icons.pest,
    tint: '#FFF3DA',
    accent: '#B88316',
  },
  {
    id: 'disease',
    title: 'Disease Management',
    description: 'Identify crop diseases and learn prevention and treatment methods.',
    features: ['Disease Identification', 'Symptoms', 'Prevention', 'FPS Recommended Fungicides'],
    icon: icons.disease,
    tint: '#F5E5ED',
    accent: '#C85E84',
  },
  {
    id: 'nutrition',
    title: 'Nutrition Management',
    description: 'Stage-wise nutrition recommendations for better crop growth and yield.',
    features: ['Nutrient Requirements', 'Deficiency Symptoms', 'Dosage', 'FPS Nutrition Products'],
    icon: icons.nutrition,
<<<<<<< HEAD
    tint: '#DDEFE5',
    accent: '#0F4D2E',
=======
    tint: colors.mint,
    accent: colors.primary,
    route: '/nutrition-advisory',
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
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

function CategoryIllustration({ category }: { category: Category }) {
  return (
    <View style={[styles.categoryArt, { backgroundColor: category.tint }]}>
      <View style={[styles.artGlow, { backgroundColor: `${category.accent}1F` }]} />
      <View style={styles.artLeaf} />
      <View style={[styles.artIconCircle, { backgroundColor: category.accent }]}>
        <AppIcon name={category.icon} size={26} color="#FFFFFF" />
      </View>
      <View style={[styles.artGround, { backgroundColor: `${category.accent}33` }]} />
    </View>
  );
}

function CategoryCard({
  category,
  crop,
  stage,
}: {
  category: Category;
  crop: CropId;
  stage: string;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.categoryCard, pressed && styles.cardPressed]}
      onPress={() =>
        router.push({
          pathname: '/AdvisoryListScreen',
          params: { crop, stage, category: category.id },
        })
      }>
      <CategoryIllustration category={category} />

      <View style={styles.categoryCopy}>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
        <View style={styles.featureList}>
          {category.features.map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <View style={styles.featureCheck}>
                <AppIcon name={icons.check} size={11} color="#FFFFFF" />
              </View>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.arrowCircle}>
        <AppIcon name={icons.arrow} size={18} color={colors.primary} />
      </View>
    </Pressable>
  );
}

export default function CategorySelectionScreen() {
  const params = useLocalSearchParams<{ crop?: string; stage?: string }>();
  const crop: CropId = params.crop === 'chilli' ? 'chilli' : 'cotton';
  const cropName = crop === 'chilli' ? 'Chilli' : 'Cotton';
  const stageId = typeof params.stage === 'string' ? params.stage : 'flowering';
  const stageName = stageLabels[stageId] ?? 'Current Stage';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.appBar}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <AppIcon name={icons.back} size={22} color={colors.text} />
          </Pressable>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Crop Advisory</Text>
            <Text style={styles.subtitle}>Select the type of guidance you need.</Text>
          </View>
        </View>

        <HeroCard
          eyebrow="Crop Advisory"
          title={stageName}
          subtitle={`${cropName} · tailored guidance for this growth stage.`}
          pills={[
            {
              label: cropName,
              icon: <AppIcon name={icons.advisory} size={14} color="#FFFFFF" />,
            },
            {
              label: stageName,
              icon: <AppIcon name={icons.flower} size={14} color="#FFFFFF" />,
            },
          ]}
        />

        <Text style={styles.question}>What would you like help with today?</Text>

        <View style={styles.categoryList}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} crop={crop} stage={stageId} />
          ))}
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <AppIcon name={icons.tip} size={20} color="#936C00" />
          </View>
          <View style={styles.tipCopy}>
            <Text style={styles.tipTitle}>Tip</Text>
            <Text style={styles.tipText}>
              Choose the category based on the problem you are facing or the information you need.
            </Text>
          </View>
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
<<<<<<< HEAD
            <AppIcon name={item.icon} size={20} color={item.active ? '#FFFFFF' : '#7A8079'} />
=======
            <AppIcon name={item.icon} size={20} color={item.active ? '#FFFFFF' : colors.inactive} />
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
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
<<<<<<< HEAD
  summaryCard: {
    backgroundColor: '#DDEFE5',
    borderColor: '#E5E2DA',
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 166,
    overflow: 'hidden',
    padding: 18,
    ...shadow,
  },
  summaryCopy: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
  cropName: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0,
  },
  stageLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    marginTop: 12,
    textTransform: 'uppercase',
  },
  stagePill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: 15,
    flexDirection: 'row',
    gap: 7,
    marginTop: 7,
    minHeight: 36,
    paddingHorizontal: 12,
  },
  stagePillText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0,
  },
  summaryArt: {
    bottom: 0,
    height: 150,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    width: 175,
  },
  summarySun: {
    backgroundColor: '#FFD76A',
    borderRadius: 19,
    height: 38,
    position: 'absolute',
    right: 20,
    top: 12,
    width: 38,
  },
  summaryField: {
    backgroundColor: '#D4E8C6',
    borderTopLeftRadius: 74,
    bottom: -10,
    height: 92,
    overflow: 'hidden',
    position: 'absolute',
    right: -12,
    width: 190,
  },
  summaryPlant: {
    bottom: 15,
    height: 58,
    position: 'absolute',
    width: 22,
  },
  summaryStem: {
    backgroundColor: colors.primary,
    borderRadius: 3,
    bottom: 0,
    height: 37,
    left: 9,
    position: 'absolute',
    width: 5,
  },
  summaryLeafLeft: {
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    bottom: 20,
    height: 17,
    position: 'absolute',
    right: 11,
    transform: [{ rotate: '-28deg' }],
    width: 11,
  },
  summaryLeafRight: {
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
  cottonBud: {
    backgroundColor: colors.card,
    borderColor: '#DDE8DD',
    borderRadius: 11,
    borderWidth: 1,
    height: 22,
    left: 0,
    position: 'absolute',
    top: 0,
    width: 22,
  },
  chilliFruit: {
    backgroundColor: '#E53935',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 29,
    left: 6,
    position: 'absolute',
    top: 1,
    transform: [{ rotate: '12deg' }],
    width: 11,
  },
=======
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
  question: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 28,
    marginTop: 24,
  },
  categoryList: {
    gap: 16,
    marginTop: 16,
  },
  categoryCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 24,
    borderWidth: 1,
    minHeight: 250,
    overflow: 'hidden',
    padding: 16,
    ...shadow,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  categoryArt: {
    alignItems: 'center',
    borderRadius: 20,
    height: 104,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  artGlow: {
    borderRadius: 40,
    height: 80,
    position: 'absolute',
    width: 80,
  },
  artLeaf: {
    backgroundColor: colors.secondary,
    borderBottomLeftRadius: 42,
    borderTopRightRadius: 42,
    height: 70,
    opacity: 0.9,
    position: 'absolute',
    transform: [{ rotate: '-18deg' }],
    width: 46,
  },
  artIconCircle: {
    alignItems: 'center',
    borderColor: colors.card,
    borderRadius: 24,
    borderWidth: 3,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  artGround: {
    borderRadius: 20,
    bottom: 15,
    height: 10,
    position: 'absolute',
    width: 68,
  },
  categoryCopy: {
    marginTop: 15,
    paddingRight: 42,
  },
  categoryTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 27,
  },
  categoryDescription: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 6,
  },
  featureList: {
    gap: 8,
    marginTop: 14,
  },
  featureRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  featureCheck: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  featureText: {
    color: colors.text,
    flex: 1,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 18,
  },
  arrowCircle: {
    alignItems: 'center',
<<<<<<< HEAD
    backgroundColor: '#DDEFE5',
=======
    backgroundColor: colors.mint,
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
    borderRadius: 18,
    bottom: 18,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: 18,
    width: 36,
  },
  tipCard: {
    alignItems: 'flex-start',
    backgroundColor: '#FFF9E7',
    borderColor: '#FFE5A3',
    borderRadius: 22,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    padding: 16,
  },
  tipIcon: {
    alignItems: 'center',
    backgroundColor: '#FFE7A5',
    borderRadius: 16,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  tipCopy: {
    flex: 1,
  },
  tipTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0,
  },
  tipText: {
    color: '#725A18',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 4,
  },
  bottomNav: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.card,
<<<<<<< HEAD
    borderColor: '#E5E2DA',
=======
    borderColor: colors.line,
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
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
<<<<<<< HEAD
    color: '#7A8079',
=======
    color: colors.inactive,
>>>>>>> 6a7e00deada5760397190316f5abba3e10e73330
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
  navLabelActive: {
    color: '#FFFFFF',
  },
});
