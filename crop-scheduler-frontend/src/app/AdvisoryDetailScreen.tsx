import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import type { SymbolViewProps } from 'expo-symbols';
import { PropsWithChildren, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AdvisoryItem, getStageLabel } from '@/utils/advisory';
import { getImageSource } from '@/constants/getImageSource';

const colors = {
  primary: '#0F4D2E',
  primaryLight: '#DDEFE5',
  background: '#F7F6F2',
  card: '#FFFFFF',
  text: '#1F2F27',
  muted: '#6E766F',
  line: '#E5E2DA',
  warning: '#B88316',
};

const icons = {
  back: { ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' },
  chevron: { ios: 'chevron.down', android: 'expand_more', web: 'expand_more' },
  leaf: { ios: 'leaf.fill', android: 'eco', web: 'eco' },
} satisfies Record<string, SymbolViewProps['name']>;

const sectionTitles: Record<string, string> = {
  biological: 'Biological Control',
  botanical: 'Botanical Control',
  chemical: 'Chemical Control',
  cultural: 'Cultural Practices',
  monitoring: 'Monitoring',
  preventive: 'Preventive Practices',
  seedTreatment: 'Seed Treatment',
  soilManagement: 'Soil Management',
  vectorManagement: 'Vector Management',
};

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

function readItemParam(value: string | string[] | undefined): AdvisoryItem | null {
  const itemValue = Array.isArray(value) ? value[0] : value;

  if (!itemValue) {
    return null;
  }

  try {
    return JSON.parse(itemValue) as AdvisoryItem;
  } catch {
    return null;
  }
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <Text style={styles.emptyText}>No information available.</Text>;
  }

  return (
    <View style={styles.bulletList}>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.bulletRow}>
          <Text style={styles.bulletMark}>{'\u2022'}</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: PropsWithChildren<{ title: string; defaultOpen?: boolean }>) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <View style={styles.sectionCard}>
      <Pressable style={styles.sectionHeader} onPress={() => setIsOpen((value) => !value)}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={[styles.chevronWrap, isOpen && styles.chevronOpen]}>
          <AppIcon name={icons.chevron} size={18} color={colors.primary} />
        </View>
      </Pressable>
      {isOpen && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );
}

function SolutionBlocks({ item }: { item: AdvisoryItem }) {
  const entries = Object.entries(item.solution);

  if (entries.length === 0) {
    return <Text style={styles.emptyText}>No solution information available.</Text>;
  }

  return (
    <View style={styles.solutionStack}>
      {entries.map(([key, values]) => (
        <View key={key} style={styles.solutionBlock}>
          <Text style={styles.solutionTitle}>{sectionTitles[key] ?? key}</Text>
          <BulletList items={values} />
        </View>
      ))}
    </View>
  );
}

function ProductCards({ item }: { item: AdvisoryItem }) {
  if (item.recommendedProducts.length === 0) {
    return <Text style={styles.emptyText}>No recommended products listed for this advisory.</Text>;
  }

  return (
    <View style={styles.productGrid}>
      {item.recommendedProducts.map((product) => (
        <View key={product.name} style={styles.productCard}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productIngredient}>{product.activeIngredient ?? 'Active ingredient not specified'}</Text>
          <Pressable style={({ pressed }) => [styles.productButton, pressed && styles.buttonPressed]}>
            <Text style={styles.productButtonText}>View Product</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
}

function StageChip({ stage }: { stage: string }) {
  return (
    <View style={styles.stageChip}>
      <AppIcon name={icons.leaf} size={13} color={colors.primary} />
      <Text style={styles.stageChipText}>{getStageLabel(stage)}</Text>
    </View>
  );
}

export default function AdvisoryDetailScreen() {
  const params = useLocalSearchParams<{ item?: string }>();
  const item = useMemo(() => readItemParam(params.item), [params.item]);

  if (!item) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.missingWrap}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <AppIcon name={icons.back} color={colors.text} />
          </Pressable>
          <Text style={styles.missingTitle}>Advisory not found</Text>
          <Text style={styles.missingText}>Please go back and select an advisory again.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={getImageSource(item.imageKey)} resizeMode="cover" style={styles.heroImage} />
          <Pressable style={styles.floatingBackButton} onPress={() => router.back()}>
            <AppIcon name={icons.back} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.titleCard}>
          <Text style={styles.categoryLabel}>{item.category.toUpperCase()}</Text>
          <Text style={styles.title}>{item.name}</Text>
          {item.scientificName ? <Text style={styles.scientificName}>{item.scientificName}</Text> : null}
          <View style={styles.chipRow}>
            {item.stage.map((stage) => (
              <StageChip key={stage} stage={stage} />
            ))}
          </View>
        </View>

        <CollapsibleSection title="What is it?" defaultOpen>
          <Text style={styles.paragraph}>{item.whatIsIt}</Text>
        </CollapsibleSection>

        <CollapsibleSection title="When does it occur?">
          <BulletList items={item.whenOccurs} />
        </CollapsibleSection>

        <CollapsibleSection title="Symptoms">
          <BulletList items={item.symptoms} />
        </CollapsibleSection>

        <CollapsibleSection title="Damage">
          <BulletList items={item.damage} />
        </CollapsibleSection>

        <CollapsibleSection title="Solutions" defaultOpen>
          <SolutionBlocks item={item} />
        </CollapsibleSection>

        <CollapsibleSection title="Recommended Products">
          <ProductCards item={item} />
        </CollapsibleSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: 28,
  },
  hero: {
    backgroundColor: colors.primaryLight,
    height: 250,
    position: 'relative',
  },
  heroImage: {
    borderRadius: 20,
    height: '100%',
    width: '100%',
  },
  floatingBackButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    height: 48,
    justifyContent: 'center',
    left: 16,
    position: 'absolute',
    top: 14,
    width: 48,
    ...shadow,
  },
  titleCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: -34,
    padding: 18,
    ...shadow,
  },
  categoryLabel: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 34,
    marginTop: 5,
  },
  scientificName: {
    color: colors.muted,
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 5,
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
  sectionCard: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 16,
    marginTop: 14,
    overflow: 'hidden',
    ...shadow,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 58,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: colors.text,
    flex: 1,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0,
  },
  chevronWrap: {
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  sectionContent: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    padding: 16,
  },
  paragraph: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 23,
  },
  bulletList: {
    gap: 9,
  },
  bulletRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
  },
  bulletMark: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 22,
  },
  bulletText: {
    color: colors.muted,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
  },
  solutionStack: {
    gap: 14,
  },
  solutionBlock: {
    backgroundColor: '#FAFDFA',
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  solutionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 10,
  },
  productGrid: {
    gap: 12,
  },
  productCard: {
    backgroundColor: '#FAFDFA',
    borderColor: colors.line,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
  },
  productName: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 22,
  },
  productIngredient: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 20,
    marginTop: 5,
  },
  productButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 42,
    paddingHorizontal: 16,
  },
  productButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0,
  },
  buttonPressed: {
    opacity: 0.86,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 22,
  },
  missingWrap: {
    flex: 1,
    padding: 20,
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
