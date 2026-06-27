import { Redirect, useLocalSearchParams } from 'expo-router';

export default function DiseaseListRedirect() {
  const params = useLocalSearchParams<{ crop?: string; stage?: string }>();

  return (
    <Redirect
      href={{
        pathname: '/AdvisoryListScreen',
        params: {
          crop: params.crop ?? 'cotton',
          stage: params.stage ?? 'flowering',
          category: 'disease',
        },
      }}
    />
  );
}
