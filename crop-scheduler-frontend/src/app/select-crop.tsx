import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CropCard } from '@/components/advisory/CropCard';
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
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  play: { ios: 'play.rectangle.fill', android: 'smart_display', web: 'smart_display' },
  product: { ios: 'testtube.2', android: 'inventory_2', web: 'inventory_2' },
  profile: { ios: 'person.fill', android: 'person', web: 'person' },
  tip: { ios: 'lightbulb.fill', android: 'lightbulb', web: 'lightbulb' },
} satisfies Record<string, SymbolViewProps['name']>;

type CropId = 'cotton' | 'chilli';

const crops: Array<{
  id: CropId;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  tint: string;
  accent: string;
}> = [
  {
    id: 'cotton',
    title: 'Cotton',
    subtitle: 'Complete advisory for every growth stage',
    image: require('@/assets/images/crops/CottonCrop.png'),
    tint: '#DDEFE5',
    accent: '#0F4D2E',
  },
 {
  id: 'chilli',
  title: 'Chilli',
  subtitle: 'Complete advisory for every growth stage',
  image: require('@/assets/images/crops/chilli.png'),
  tint: '#FFF3DA',
  accent: '#E53935',
},
];

const chips = ['Pest Management', 'Disease Management', 'Nutrition Guide'];

const navItems = [
  { label: 'Home', icon: icons.home, route: '/' },
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

export default function SelectCropScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.appBar}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <AppIcon name={icons.back} size={22} color={colors.text} />
          </Pressable>
          <View style={styles.titleBlock}>
            <Text style={styles.title}>Select Crop</Text>
            <Text style={styles.subtitle}>Choose the crop you want expert guidance for.</Text>
          </View>
        </View>

        <HeroCard
          eyebrow="FPS Farmer Advisory"
          title="Expert crop care starts here"
          subtitle="Choose your crop to unlock tailored stage-wise recommendations."
        />

        <View style={styles.cropList}>
          {crops.map((crop) => (
            <CropCard
              key={crop.id}
              title={crop.title}
              image={crop.image}
              onPress={() =>
                router.push({
                  pathname: '/growth-stage',
                  params: { crop: crop.id },
                })
              }
            />
          ))}
        </View>

        <View style={styles.tipCard}>
          <View style={styles.tipIcon}>
            <AppIcon name={icons.tip} size={20} color="#936C00" />
          </View>
          <View style={styles.tipCopy}>
            <Text style={styles.tipTitle}>Tip</Text>
            <Text style={styles.tipText}>
              Select the crop you are currently growing to receive stage-wise recommendations and FPS product suggestions.
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
  heroCard: {
    backgroundColor: colors.card,
    borderColor: '#DDEDDD',
    borderRadius: 24,
    borderWidth: 1,
    minHeight: 172,
    overflow: 'hidden',
    padding: 18,
    ...shadow,
  },
  heroEyebrow: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  heroTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 28,
    marginTop: 5,
    maxWidth: 185,
  },
  heroArt: {
    bottom: 0,
    height: 160,
    pointerEvents: 'none',
    position: 'absolute',
    right: -2,
    width: 205,
  },
  heroSun: {
    backgroundColor: '#FFD76A',
    borderRadius: 22,
    height: 44,
    position: 'absolute',
    right: 24,
    top: 10,
    width: 44,
  },
  heroCloudOne: {
    backgroundColor: '#EFF8EF',
    borderRadius: 18,
    height: 24,
    position: 'absolute',
    right: 78,
    top: 23,
    width: 64,
  },
  heroCloudTwo: {
    backgroundColor: '#EFF8EF',
    borderRadius: 18,
    height: 20,
    position: 'absolute',
    right: 62,
    top: 36,
    width: 48,
  },
  heroField: {
    backgroundColor: '#D4EDBF',
    borderTopLeftRadius: 86,
    bottom: -10,
    height: 100,
    overflow: 'hidden',
    position: 'absolute',
    right: -12,
    width: 218,
  },
  heroCropRow: {
    flexDirection: 'row',
    gap: 10,
    position: 'absolute',
    right: 10,
  },
  heroCrop: {
    alignItems: 'center',
    height: 23,
    justifyContent: 'flex-end',
    width: 13,
  },
  heroLeafLeft: {
    backgroundColor: '#0F4D2E',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 13,
    position: 'absolute',
    right: 6,
    top: 4,
    transform: [{ rotate: '-28deg' }],
    width: 9,
  },
  heroLeafRight: {
    backgroundColor: '#3F7D57',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 13,
    left: 6,
    position: 'absolute',
    top: 4,
    transform: [{ rotate: '28deg' }],
    width: 9,
  },
  heroBud: {
    backgroundColor: '#E53935',
    borderRadius: 4,
    height: 8,
    position: 'absolute',
    top: 1,
    width: 8,
  },
  heroBudWhite: {
    backgroundColor: '#FFFFFF',
  },
  heroFarmer: {
    alignItems: 'center',
    bottom: 40,
    position: 'absolute',
    right: 92,
  },
  farmerHat: {
    backgroundColor: colors.accent,
    borderRadius: 13,
    height: 13,
    width: 46,
  },
  farmerHead: {
    backgroundColor: '#C98555',
    borderRadius: 13,
    height: 25,
    marginTop: -2,
    width: 25,
  },
  farmerScarf: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 8,
    marginTop: -1,
    width: 30,
  },
  farmerBody: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 34,
    width: 36,
  },
  cropCopy: {
    marginTop: 15,
    paddingRight: 44,
  },
  cropTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 30,
  },
  cropSubtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 4,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 13,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: '#DDEFE5',
    borderRadius: 13,
    flexDirection: 'row',
    gap: 5,
    minHeight: 30,
    paddingHorizontal: 10,
  },
  chipText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  arrowCircle: {
    alignItems: 'center',
    backgroundColor: '#DDEFE5',
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
