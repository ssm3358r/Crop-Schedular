import chilliDiseasesData from '@/app/data/chilli-diseases.json';
import chilliNutritionData from '@/app/data/chilli-nutrition.json';
import chilliData from '@/app/data/chilli.json';
import cottonDiseasesData from '@/app/data/cotton-diseases.json';
import cottonNutritionData from '@/app/data/cotton-nutrition.json';
import cottonData from '@/app/data/cotton.json';

export type CropId = 'cotton' | 'chilli';
export type AdvisoryCategory = 'pest' | 'disease' | 'nutrition';

export type RecommendedProduct = {
  name: string;
  activeIngredient?: string;
};

export type AdvisorySolution = Record<string, string[]>;

export type AdvisoryItem = {
  id: string;
  name: string;
  crop: CropId;
  category: AdvisoryCategory;
  imageKey?: string;
  stage: string[];
  whatIsIt: string;
  whenOccurs: string[];
  symptoms: string[];
  damage: string[];
  solution: AdvisorySolution;
  recommendedProducts: RecommendedProduct[];
  scientificName?: string;
};

type RawAdvisory = {
  id: string;
  name: string;
  imageKey?: string;
  stage?: string[];
  whatIsIt?: string;
  whenOccurs?: string[];
  symptoms?: string[];
  damage?: string[];
  solution?: AdvisorySolution;
  recommendedProducts?: RecommendedProduct[];
  scientificName?: string;
};

type RawNutritionStage = {
  id: string;
  name: string;
  das?: string;
  days?: string;
  whatHappens?: string;
  objective?: string;
  nutrientRequirements?: Array<{ name: string; purpose: string }>;
  importance?: string[];
  deficiencySymptoms?: Record<string, string[]>;
  management?: string[];
  recommendations?: string[];
};

const dataByCrop = {
  cotton: {
    pest: cottonData.pests,
    disease: cottonDiseasesData.diseases,
    nutrition: cottonNutritionData.nutritionStages,
  },
  chilli: {
    pest: chilliData.pests,
    disease: chilliDiseasesData.diseases,
    nutrition: chilliNutritionData.nutritionStages,
  },
} satisfies Record<CropId, Record<AdvisoryCategory, unknown[]>>;

export const categoryTitles: Record<AdvisoryCategory, string> = {
  pest: 'Pest Management',
  disease: 'Disease Management',
  nutrition: 'Nutrition Management',
};

export const stageLabels: Record<string, string> = {
  'seedling-establishment': 'Seedling & Establishment',
  'early-growth': 'Early Growth',
  vegetative: 'Vegetative',
  flowering: 'Flowering',
  'boll-development': 'Boll Development',
  'boll-maturity': 'Boll Maturity',
  nursery: 'Nursery',
  transplanting: 'Transplanting',
  'fruit-setting': 'Fruit Setting',
  'fruit-development': 'Fruit Development',
  fruiting: 'Fruiting',
  harvesting: 'Harvesting',
};

const stageAliases: Record<string, string[]> = {
  'early-growth': ['seedling-establishment'],
};

function toTitleCase(value: string) {
  return value
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getStageLabel(stage: string) {
  return stageLabels[stage] ?? toTitleCase(stage);
}

function normalizeSolution(solution?: AdvisorySolution) {
  return Object.fromEntries(
    Object.entries(solution ?? {}).filter(([, values]) => Array.isArray(values) && values.length > 0),
  );
}

function normalizeStandardItem(item: RawAdvisory, crop: CropId, category: Exclude<AdvisoryCategory, 'nutrition'>): AdvisoryItem {
  return {
    id: item.id,
    name: item.name,
    crop,
    category,
    imageKey: item.imageKey,
    stage: item.stage ?? [],
    whatIsIt: item.whatIsIt ?? 'Advisory information is being prepared for this record.',
    whenOccurs: item.whenOccurs ?? [],
    symptoms: item.symptoms ?? [],
    damage: item.damage ?? [],
    solution: normalizeSolution(item.solution),
    recommendedProducts: item.recommendedProducts ?? [],
    scientificName: item.scientificName,
  };
}

function normalizeNutritionItem(item: RawNutritionStage, crop: CropId): AdvisoryItem {
  const nutrientSymptoms = Object.entries(item.deficiencySymptoms ?? {}).flatMap(([nutrient, symptoms]) =>
    symptoms.map((symptom) => `${toTitleCase(nutrient)}: ${symptom}`),
  );
  const nutrientNeeds = item.nutrientRequirements?.map(({ name, purpose }) => `${name}: ${purpose}`) ?? [];
  const management = item.management ?? item.recommendations ?? [];

  return {
    id: item.id,
    name: item.name,
    crop,
    category: 'nutrition',
    stage: [item.id],
    whatIsIt: item.whatHappens ?? item.objective ?? 'Stage-wise crop nutrition recommendation.',
    whenOccurs: [item.das, item.days].filter(Boolean) as string[],
    symptoms: nutrientSymptoms.length > 0 ? nutrientSymptoms : nutrientNeeds,
    damage: item.importance ?? (item.objective ? [item.objective] : []),
    solution: {
      cultural: management,
    },
    recommendedProducts: [],
  };
}

export function getAdvisories(crop: CropId, category: AdvisoryCategory): AdvisoryItem[] {
  const records = dataByCrop[crop][category];

  if (category === 'nutrition') {
    return (records as RawNutritionStage[]).map((item) => normalizeNutritionItem(item, crop));
  }

  return (records as RawAdvisory[]).map((item) => normalizeStandardItem(item, crop, category));
}

export function filterAdvisoriesByStage(crop: CropId, category: AdvisoryCategory, stage: string): AdvisoryItem[] {
  const selectedStage = stage.trim().toLowerCase();
  const matchingStages = new Set([selectedStage, ...(stageAliases[selectedStage] ?? [])]);

  return getAdvisories(crop, category).filter((item) =>
    item.stage.some((itemStage) => matchingStages.has(itemStage.trim().toLowerCase())),
  );
}

export function parseCrop(value: string | string[] | undefined): CropId {
  return value === 'chilli' ? 'chilli' : 'cotton';
}

export function parseCategory(value: string | string[] | undefined): AdvisoryCategory {
  if (value === 'disease' || value === 'nutrition') {
    return value;
  }

  return 'pest';
}
