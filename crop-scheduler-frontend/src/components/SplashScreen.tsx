import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';

import logo from '../../assets/images/fps-logo.jpeg';

const AnimatedImage = Animated.createAnimatedComponent(Image);

export default function SplashScreen() {
  const contentOpacity = useSharedValue(0);
  const contentTranslate = useSharedValue(18);
  const spinnerRotation = useSharedValue(0);

  useEffect(() => {
    contentOpacity.value = withDelay(120, withTiming(1, { duration: 850, easing: Easing.out(Easing.cubic) }));
    contentTranslate.value = withDelay(120, withTiming(0, { duration: 850, easing: Easing.out(Easing.cubic) }));
    spinnerRotation.value = withRepeat(
      withTiming(360, { duration: 1100, easing: Easing.linear }),
      -1,
      false
    );
  }, [contentOpacity, contentTranslate, spinnerRotation]);

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslate.value }],
  }));

  const spinnerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinnerRotation.value}deg` }],
  }));

  return (
    <LinearGradient colors={['#0F6B3E', '#4CAF50']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.backgroundArt} pointerEvents="none">
          <LeafOutline style={styles.leafOne} />
          <LeafOutline style={styles.leafTwo} />
          <LeafOutline style={styles.leafThree} />
          <View style={styles.cropSilhouetteLeft}>
            {Array.from({ length: 7 }).map((_, index) => (
              <CropStem key={`left-${index}`} delay={index} />
            ))}
          </View>
          <View style={styles.cropSilhouetteRight}>
            {Array.from({ length: 6 }).map((_, index) => (
              <CropStem key={`right-${index}`} delay={index} />
            ))}
          </View>
        </View>

        <Animated.View style={[styles.centerContent, contentAnimatedStyle]}>
          <View style={styles.logoGlow} />
          <AnimatedImage source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>FPS Crop Scheduler</Text>
          <Text style={styles.subtitle}>Smart Farming Solutions</Text>
        </Animated.View>

        <View style={styles.bottomSection}>
          <Animated.View style={[styles.loader, spinnerAnimatedStyle]}>
            <View style={styles.loaderDot} />
          </Animated.View>
          <Text style={styles.bottomText}>Bringing the World to the Farmer</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function LeafOutline({ style }: { style: object }) {
  return (
    <View style={[styles.leafOutline, style]}>
      <View style={styles.leafVein} />
    </View>
  );
}

function CropStem({ delay }: { delay: number }) {
  return (
    <View style={[styles.cropStem, { marginTop: delay % 2 === 0 ? 8 : 0 }]}>
      <View style={styles.cropLeafLeft} />
      <View style={styles.cropLeafRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundArt: {
    ...StyleSheet.absoluteFill,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoGlow: {
    backgroundColor: 'rgba(255,255,255,0.24)',
    borderRadius: 118,
    height: 236,
    position: 'absolute',
    top: -28,
    width: 236,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.65,
    shadowRadius: 32,
    elevation: 18,
  },
  logo: {
    height: 180,
    width: 180,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 39,
    marginTop: 28,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  bottomSection: {
    alignItems: 'center',
    bottom: 36,
    gap: 14,
    left: 24,
    position: 'absolute',
    right: 24,
  },
  loader: {
    borderColor: 'rgba(255,255,255,0.32)',
    borderRadius: 13,
    borderTopColor: '#FFFFFF',
    borderWidth: 3,
    height: 26,
    width: 26,
  },
  loaderDot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    height: 6,
    position: 'absolute',
    right: 0,
    top: 1,
    width: 6,
  },
  bottomText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
    textAlign: 'center',
  },
  leafOutline: {
    borderColor: 'rgba(255,255,255,0.08)',
    borderTopLeftRadius: 74,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 74,
    borderWidth: 2,
    height: 118,
    position: 'absolute',
    width: 76,
  },
  leafVein: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 1,
    height: 100,
    left: 37,
    position: 'absolute',
    top: 8,
    transform: [{ rotate: '28deg' }],
    width: 2,
  },
  leafOne: {
    left: -14,
    top: 84,
    transform: [{ rotate: '-28deg' }],
  },
  leafTwo: {
    right: 24,
    top: 132,
    transform: [{ rotate: '38deg' }, { scale: 0.78 }],
  },
  leafThree: {
    bottom: 138,
    left: 34,
    transform: [{ rotate: '18deg' }, { scale: 0.62 }],
  },
  cropSilhouetteLeft: {
    alignItems: 'flex-end',
    bottom: 74,
    flexDirection: 'row',
    gap: 16,
    left: -8,
    opacity: 0.08,
    position: 'absolute',
  },
  cropSilhouetteRight: {
    alignItems: 'flex-end',
    bottom: 92,
    flexDirection: 'row',
    gap: 14,
    opacity: 0.06,
    position: 'absolute',
    right: -16,
    transform: [{ scale: 1.18 }],
  },
  cropStem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    height: 92,
    width: 3,
  },
  cropLeafLeft: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 18,
    borderTopRightRadius: 18,
    height: 36,
    position: 'absolute',
    right: 2,
    top: 22,
    transform: [{ rotate: '-32deg' }],
    width: 18,
  },
  cropLeafRight: {
    backgroundColor: '#FFFFFF',
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 18,
    height: 34,
    left: 2,
    position: 'absolute',
    top: 42,
    transform: [{ rotate: '32deg' }],
    width: 18,
  },
});
