import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { useEffect, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';

const colors = {
  primary: '#0B5D31',
  lightGreen: '#E8F5E9',
  text: '#1F2F27',
  muted: '#657167',
  card: '#FFFFFF',
};

const chips = ['Pest Management', 'Disease Management', 'Nutrition Guide'];

const icons = {
  arrow: { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
} satisfies Record<string, SymbolViewProps['name']>;

type CropCardProps = {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
};

function AppIcon({
  name,
  size,
  color,
}: {
  name: SymbolViewProps['name'];
  size: number;
  color: string;
}) {
  return <SymbolView name={name} size={size} tintColor={color} type="hierarchical" />;
}

export function CropCard({ title, image, onPress }: CropCardProps) {
  const [pressScale] = useState(() => new Animated.Value(1));
  const [entrance] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 420,
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  const animatePress = (toValue: number) => {
    Animated.spring(pressScale, {
      toValue,
      friction: 7,
      tension: 140,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.entrance,
        {
          opacity: entrance,
          transform: [
            {
              translateY: entrance.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
            { scale: pressScale },
          ],
        },
      ]}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={() => animatePress(0.97)}
        onPressOut={() => animatePress(1)}
        style={styles.card}>
        <LinearGradient
          colors={['#E8F5E9', '#D9F0DE', '#F7FFF8']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.imagePanel}>
          <View style={styles.imageBand} pointerEvents="none" />
          <View style={styles.imageCircleOne} pointerEvents="none" />
          <Image source={image} style={styles.cropImage} contentFit="contain" transition={180} />
        </LinearGradient>

        <View style={styles.copy}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Complete advisory for every growth stage</Text>

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
          <AppIcon name={icons.arrow} size={19} color={colors.primary} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const shadow = {
  shadowColor: '#0B3D24',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.1,
  shadowRadius: 14,
  elevation: 4,
};

const imageShadow = {
  shadowColor: '#0B5D31',
  shadowOffset: { width: 0, height: 7 },
  shadowOpacity: 0.12,
  shadowRadius: 11,
  elevation: 4,
};

const styles = StyleSheet.create({
  entrance: {
    marginBottom: 16,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: 'rgba(11,93,49,0.08)',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 138,
    overflow: 'hidden',
    padding: 16,
    paddingRight: 56,
    ...shadow,
  },
  imagePanel: {
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    height: 124,
    justifyContent: 'center',
    marginRight: 16,
    overflow: 'hidden',
    width: 124,
    ...imageShadow,
  },
  imageBand: {
    backgroundColor: 'rgba(11,93,49,0.12)',
    borderRadius: 40,
    height: 80,
    left: -24,
    position: 'absolute',
    top: 15,
    width: 122,
  },
  imageCircleOne: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderRadius: 30,
    height: 60,
    position: 'absolute',
    right: -16,
    top: -14,
    width: 60,
  },
  cropImage: {
    height: 108,
    width: 108,
  },
  copy: {
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 29,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 18,
    marginTop: 4,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    marginTop: 10,
  },
  chip: {
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    borderColor: 'rgba(11,93,49,0.07)',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 5,
    minHeight: 28,
    paddingHorizontal: 9,
  },
  chipText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0,
  },
  arrowCircle: {
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    borderColor: 'rgba(11,93,49,0.08)',
    borderRadius: 21,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    width: 42,
  },
});
