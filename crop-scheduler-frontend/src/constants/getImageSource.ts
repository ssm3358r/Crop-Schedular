import type { ImageSourcePropType } from 'react-native';

import { imageMap } from './imageMap';

export function getImageSource(imageKey?: string): ImageSourcePropType {
  return imageKey && imageKey in imageMap ? imageMap[imageKey as keyof typeof imageMap] : imageMap.placeholder;
}
