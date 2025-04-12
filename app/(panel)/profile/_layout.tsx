import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
        screenOptions={{
            headerShown: false, 
        }}
    >
      <Stack.Screen name="profilepg" />
      <Stack.Screen name="createnewhabit/createnewhabitpg" />
    </Stack>
  );
}
