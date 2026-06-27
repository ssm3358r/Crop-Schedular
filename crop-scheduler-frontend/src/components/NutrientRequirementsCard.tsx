import { RecommendationCard } from '@/components/RecommendationCard';

export function NutrientRequirementsCard({ nutrients }: { nutrients: string[] }) {
  return <RecommendationCard title="Nutrient Requirements" icon="N" items={nutrients} />;
}
