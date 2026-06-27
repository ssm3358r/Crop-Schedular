import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { NutritionCard } from '@/components/NutritionCard';
import { parseCrop } from '@/utils/advisory';
import { getNutritionStages, NutritionStage } from '@/utils/nutrition';
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
  nutrition: { ios: 'drop.fill', android: 'water_drop', web: 'water_drop' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
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

function EmptyState() {
  return (
    <View style={styles.emptyWrap}>
      <View style={styles.emptyIcon}>
        <AppIcon name={icons.nutrition} size={36} />
      </View>
      <Text style={styles.emptyTitle}>No nutrition stage found</Text>
      <Text style={styles.emptySubtitle}>Try a different search term.</Text>
    </View>
  );
}

export default function NutritionStagesScreen() {
  const params = useLocalSearchParams<{ crop?: string; cropType?: string }>();
  const cropType = parseCrop(params.cropType ?? params.crop);
  const cropName = cropType === 'chilli' ? 'Chilli' : 'Cotton';
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const stages = useMemo(() => getNutritionStages(cropType), [cropType]);

  const filteredStages = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return stages;
    }

    return stages.filter((stage) =>
      [stage.title, stage.duration, stage.summary, ...stage.nutrients, ...stage.recommendations]
        .join(' ')
        .toLowerCase()
        .includes(search),
    );
  }, [query, stages]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 450);
  }, []);

  const renderItem = ({ item, index }: { item: NutritionStage; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 45).duration(240)}>
      <NutritionCard
        stage={item}
        imageSource={getNutritionImageSource(cropType, item.id)}
        onPress={() =>
          router.push({
            pathname: '/NutritionDetailScreen' as never,
            params: { cropType, stageId: item.id },
          })
        }
      />
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <AppIcon name={icons.back} color={colors.text} />
        </Pressable>
        <View style={styles.headerCopy}>
          <Text style={styles.eyebrow}>{cropName} Advisory</Text>
          <Text style={styles.title}>Nutrition Management</Text>
          <Text style={styles.subtitle}>Stage-wise nutrient planning</Text>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <AppIcon name={icons.search} size={18} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search nutrition stages"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
      </View>

      <FlatList
        data={filteredStages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[styles.listContent, filteredStages.length === 0 && styles.emptyList]}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
      />
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
  searchWrap: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    margin: 16,
    minHeight: 50,
    paddingHorizontal: 14,
    ...shadow,
  },
  searchInput: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    paddingVertical: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyWrap: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIcon: {
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    borderRadius: 34,
    height: 68,
    justifyContent: 'center',
    width: 68,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 14,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    marginTop: 6,
    textAlign: 'center',
  },
});
