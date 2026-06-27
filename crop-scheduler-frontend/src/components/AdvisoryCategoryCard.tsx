import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type AdvisoryCategoryCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  features: Array<{
    label: string;
    icon: ReactNode;
  }>;
  onPress: () => void;
};

const colors = {
  primary: '#2E7D32',
  text: '#1F2937',
  muted: '#6B7280',
  card: '#FFFFFF',
  line: '#E5E7EB',
};

const shadow = {
  shadowColor: '#17231A',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.1,
  shadowRadius: 22,
  elevation: 7,
};

function hexToRgba(hex: string, alpha: number) {
  const cleanHex = hex.replace('#', '');
  const value = parseInt(cleanHex, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export function AdvisoryCategoryCard({
  title,
  description,
  icon,
  color,
  features,
  onPress,
}: AdvisoryCategoryCardProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        android_ripple={{ color: hexToRgba(color, 0.12), borderless: false }}
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.985, { damping: 16, stiffness: 260 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 16, stiffness: 260 });
        }}
        style={[styles.card, title === 'Nutrition Management' && styles.nutritionBorder]}>
        <View style={styles.topRow}>
          <View style={[styles.iconBox, { backgroundColor: color }]}>{icon}</View>

          <View style={styles.copy}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View style={styles.arrowButton}>
            <Text style={styles.arrowText}>→</Text>
          </View>
        </View>

        <View style={[styles.featureGrid, { backgroundColor: hexToRgba(color, 0.075) }]}>
          {features.map((feature, index) => (
            <View key={feature.label} style={styles.featureCell}>
              <View style={styles.featureIcon}>{feature.icon}</View>
              <Text style={styles.featureText}>{feature.label}</Text>
              {index < features.length - 1 ? <View style={styles.divider} /> : null}
            </View>
          ))}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: 'rgba(31,41,55,0.06)',
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 18,
    padding: 20,
    ...shadow,
  },
  nutritionBorder: {
    borderColor: '#37A36A',
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  iconBox: {
    alignItems: 'center',
    borderRadius: 14,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  copy: {
    flex: 1,
    paddingRight: 4,
  },
  title: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 27,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 23,
    marginTop: 8,
  },
  arrowButton: {
    alignItems: 'center',
    backgroundColor: '#DDF2E8',
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  arrowText: {
    color: '#0F5132',
    fontSize: 30,
    fontWeight: '600',
    lineHeight: 34,
  },
  featureGrid: {
    borderRadius: 20,
    flexDirection: 'row',
    marginTop: 24,
    minHeight: 128,
    overflow: 'hidden',
    paddingVertical: 18,
  },
  featureCell: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  featureIcon: {
    alignItems: 'center',
    height: 34,
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 17,
    textAlign: 'center',
  },
  divider: {
    backgroundColor: colors.line,
    bottom: 18,
    position: 'absolute',
    right: 0,
    top: 18,
    width: 1,
  },
});
