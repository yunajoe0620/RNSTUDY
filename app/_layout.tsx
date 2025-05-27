import { Stack } from "expo-router";

// slot
// presentation 은 stack만 된다.
export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="modal"
        options={{ presentation: "modal" }}
      ></Stack.Screen>
    </Stack>
  );
}
