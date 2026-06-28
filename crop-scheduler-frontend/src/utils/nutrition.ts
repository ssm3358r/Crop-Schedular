import chilliNutritionData from '@/app/data/chilli-nutrition.json';
import cottonNutritionData from '@/app/data/cotton-nutrition.json';
import type { CropId } from '@/utils/advisory';

export type DeficiencySymptom = {
  nutrient: string;
  symptom: string;
};

export type NutritionStage = {
  id: string;
  title: string;
  duration: string;
  cropType: CropId;
  nutrients: string[];
  deficiencies: DeficiencySymptom[];
  recommendations: string[];
  benefits: string[];
  summary: string;
};

type RawNutrient = {
  name: string;
  purpose: string;
};

type RawNutritionStage = {
  id: string;
  name: string;
  das?: string;
  days?: string;
  whatHappens?: string;
  objective?: string;
  nutrientRequirements?: RawNutrient[];
  importance?: string[];
  deficiencySymptoms?: Record<string, string[]>;
  management?: string[];
  recommendations?: string[];
};

const chilliStageDefaults: Record<string, Pick<NutritionStage, 'nutrients' | 'deficiencies' | 'benefits'>> = {
  nursery: {
    nutrients: ['Phosphorus: supports early root growth', 'Organic matter: improves nursery media health', 'Balanced NPK: supports uniform seedlings'],
    deficiencies: [
      { nutrient: 'Phosphorus', symptom: 'Poor root growth and weak seedlings' },
      { nutrient: 'Nitrogen', symptom: 'Pale green seedlings and slow growth' },
    ],
    benefits: ['Healthy seedling establishment', 'Better transplant survival', 'Uniform crop stand'],
  },
  transplanting: {
    nutrients: ['Phosphorus: supports root establishment', 'Organic carbon: improves soil structure', 'Humic acid: reduces transplanting shock'],
    deficiencies: [
      { nutrient: 'Phosphorus', symptom: 'Delayed root establishment' },
      { nutrient: 'Nitrogen', symptom: 'Pale plants after transplanting' },
    ],
    benefits: ['Faster root recovery', 'Reduced transplanting shock', 'Strong early vegetative growth'],
  },
  vegetative: {
    nutrients: ['Nitrogen: supports branching and leaf growth', 'Potassium: improves plant strength', 'Micronutrients: support active growth'],
    deficiencies: [
      { nutrient: 'Nitrogen', symptom: 'Yellow older leaves and reduced plant height' },
      { nutrient: 'Potassium', symptom: 'Weak stems and marginal scorching' },
      { nutrient: 'Micronutrients', symptom: 'Interveinal chlorosis and poor vigor' },
    ],
    benefits: ['Better branching', 'Improved leaf area', 'Higher photosynthetic capacity'],
  },
  flowering: {
    nutrients: ['Phosphorus: supports flowering', 'Boron: improves pollination', 'Calcium: improves flower retention'],
    deficiencies: [
      { nutrient: 'Boron', symptom: 'Flower drop and poor pollination' },
      { nutrient: 'Calcium', symptom: 'Weak flowers and poor retention' },
      { nutrient: 'Potassium', symptom: 'Reduced flowering strength' },
    ],
    benefits: ['Improved flower retention', 'Better pollination', 'Higher fruit set potential'],
  },
  'fruit-setting': {
    nutrients: ['Potassium: supports fruit retention', 'Calcium: improves fruit firmness', 'Balanced NPK: supports fruit load'],
    deficiencies: [
      { nutrient: 'Potassium', symptom: 'Poor fruit retention and weak fruit growth' },
      { nutrient: 'Calcium', symptom: 'Fruit quality issues and weak tissues' },
    ],
    benefits: ['Better fruit retention', 'Reduced fruit drop', 'Improved early fruit quality'],
  },
  'fruit-development': {
    nutrients: ['Potassium: improves fruit size and color', 'Micronutrients: support quality', 'Calcium: supports fruit firmness'],
    deficiencies: [
      { nutrient: 'Potassium', symptom: 'Small fruits and poor color development' },
      { nutrient: 'Micronutrients', symptom: 'Poor vigor and uneven fruit development' },
    ],
    benefits: ['Improved fruit size', 'Better fruit color', 'Higher marketable quality'],
  },
  harvesting: {
    nutrients: ['Potassium: maintains fruit quality', 'Nitrogen: supports continued flushes in small doses', 'Balanced irrigation nutrition: maintains productivity'],
    deficiencies: [
      { nutrient: 'Potassium', symptom: 'Reduced fruit quality and weak plants' },
      { nutrient: 'Nitrogen', symptom: 'Reduced new flush and pale foliage' },
    ],
    benefits: ['Maintains productivity', 'Supports repeated picking', 'Improves marketable yield'],
  },
};

function titleCase(value: string) {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function flattenDeficiencies(deficiencySymptoms?: Record<string, string[]>): DeficiencySymptom[] {
  return Object.entries(deficiencySymptoms ?? {}).flatMap(([nutrient, symptoms]) =>
    symptoms.map((symptom) => ({ nutrient: titleCase(nutrient), symptom })),
  );
}

function normalizeStage(stage: RawNutritionStage, cropType: CropId): NutritionStage {
  const defaults = cropType === 'chilli' ? chilliStageDefaults[stage.id] : undefined;
  const nutrients = stage.nutrientRequirements?.map(({ name, purpose }) => `${name}: ${purpose}`) ?? defaults?.nutrients ?? [];
  const deficiencies = flattenDeficiencies(stage.deficiencySymptoms);

  return {
    id: stage.id,
    title: stage.name,
    duration: stage.das ?? stage.days ?? 'Stage duration varies',
    cropType,
    nutrients,
    deficiencies: deficiencies.length > 0 ? deficiencies : defaults?.deficiencies ?? [],
    recommendations: stage.management ?? stage.recommendations ?? [],
    benefits: stage.importance ?? defaults?.benefits ?? (stage.objective ? [stage.objective] : []),
    summary: stage.whatHappens ?? stage.objective ?? 'Stage-wise nutrition guidance for healthier crop growth.',
  };
}

export function getNutritionStages(cropType: CropId): NutritionStage[] {
  const data = cropType === 'chilli' ? chilliNutritionData : cottonNutritionData;
  return (data.nutritionStages as RawNutritionStage[]).map((stage) => normalizeStage(stage, cropType));
}

export function getNutritionStage(cropType: CropId, stageId: string): NutritionStage | undefined {
  return getNutritionStages(cropType).find((stage) => stage.id === stageId);
}
