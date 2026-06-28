import { RecommendationCard } from '@/components/RecommendationCard';

export function BenefitCard({ benefits }: { benefits: string[] }) {
  return <RecommendationCard title="Benefits" icon="^" items={benefits} />;
}
