import { Stack } from "expo-router";

import { useFonts } from "expo-font"; // Import useFonts
import { VitalProvider } from '@/components/context/VitalContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    LufgaBold: require("@/assets/fonts/lufga/LufgaBold.ttf"), // Load Lufga font
    LufgaMedium: require("@/assets/fonts/lufga/LufgaMedium.ttf"),
    Lufga: require("@/assets/fonts/lufga/LufgaBlack.ttf"),
    LufgaSemiBold: require("@/assets/fonts/lufga/LufgaSemiBold.ttf"),
  });

  return (
    <VitalProvider>
    <Stack screenOptions={{headerShown:false}}>

      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="home" />
      <Stack.Screen name="vitals" />
      <Stack.Screen name="onboarding" />

    </Stack>
    </VitalProvider>
  );
}
