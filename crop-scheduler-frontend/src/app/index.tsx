import { router } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const colors = {
  primary: '#2E7D32',
  secondary: '#66BB6A',
  background: '#F8FAF8',
  accent: '#FFC107',
  text: '#1E293B',
  muted: '#64748B',
  card: '#FFFFFF',
  line: '#E7EFE7',
};

const icons = {
  advisory: { ios: 'leaf.fill', android: 'grass', web: 'grass' },
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  bell: { ios: 'bell.fill', android: 'notifications', web: 'notifications' },
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  learning: { ios: 'play.circle.fill', android: 'play_circle', web: 'play_circle' },
  play: { ios: 'play.fill', android: 'play_arrow', web: 'play_arrow' },
  product: { ios: 'testtube.2', android: 'science', web: 'science' },
  products: { ios: 'testtube.2', android: 'inventory_2', web: 'inventory_2' },
  profile: { ios: 'person.fill', android: 'person', web: 'person' },
  videos: { ios: 'play.rectangle.fill', android: 'smart_display', web: 'smart_display' },
} satisfies Record<string, SymbolViewProps['name']>;

const features = [
  {
    icon: icons.advisory,
    title: 'Crop Advisory',
    subtitle: 'Pest • Disease • Nutrition',
    description: 'Get stage-wise crop recommendations for Cotton and Chilli.',
    color: '#EAF7EA',
    accent: '#2E7D32',
  },
  {
    icon: icons.learning,
    title: 'Learning Center',
    subtitle: 'Expert Farming Videos',
    description: 'Watch informative videos uploaded by FPS experts.',
    color: '#FFF7DE',
    accent: '#D99900',
  },
  {
    icon: icons.product,
    title: 'Product Catalog',
    subtitle: 'FPS Products',
    description: 'Browse insecticides, fungicides and nutrition products.',
    color: '#EEF6FF',
    accent: '#2D76B9',
  },
];

const advisories = [
  { title: 'Pink Bollworm Alert', crop: 'Cotton', tint: '#FDE7F0', pest: '#E25286' },
  { title: 'Whitefly Management', crop: 'Cotton', tint: '#ECFDF3', pest: '#F8FAFC' },
  { title: 'Thrips Control', crop: 'Chilli', tint: '#FFF1E8', pest: '#F97316' },
];

const videos = [
  { title: 'Cotton early stage pest scouting', duration: '05:24', color: '#E5F3DF' },
  { title: 'Chilli disease control practices', duration: '07:12', color: '#FFE7DC' },
  { title: 'Balanced nutrition for better yield', duration: '04:38', color: '#E8F2FF' },
];

const navItems = [
  { label: 'Home', icon: icons.home, active: true },
  { label: 'Advisory', icon: icons.advisory },
  { label: 'Videos', icon: icons.videos },
  { label: 'Products', icon: icons.products },
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
  return (
    <SymbolView
      name={name}
      size={size}
      tintColor={color}
      type="hierarchical"
    />
  );
}

function FarmIllustration() {
  return (
    <View style={[styles.farmArt, styles.noPointer]}>
      <View style={styles.sun} />
      <View style={styles.cloudOne} />
      <View style={styles.cloudTwo} />
      <View style={styles.field}>
        {Array.from({ length: 5 }).map((_, row) => (
          <View key={row} style={[styles.cropRow, { bottom: 4 + row * 11 }]}>
            {Array.from({ length: 7 }).map((__, item) => (
              <View key={item} style={styles.cropPlant}>
                <View style={styles.leafLeft} />
                <View style={styles.leafRight} />
                <View style={[styles.cropDot, item % 2 === 0 ? styles.cottonDot : styles.chilliDot]} />
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.farmer}>
        <View style={styles.hat} />
        <View style={styles.face} />
        <View style={styles.body} />
      </View>
    </View>
  );
}

function FeatureIllustration({ accent }: { accent: string }) {
  return (
    <View style={styles.featureArt}>
      <View style={[styles.artCircle, { backgroundColor: `${accent}1A` }]} />
      <View style={styles.toolHandle} />
      <View style={[styles.toolHead, { borderColor: accent }]} />
      <View style={[styles.artLeafOne, { backgroundColor: accent }]} />
      <View style={[styles.artLeafTwo, { backgroundColor: accent }]} />
    </View>
  );
}

function PestImage({ tint, pest }: { tint: string; pest: string }) {
  return (
    <View style={[styles.pestImage, { backgroundColor: tint }]}>
      <View style={styles.pestLeaf} />
      <View style={[styles.pestBody, { backgroundColor: pest }]} />
      <View style={styles.pestWingLeft} />
      <View style={styles.pestWingRight} />
    </View>
  );
}

function VideoThumb({ color }: { color: string }) {
  return (
    <View style={[styles.videoThumb, { backgroundColor: color }]}>
      <View style={styles.videoHillBack} />
      <View style={styles.videoHillFront} />
      <View style={styles.videoPlant}>
        <View style={styles.videoLeafLeft} />
        <View style={styles.videoLeafRight} />
      </View>
      <View style={styles.playButton}>
        <AppIcon name={icons.play} size={18} color="#FFFFFF" />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.logoWrap}>
            <View style={styles.logoMark}>
              <Text style={styles.logoLeaf}>FPS</Text>
            </View>
            <View>
              <Text style={styles.appName}>Farmer Advisory</Text>
              <Text style={styles.appTag}>Smart crop care</Text>
            </View>
          </View>
          <Pressable style={styles.notificationButton}>
            <AppIcon name={icons.bell} size={20} color={colors.text} />
            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        <View style={styles.greetingBlock}>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.welcome}>Welcome, Mohit</Text>
          <Text style={styles.subtitle}>Let&apos;s keep your crops healthy today.</Text>
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerCopy}>
            <Text style={styles.bannerTitle}>Expert Crop Advisory for Better Yield</Text>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Start Advisory</Text>
              <AppIcon name={icons.arrow} size={17} color="#FFFFFF" />
            </Pressable>
          </View>
          <FarmIllustration />
        </View>

        <View style={styles.featureGrid}>
          {features.map((feature) => (
            <Pressable
              key={feature.title}
              style={styles.featureCard}
              onPress={() => {
                if (feature.title === 'Crop Advisory') {
                  router.push('/select-crop');
                }
              }}>
              <View style={styles.featureTop}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <AppIcon name={feature.icon} color={feature.accent} />
                </View>
                <View style={styles.arrowCircle}>
                  <AppIcon name={icons.arrow} size={16} color={colors.primary} />
                </View>
              </View>
              <FeatureIllustration accent={feature.accent} />
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardSubtitle}>{feature.subtitle}</Text>
              <Text style={styles.cardDescription}>{feature.description}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Advisory</Text>
          <Text style={styles.sectionAction}>View all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {advisories.map((item) => (
            <View key={item.title} style={styles.advisoryCard}>
              <PestImage tint={item.tint} pest={item.pest} />
              <Text style={styles.advisoryTitle}>{item.title}</Text>
              <View style={styles.advisoryFooter}>
                <Text style={styles.cropName}>{item.crop}</Text>
                <Pressable style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest Videos</Text>
          <Text style={styles.sectionAction}>More</Text>
        </View>
        <View style={styles.videoList}>
          {videos.map((video) => (
            <Pressable key={video.title} style={styles.videoCard}>
              <VideoThumb color={video.color} />
              <View style={styles.videoMeta}>
                <View style={styles.durationPill}>
                  <AppIcon name={icons.play} size={10} color={colors.primary} />
                  <Text style={styles.durationText}>{video.duration}</Text>
                </View>
                <Text style={styles.videoTitle}>{video.title}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {navItems.map((item) => (
          <Pressable key={item.label} style={[styles.navItem, item.active && styles.navItemActive]}>
            <AppIcon name={item.icon} size={20} color={item.active ? '#FFFFFF' : '#7C8A80'} />
            <Text style={[styles.navLabel, item.active && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const shadow = {
  shadowColor: '#18451D',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.08,
  shadowRadius: 18,
  elevation: 5,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 118,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  logoWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  logoMark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  logoLeaf: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
  },
  appName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
  },
  appTag: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0,
    marginTop: 2,
  },
  notificationButton: {
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
  notificationDot: {
    backgroundColor: '#EF4444',
    borderColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 2,
    height: 10,
    position: 'absolute',
    right: 13,
    top: 13,
    width: 10,
  },
  greetingBlock: {
    marginBottom: 18,
  },
  greeting: {
    color: colors.secondary,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
  },
  welcome: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 37,
    marginTop: 4,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
    marginTop: 4,
  },
  banner: {
    borderColor: '#DCEEDB',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 176,
    overflow: 'hidden',
    padding: 18,
    ...shadow,
  },
  bannerCopy: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
    zIndex: 2,
  },
  bannerTitle: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 29,
    maxWidth: 210,
  },
  primaryButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 18,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0,
  },
  farmArt: {
    bottom: 0,
    height: 164,
    position: 'absolute',
    right: -3,
    width: 170,
  },
  noPointer: {
    pointerEvents: 'none',
  },
  sun: {
    backgroundColor: '#FFD05C',
    borderRadius: 18,
    height: 36,
    position: 'absolute',
    right: 22,
    top: 16,
    width: 36,
  },
  cloudOne: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 24,
    opacity: 0.9,
    position: 'absolute',
    right: 63,
    top: 24,
    width: 58,
  },
  cloudTwo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    height: 18,
    opacity: 0.9,
    position: 'absolute',
    right: 47,
    top: 36,
    width: 44,
  },
  field: {
    backgroundColor: '#CFE9B5',
    borderTopLeftRadius: 70,
    bottom: -12,
    height: 98,
    overflow: 'hidden',
    position: 'absolute',
    right: -12,
    width: 190,
  },
  cropRow: {
    flexDirection: 'row',
    gap: 11,
    position: 'absolute',
    right: 8,
  },
  cropPlant: {
    alignItems: 'center',
    height: 24,
    justifyContent: 'flex-end',
    width: 13,
  },
  leafLeft: {
    backgroundColor: '#2E7D32',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 13,
    position: 'absolute',
    right: 6,
    top: 5,
    transform: [{ rotate: '-28deg' }],
    width: 9,
  },
  leafRight: {
    backgroundColor: '#43A047',
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 13,
    left: 6,
    position: 'absolute',
    top: 5,
    transform: [{ rotate: '28deg' }],
    width: 9,
  },
  cropDot: {
    borderRadius: 4,
    height: 8,
    position: 'absolute',
    top: 2,
    width: 8,
  },
  cottonDot: {
    backgroundColor: '#FFFFFF',
  },
  chilliDot: {
    backgroundColor: '#E53935',
  },
  farmer: {
    alignItems: 'center',
    bottom: 38,
    position: 'absolute',
    right: 76,
  },
  hat: {
    backgroundColor: colors.accent,
    borderRadius: 12,
    height: 12,
    width: 42,
  },
  face: {
    backgroundColor: '#C98555',
    borderRadius: 12,
    height: 22,
    marginTop: -2,
    width: 22,
  },
  body: {
    backgroundColor: '#3D8B40',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 32,
    marginTop: 1,
    width: 32,
  },
  featureGrid: {
    gap: 14,
    marginTop: 18,
  },
  featureCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 164,
    overflow: 'hidden',
    padding: 18,
    ...shadow,
  },
  featureTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureIcon: {
    alignItems: 'center',
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  arrowCircle: {
    alignItems: 'center',
    backgroundColor: '#F1F8F1',
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  featureArt: {
    height: 54,
    position: 'absolute',
    right: 16,
    top: 62,
    width: 86,
  },
  artCircle: {
    borderRadius: 27,
    height: 54,
    position: 'absolute',
    right: 0,
    width: 54,
  },
  toolHandle: {
    backgroundColor: '#B68655',
    borderRadius: 4,
    height: 42,
    left: 16,
    position: 'absolute',
    top: 11,
    transform: [{ rotate: '28deg' }],
    width: 7,
  },
  toolHead: {
    borderRadius: 9,
    borderWidth: 3,
    height: 22,
    left: 18,
    position: 'absolute',
    top: 5,
    transform: [{ rotate: '28deg' }],
    width: 22,
  },
  artLeafOne: {
    borderBottomLeftRadius: 18,
    borderTopRightRadius: 18,
    height: 24,
    opacity: 0.9,
    position: 'absolute',
    right: 21,
    top: 15,
    transform: [{ rotate: '-24deg' }],
    width: 15,
  },
  artLeafTwo: {
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    height: 24,
    opacity: 0.75,
    position: 'absolute',
    right: 8,
    top: 20,
    transform: [{ rotate: '30deg' }],
    width: 15,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 18,
  },
  cardSubtitle: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
    marginTop: 4,
  },
  cardDescription: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 250,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 26,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0,
  },
  sectionAction: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0,
  },
  horizontalList: {
    gap: 14,
    paddingVertical: 14,
  },
  advisoryCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    width: 172,
    ...shadow,
  },
  pestImage: {
    alignItems: 'center',
    borderRadius: 17,
    height: 92,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pestLeaf: {
    backgroundColor: '#3EA047',
    borderBottomLeftRadius: 32,
    borderTopRightRadius: 32,
    height: 56,
    position: 'absolute',
    transform: [{ rotate: '-18deg' }],
    width: 38,
  },
  pestBody: {
    borderColor: '#263238',
    borderRadius: 12,
    borderWidth: 1,
    height: 25,
    width: 25,
  },
  pestWingLeft: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 13,
    height: 24,
    position: 'absolute',
    right: 76,
    top: 34,
    transform: [{ rotate: '-28deg' }],
    width: 18,
  },
  pestWingRight: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 13,
    height: 24,
    left: 76,
    position: 'absolute',
    top: 34,
    transform: [{ rotate: '28deg' }],
    width: 18,
  },
  advisoryTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 12,
    minHeight: 40,
  },
  advisoryFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cropName: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
  },
  viewButton: {
    backgroundColor: '#EAF7EA',
    borderRadius: 13,
    minHeight: 32,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  viewButtonText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
  },
  videoList: {
    gap: 13,
    marginTop: 14,
  },
  videoCard: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 14,
    minHeight: 104,
    padding: 12,
    ...shadow,
  },
  videoThumb: {
    borderRadius: 17,
    height: 80,
    overflow: 'hidden',
    width: 104,
  },
  videoHillBack: {
    backgroundColor: '#A8D58D',
    borderRadius: 46,
    bottom: -22,
    height: 62,
    left: -10,
    position: 'absolute',
    width: 94,
  },
  videoHillFront: {
    backgroundColor: '#4DA34F',
    borderRadius: 45,
    bottom: -28,
    height: 72,
    position: 'absolute',
    right: -15,
    width: 104,
  },
  videoPlant: {
    bottom: 23,
    position: 'absolute',
    right: 28,
  },
  videoLeafLeft: {
    backgroundColor: '#2E7D32',
    borderBottomLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 26,
    position: 'absolute',
    right: 0,
    transform: [{ rotate: '-25deg' }],
    width: 16,
  },
  videoLeafRight: {
    backgroundColor: '#66BB6A',
    borderBottomRightRadius: 14,
    borderTopLeftRadius: 14,
    height: 26,
    left: 2,
    position: 'absolute',
    transform: [{ rotate: '25deg' }],
    width: 16,
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderColor: '#FFFFFF',
    borderRadius: 19,
    borderWidth: 3,
    height: 38,
    justifyContent: 'center',
    left: 33,
    position: 'absolute',
    top: 21,
    width: 38,
  },
  videoMeta: {
    flex: 1,
  },
  durationPill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F1F8F1',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  durationText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  videoTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 9,
  },
  bottomNav: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderColor: '#DCEADC',
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
    minHeight: 58,
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: colors.primary,
  },
  navLabel: {
    color: '#7C8A80',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
  navLabelActive: {
    color: '#FFFFFF',
  },
});
