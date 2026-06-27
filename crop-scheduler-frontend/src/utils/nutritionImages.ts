import type { ImageSourcePropType } from 'react-native';

export const cottonNutritionImages = {
  'seedling-establishment': require('../../assets/images/Nutrition/cotton/seedling stage.jpg'),
  vegetative: require('../../assets/images/Nutrition/cotton/vegetative stage.jpg'),
  flowering: require('../../assets/images/Nutrition/cotton/flowering stage.jpg'),
  'boll-development': require('../../assets/images/Nutrition/cotton/ball development stage.jpg'),
  'boll-maturity': require('../../assets/images/Nutrition/cotton/ball maturity stage.jpg'),
} satisfies Record<string, ImageSourcePropType>;

export const chilliNutritionImages = {
  nursery: require('../../assets/images/Nutrition/chilli/nursery stage.jpg'),
  transplanting: require('../../assets/images/Nutrition/chilli/transplanting stage.jpg'),
  vegetative: require('../../assets/images/Nutrition/chilli/vegetative stage.jpg'),
  flowering: require('../../assets/images/Nutrition/chilli/flowering stage.jpg'),
  'fruit-setting': require('../../assets/images/Nutrition/chilli/fruit setting stage.jpg'),
  'fruit-development': require('../../assets/images/Nutrition/chilli/fruit development stage.jpg'),
  harvesting: require('../../assets/images/Nutrition/chilli/havrvesting.jpg'),
} satisfies Record<string, ImageSourcePropType>;

const fallbackImage = require('../../assets/images/placeholder.png') as ImageSourcePropType;

export function getNutritionImageSource(cropType: string, stageId?: string): ImageSourcePropType {
  if (!stageId) {
    return fallbackImage;
  }

  if (cropType === 'chilli') {
    return chilliNutritionImages[stageId as keyof typeof chilliNutritionImages] ?? fallbackImage;
  }

  return cottonNutritionImages[stageId as keyof typeof cottonNutritionImages] ?? fallbackImage;
}
