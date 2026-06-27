import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { useMemo, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BenefitCard } from '@/components/BenefitCard';
import { DeficiencyCard } from '@/components/DeficiencyCard';
import { NutrientRequirementsCard } from '@/components/NutrientRequirementsCard';
import { RecommendationCard } from '@/components/RecommendationCard';
import { parseCrop } from '@/utils/advisory';
import { getNutritionStage } from '@/utils/nutrition';
import { getNutritionImageSource } from '@/utils/nutritionImages';

const colors = {
  primary: '#2E7D32',
  lightGreen: '#EAF5E8',
  background: '#F6F8F2',
  card: '#FFFFFF',
  text: '#1B1B1B',
  muted: '#66756A',
  line: '#E1E9DD',
};

const icons = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  bookmark: { ios: 'bookmark', android: 'bookmark_border', web: 'bookmark_border' },
  bookmarkFill: { ios: 'bookmark.fill', android: 'bookmark', web: 'bookmark' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  share: { ios: 'square.and.arrow.up', android: 'share', web: 'share' },
} satisfies Record<string, SymbolViewProps['name']>;

const shadow = {
  shadowColor: '#1B5E20',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 18,
  elevation: 5,
};

function AppIcon({ name, size = 22, color = colors.primary }: { name: SymbolViewProps['name']; size?: number; color?: string }) {
  return <SymbolView name={name} size={size} tintColor={color} type="hierarchical" />;
}

export default function NutritionDetailScreen() {
  const params = useLocalSearchParams<{ cropType?: string; crop?: string; stageId?: string }>();
  const cropType = parseCrop(params.cropType ?? params.crop);
  const stageId = typeof params.stageId === 'string' ? params.stageId : '';
  const stage = useMemo(() => getNutritionStage(cropType, stageId), [cropType, stageId]);
  const [bookmarked, setBookmarked] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  if (!stage) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.missingWrap}>
          <Pressable style={styles.iconButton} onPress={() => router.back()}>
            <AppIcon name={icons.back} color={colors.text} />
          </Pressable>
          <Text style={styles.missingTitle}>Nutrition stage not found</Text>
          <Text style={styles.missingText}>Please go back and select a stage again.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const imageSource = getNutritionImageSource(cropType, stage.id);
  const cropName = cropType === 'chilli' ? 'Chilli' : 'Cotton';

  const shareAdvice = async () => {
    await Share.share({
      title: `${cropName} ${stage.title}`,
      message: `${cropName} Nutrition - ${stage.title}\n\nNutrients:\n${stage.nutrients.join('\n')}\n\nRecommendations:\n${stage.recommendations.join('\n')}`,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.appBar}>
          <Pressable style={styles.iconButton} onPress={() => router.back()}>
            <AppIcon name={icons.back} color={colors.text} />
          </Pressable>
          <View style={styles.actions}>
            <Pressable style={styles.iconButton} onPress={() => setBookmarked((value) => !value)}>
              <AppIcon name={bookmarked ? icons.bookmarkFill : icons.bookmark} color={colors.primary} />
            </Pressable>
            <Pressable style={styles.iconButton} onPress={shareAdvice}>
              <AppIcon name={icons.share} color={colors.primary} />
            </Pressable>
          </View>
        </View>

        <Animated.View entering={FadeInUp.duration(260)} style={styles.titleCard}>
          <Text style={styles.eyebrow}>{cropName} Nutrition</Text>
          <Text style={styles.title}>{stage.title}</Text>
          <Text style={styles.duration}>{stage.duration}</Text>
          <Text style={styles.summary}>{stage.summary}</Text>
        </Animated.View>

        <Pressable style={styles.imageWrap} onPress={() => setImageOpen(true)}>
          <Image source={imageSource} resizeMode="cover" style={styles.heroImage} />
        </Pressable>

        <Animated.View entering={FadeInUp.delay(80).duration(260)}>
          <NutrientRequirementsCard nutrients={stage.nutrients} />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(120).duration(260)}>
          <DeficiencyCard deficiencies={stage.deficiencies} />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(160).duration(260)}>
          <RecommendationCard title="Management Recommendations" icon="+" items={stage.recommendations} />
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200).duration(260)}>
          <BenefitCard benefits={stage.benefits} />
        </Animated.View>
      </ScrollView>

      <Modal visible={imageOpen} transparent animationType="fade" onRequestClose={() => setImageOpen(false)}>
        <View style={styles.modalBackdrop}>
          <Pressable style={styles.modalClose} onPress={() => setImageOpen(false)}>
            <AppIcon name={icons.close} color="#FFFFFF" />
          </Pressable>
          <Image source={imageSource} resizeMode="contain" style={styles.zoomImage} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 28,
  },
  appBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
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
  titleCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    ...shadow,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 34,
    marginTop: 5,
  },
  duration: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 7,
  },
  summary: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 23,
    marginTop: 10,
  },
  imageWrap: {
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    height: 250,
    marginTop: 16,
    overflow: 'hidden',
    ...shadow,
  },
  heroImage: {
    borderRadius: 20,
    height: '100%',
    width: '100%',
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.88)',
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  modalClose: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 18,
    height: 48,
    justifyContent: 'center',
    position: 'absolute',
    right: 18,
    top: 44,
    width: 48,
  },
  zoomImage: {
    height: '78%',
    width: '100%',
  },
  missingWrap: {
    flex: 1,
    padding: 20,
  },
  missingTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 32,
    marginTop: 24,
  },
  missingText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 22,
    marginTop: 8,
  },
});
