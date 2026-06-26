import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';

import { colors } from '@/constants/colors';

type HeroCardAction = {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
};

type HeroCardPill = {
  label: string;
  icon?: ReactNode;
};

type HeroCardProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: HeroCardAction;
  pills?: HeroCardPill[];
  centered?: boolean;
  icon?: ReactNode;
  iconBackground?: string;
  style?: ViewStyle;
};

const shadow = {
  shadowColor: colors.shadow,
  shadowOffset: { width: 0, height: 14 },
  shadowOpacity: 0.18,
  shadowRadius: 22,
  elevation: 8,
};

export function HeroCard({
  eyebrow,
  title,
  subtitle,
  action,
  pills,
  centered = false,
  icon,
  iconBackground = 'rgba(255,255,255,0.16)',
  style,
}: HeroCardProps) {
  return (
    <View style={[styles.wrapper, style]}>
      <LinearGradient
        colors={['#1B4332', '#2D6A4F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, centered && styles.cardCentered]}>
        <View style={styles.blobOne} pointerEvents="none" />
        <View style={styles.blobTwo} pointerEvents="none" />
        <View style={styles.blobThree} pointerEvents="none" />

        {centered ? (
          <View style={styles.centeredContent}>
            {eyebrow ? (
              <View style={[styles.eyebrowBadge, styles.eyebrowBadgeCentered]}>
                <Text style={styles.eyebrowText}>{eyebrow}</Text>
              </View>
            ) : null}
            {icon ? (
              <View style={[styles.iconRing, { backgroundColor: iconBackground }]}>{icon}</View>
            ) : null}
            <Text style={styles.titleCentered}>{title}</Text>
            {subtitle ? <Text style={styles.subtitleCentered}>{subtitle}</Text> : null}
            {pills && pills.length > 0 ? (
              <View style={[styles.pillRow, styles.pillRowCentered]}>
                {pills.map((pill) => (
                  <View key={pill.label} style={styles.pill}>
                    {pill.icon}
                    <Text style={styles.pillText}>{pill.label}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.contentBlock}>
            {eyebrow ? (
              <View style={styles.eyebrowBadge}>
                <Text style={styles.eyebrowText}>{eyebrow}</Text>
              </View>
            ) : null}
            <Text style={styles.title}>{title}</Text>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            {pills && pills.length > 0 ? (
              <View style={styles.pillRow}>
                {pills.map((pill) => (
                  <View key={pill.label} style={styles.pill}>
                    {pill.icon}
                    <Text style={styles.pillText}>{pill.label}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            {action ? (
              <Pressable
                style={({ pressed }) => [styles.actionButton, pressed && styles.actionPressed]}
                onPress={action.onPress}>
                <Text style={styles.actionLabel}>{action.label}</Text>
                {action.icon}
              </Pressable>
            ) : null}
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...shadow,
    borderRadius: 24,
  },
  card: {
    borderRadius: 24,
    minHeight: 0,
    overflow: 'hidden',
    padding: 20,
  },
  cardCentered: {
    alignItems: 'center',
    minHeight: 0,
    paddingHorizontal: 22,
    paddingVertical: 28,
  },
  blobOne: {
    backgroundColor: 'rgba(124,179,66,0.14)',
    borderRadius: 80,
    height: 160,
    position: 'absolute',
    right: -40,
    top: -50,
    width: 160,
  },
  blobTwo: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 60,
    bottom: -30,
    height: 120,
    left: -20,
    position: 'absolute',
    width: 120,
  },
  blobThree: {
    backgroundColor: 'rgba(124,179,66,0.1)',
    borderRadius: 40,
    bottom: 20,
    height: 80,
    position: 'absolute',
    right: 80,
    width: 80,
  },
  contentBlock: {
    justifyContent: 'center',
    zIndex: 2,
  },
  centeredContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  eyebrowBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(124,179,66,0.22)',
    borderColor: 'rgba(124,179,66,0.35)',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  eyebrowBadgeCentered: {
    alignSelf: 'center',
  },
  eyebrowText: {
    color: '#C8E6C9',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.3,
    lineHeight: 28,
  },
  titleCentered: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: -0.3,
    lineHeight: 32,
    marginTop: 4,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 8,
  },
  subtitleCentered: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  pillRowCentered: {
    justifyContent: 'center',
  },
  pill: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
  },
  actionButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    minHeight: 46,
    paddingHorizontal: 18,
  },
  actionPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  actionLabel: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0,
  },
  iconRing: {
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.22)',
    borderRadius: 32,
    borderWidth: 1,
    height: 72,
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 4,
    width: 72,
  },
});
