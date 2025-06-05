import { Stack } from "expo-router";

// presentation 은 stack만 된다.
//  RootLayout에는 굳이 home.tsx, +not-founc.를 안 써두 된다
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
