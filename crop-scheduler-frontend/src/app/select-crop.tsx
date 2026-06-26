import { router } from 'expo-router';
import { Image } from 'expo-image';
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
  tint: string;
  accent: string;
}> = [
  {
    id: 'cotton',
    title: 'Cotton',
    subtitle: 'Complete advisory for every growth stage',
    tint: colors.mint,
    accent: colors.primary,
  },
  {
    id: 'chilli',
    title: 'Chilli',
    subtitle: 'Complete advisory for every growth stage',
    tint: '#FFF0E8',
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

function CropCard({ crop }: { crop: (typeof crops)[number] }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.cropCard, pressed && styles.cardPressed]}
      onPress={() =>
        router.push({
          pathname: '/growth-stage',
          params: { crop: crop.id },
        })
      }>
      <View style={[styles.cropIllustrationWrap, { backgroundColor: crop.tint }]}>
        <Image
          source={
            crop.id === 'cotton'
              ? require('@/assets/images/crops/cotton.png')
              : require('@/assets/images/crops/chilli.png')
          }
          style={styles.cropPhoto}
          contentFit="cover"
          transition={180}
        />
        <View style={styles.photoOverlay} />
      </View>

      <View style={styles.cropCopy}>
        <Text style={styles.cropTitle}>{crop.title}</Text>
        <Text style={styles.cropSubtitle}>{crop.subtitle}</Text>
        <View style={styles.chipWrap}>
          {chips.map((chip) => (
            <View key={chip} style={styles.chip}>
              <AppIcon name={icons.check} size={12} color={colors.primary} />
              <Text style={styles.chipText}>{chip}</Text>
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
            <CropCard key={crop.id} crop={crop} />
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
  cropList: {
    gap: 16,
    marginTop: 20,
  },
  cropCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 24,
    borderWidth: 1,
    minHeight: 216,
    overflow: 'hidden',
    padding: 16,
    ...shadow,
  },
  cardPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },
  cropIllustrationWrap: {
    alignItems: 'center',
    borderRadius: 20,
    height: 112,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  cropPhoto: {
    height: '100%',
    width: '100%',
  },
  photoOverlay: {
    backgroundColor: 'rgba(15, 82, 27, 0.08)',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
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
    backgroundColor: colors.mint,
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
    backgroundColor: colors.mint,
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
