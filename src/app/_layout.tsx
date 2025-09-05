import { defaultConfig } from "@tamagui/config/v4"; // for quick config install this
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTamagui, PortalProvider, TamaguiProvider } from "tamagui";

const config = createTamagui(defaultConfig);

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <PortalProvider shouldAddRootHost>
      <SafeAreaView style={{ flex: 1 }}>
        <TamaguiProvider config={config} defaultTheme="light">
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="model-download"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </TamaguiProvider>
      </SafeAreaView>
    </PortalProvider>
  );
}
