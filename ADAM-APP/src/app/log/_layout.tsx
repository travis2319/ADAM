import { Stack } from 'expo-router';
import { FadeIn } from 'react-native-reanimated';


export default function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="clog" />
    </Stack>
    
  );
}
