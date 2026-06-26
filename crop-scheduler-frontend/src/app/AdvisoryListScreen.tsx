import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  AdvisoryItem,
  categoryTitles,
  filterAdvisoriesByStage,
  getStageLabel,
  parseCategory,
  parseCrop,
} from '@/utils/advisory';
import { getImageSource } from '@/constants/getImageSource';

const colors = {
  primary: '#0F4D2E',
  primaryLight: '#DDEFE5',
  background: '#F7F6F2',
  card: '#FFFFFF',
  text: '#1F2F27',
  muted: '#6E766F',
  line: '#E5E2DA',
  surface: '#F7F6F2',
};

const icons = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  leaf: { ios: 'leaf.fill', android: 'eco', web: 'eco' },
  empty: { ios: 'tray', android: 'inventory_2', web: 'inventory_2' },
} satisfies Record<string, SymbolViewProps['name']>;

const shadow = {
  shadowColor: '#0F2E1C',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.1,
  shadowRadius: 18,
  elevation: 5,
};

function AppIcon({ name, size = 22, color = colors.primary }: { name: SymbolViewProps['name']; size?: number; color?: string }) {
  return <SymbolView name={name} size={size} tintColor={color} type="hierarchical" />;
}

function StageChip({ stage }: { stage: string }) {
  return (
    <View style={styles.stageChip}>
      <AppIcon name={icons.leaf} size={13} color={colors.primary} />
      <Text style={styles.stageChipText}>{getStageLabel(stage)}</Text>
    </View>
  );
}

function AdvisoryCard({ item, cardWidth }: { item: AdvisoryItem; cardWidth: number }) {
  const openDetails = () => {
    router.push({
      pathname: '/AdvisoryDetailScreen',
      params: { item: JSON.stringify(item) },
    });
  };

  return (
    <Pressable style={({ pressed }) => [styles.card, { width: cardWidth }, pressed && styles.pressed]} onPress={openDetails}>
      <Image source={getImageSource(item.imageKey)} resizeMode="cover" style={styles.cardImage} />
      <View style={styles.cardBody}>
        <Text numberOfLines={2} style={styles.cardTitle}>
          {item.name}
        </Text>
        <Text numberOfLines={3} style={styles.cardDescription}>
          {item.whatIsIt}
        </Text>
        <View style={styles.chipRow}>
          {item.stage.map((stage) => (
            <StageChip key={stage} stage={stage} />
          ))}
        </View>
        <Pressable style={({ pressed }) => [styles.detailButton, pressed && styles.buttonPressed]} onPress={openDetails}>
          <Text style={styles.detailButtonText}>View Details</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

function SkeletonCard({ cardWidth }: { cardWidth: number }) {
  return (
    <View style={[styles.card, styles.skeletonCard, { width: cardWidth }]}>
      <View style={styles.skeletonImage} />
      <View style={styles.cardBody}>
        <View style={[styles.skeletonLine, styles.skeletonTitle]} />
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, styles.skeletonShort]} />
        <View style={styles.skeletonPillRow}>
          <View style={styles.skeletonPill} />
          <View style={styles.skeletonPill} />
        </View>
      </View>
    </View>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyArt}>
        <View style={styles.emptySun} />
        <View style={styles.emptyField} />
        <View style={styles.emptyCircle}>
          <AppIcon name={icons.empty} size={36} color={colors.primary} />
        </View>
      </View>
      <Text style={styles.emptyTitle}>No advisory available</Text>
      <Text style={styles.emptySubtitle}>No records found for selected crop stage.</Text>
    </View>
  );
}

export default function AdvisoryListScreen() {
  const params = useLocalSearchParams<{ crop?: string; stage?: string; category?: string }>();
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  const crop = parseCrop(params.crop);
  const category = parseCategory(params.category);
  const stage = typeof params.stage === 'string' ? params.stage : 'flowering';
  const cardWidth = Math.min(width - 32, 620);

  const advisories = useMemo(() => filterAdvisoriesByStage(crop, category, stage), [crop, category, stage]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timeout);
  }, [crop, category, stage]);

  const renderItem: ListRenderItem<AdvisoryItem> = ({ item }) => <AdvisoryCard item={item} cardWidth={cardWidth} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <AppIcon name={icons.back} color={colors.text} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>{crop === 'chilli' ? 'Chilli' : 'Cotton'} Advisory</Text>
          <Text style={styles.title}>{categoryTitles[category]}</Text>
          <Text style={styles.subtitle}>{getStageLabel(stage)} stage</Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.skeletonList}>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} cardWidth={cardWidth} />
          ))}
        </View>
      ) : (
        <FlatList
          data={advisories}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[styles.listContent, advisories.length === 0 && styles.emptyList]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'flex-start',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    gap: 14,
    paddingHorizontal: 16,
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
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    color: '#DDEFE5',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 34,
    marginTop: 2,
  },
  subtitle: {
    color: '#DDEFE5',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 3,
  },
  listContent: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    ...shadow,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  cardImage: {
    backgroundColor: colors.primaryLight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 180,
    width: '100%',
  },
  cardBody: {
    padding: 16,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 27,
  },
  cardDescription: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  stageChip: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderColor: '#D8D5CC',
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 5,
    minHeight: 30,
    paddingHorizontal: 10,
  },
  stageChipText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  detailButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    marginTop: 16,
    minHeight: 48,
    paddingHorizontal: 18,
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  buttonPressed: {
    opacity: 0.86,
  },
  skeletonList: {
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
  skeletonCard: {
    borderColor: '#E7EEE7',
  },
  skeletonImage: {
    backgroundColor: '#E8F0E8',
    height: 180,
  },
  skeletonLine: {
    backgroundColor: '#E8F0E8',
    borderRadius: 8,
    height: 14,
    marginTop: 12,
    width: '100%',
  },
  skeletonTitle: {
    height: 22,
    marginTop: 0,
    width: '62%',
  },
  skeletonShort: {
    width: '78%',
  },
  skeletonPillRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  skeletonPill: {
    backgroundColor: '#E8F0E8',
    borderRadius: 999,
    height: 30,
    width: 100,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyArt: {
    alignItems: 'center',
    height: 152,
    justifyContent: 'center',
    width: 180,
  },
  emptySun: {
    backgroundColor: '#FFD76A',
    borderRadius: 18,
    height: 36,
    position: 'absolute',
    right: 30,
    top: 16,
    width: 36,
  },
  emptyField: {
    backgroundColor: '#DDEFD8',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    bottom: 18,
    height: 62,
    position: 'absolute',
    width: 162,
  },
  emptyCircle: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 32,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    width: 64,
    ...shadow,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 28,
    marginTop: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 22,
    marginTop: 6,
    textAlign: 'center',
  },
});
