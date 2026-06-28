import type { ImageSourcePropType } from 'react-native';

export const imageMap = {
  aphids: require('../../assets/images/pests/cotton/Aphids.png'),
  'pink-bollworm': require('../../assets/images/pests/cotton/pink-ballworm.png'),
  'whitefly-cotton': require('../../assets/images/pests/cotton/Whitefly.png'),
  'american-bollworm': require('../../assets/images/pests/cotton/American ballworm.jpg'),
  jassids: require('../../assets/images/pests/cotton/jassids.jpg'),

  thrips: require('../../assets/images/pests/chilli/thrips.jpg'),
  'whitefly-chilli': require('../../assets/images/pests/chilli/whitefly.png'),
  mites: require('../../assets/images/pests/chilli/mites.jpg'),
  'fruit-borer': require('../../assets/images/pests/chilli/fruit borer.png'),

  'root-rot': require('../../assets/images/diseases/cotton/Rootrot.jpg'),
  'leaf-curl-virus-cotton': require('../../assets/images/diseases/cotton/Cotton leaf curl virus.jpg'),
  'fusarium-wilt': require('../../assets/images/diseases/cotton/Furasium.jpg'),
  'alternaria-leaf-spot': require('../../assets/images/diseases/cotton/Alternaria leaf spot.jpg'),

  anthracnose: require('../../assets/images/diseases/chilli/Anthracnose.png'),
  'damping-off': require('../../assets/images/diseases/chilli/Damping off.png'),
  'leaf-curl-virus-chilli': require('../../assets/images/diseases/chilli/Leaf curl virus.png'),
  'powdery-mildew': require('../../assets/images/diseases/chilli/powdery mildew.png'),

  cotton: require('../../assets/images/crops/cotton.png'),
  chilli: require('../../assets/images/crops/chilli.png'),
  placeholder: require('../../assets/images/placeholder.png'),
} satisfies Record<string, ImageSourcePropType>;

export type ImageKey = keyof typeof imageMap;
