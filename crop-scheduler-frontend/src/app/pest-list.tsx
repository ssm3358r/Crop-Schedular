import { Redirect, useLocalSearchParams } from 'expo-router';

export default function PestListRedirect() {
  const params = useLocalSearchParams<{ crop?: string; stage?: string }>();

  return (
    <Redirect
      href={{
        pathname: '/AdvisoryListScreen',
        params: {
          crop: params.crop ?? 'cotton',
          stage: params.stage ?? 'flowering',
          category: 'pest',
        },
      }}
    />
  );
}
