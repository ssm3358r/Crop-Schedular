import { StyleSheet, Text, View } from 'react-native';

import { NutritionInfoCard } from '@/components/RecommendationCard';
import type { DeficiencySymptom } from '@/utils/nutrition';

export function DeficiencyCard({ deficiencies }: { deficiencies: DeficiencySymptom[] }) {
  return (
    <NutritionInfoCard title="Deficiency Symptoms" icon="!">
      {deficiencies.length === 0 ? (
        <Text style={styles.emptyText}>No deficiency symptoms listed for this stage.</Text>
      ) : (
        <View style={styles.stack}>
          {deficiencies.map((item, index) => (
            <View key={`${item.nutrient}-${item.symptom}-${index}`} style={styles.block}>
              <Text style={styles.nutrient}>{item.nutrient}</Text>
              <Text style={styles.symptom}>{'\u2022'} {item.symptom}</Text>
            </View>
          ))}
        </View>
      )}
    </NutritionInfoCard>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 12,
  },
  block: {
    backgroundColor: '#FFFDF7',
    borderColor: '#EFE3BE',
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  nutrient: {
    color: '#1B1B1B',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 0,
  },
  symptom: {
    color: '#66756A',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 6,
  },
  emptyText: {
    color: '#66756A',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 22,
  },
});
