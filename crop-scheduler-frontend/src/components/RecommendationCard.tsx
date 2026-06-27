import { PropsWithChildren } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const colors = {
  primary: '#2E7D32',
  lightGreen: '#EAF5E8',
  card: '#FFFFFF',
  text: '#1B1B1B',
  muted: '#66756A',
  line: '#E1E9DD',
};

const shadow = {
  shadowColor: '#1B5E20',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.08,
  shadowRadius: 16,
  elevation: 4,
};

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return <Text style={styles.emptyText}>No information available.</Text>;
  }

  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.row}>
          <Text style={styles.bullet}>{'\u2022'}</Text>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function NutritionInfoCard({
  title,
  icon,
  children,
}: PropsWithChildren<{ title: string; icon: string }>) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export function RecommendationCard({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  return (
    <NutritionInfoCard title={title} icon={icon}>
      <BulletList items={items} />
    </NutritionInfoCard>
  );
}

export { BulletList };

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 14,
    overflow: 'hidden',
    ...shadow,
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    minHeight: 58,
    paddingHorizontal: 16,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: colors.lightGreen,
    borderRadius: 16,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  icon: {
    fontSize: 17,
  },
  title: {
    color: colors.text,
    flex: 1,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0,
  },
  content: {
    padding: 16,
  },
  list: {
    gap: 9,
  },
  row: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
  },
  bullet: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 22,
  },
  itemText: {
    color: colors.muted,
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 22,
  },
  emptyText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 22,
  },
});
