import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import type { NutritionStage } from '@/utils/nutrition';

const colors = {
  primary: '#2E7D32',
  card: '#FFFFFF',
  text: '#1B1B1B',
  muted: '#66756A',
  line: '#E1E9DD',
};

const shadow = {
  shadowColor: '#1B5E20',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 18,
  elevation: 5,
};

export function NutritionCard({
  stage,
  imageSource,
  onPress,
}: {
  stage: NutritionStage;
  imageSource: ImageSourcePropType;
  onPress: () => void;
}) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.pressed]} onPress={onPress}>
      <Image source={imageSource} resizeMode="cover" style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.title}>{stage.title}</Text>
        <Text style={styles.duration}>{stage.duration}</Text>
        <Text numberOfLines={2} style={styles.summary}>
          {stage.summary}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    ...shadow,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  image: {
    backgroundColor: '#EAF5E8',
    height: 180,
    width: '100%',
  },
  body: {
    padding: 16,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 26,
  },
  duration: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 5,
  },
  summary: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 8,
  },
});
