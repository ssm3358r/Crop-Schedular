import { Redirect, useLocalSearchParams } from 'expo-router';

export default function NutritionAdvisoryRedirect() {
  const params = useLocalSearchParams<{ crop?: string; cropType?: string }>();

  return (
    <Redirect
      href={{
        pathname: '/NutritionStagesScreen' as never,
        params: {
          cropType: params.cropType ?? params.crop ?? 'cotton',
        },
      }}
    />
  );
}
