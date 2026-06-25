import { Stack } from 'expo-router';

export default function AppTabs() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="explore" />
      <Stack.Screen name="select-crop" />
      <Stack.Screen name="growth-stage" />
      <Stack.Screen name="category-selection" />
      <Stack.Screen name="pest-list" />
      <Stack.Screen name="disease-list" />
      <Stack.Screen name="nutrition-advisory" />
    </Stack>
  );
}
