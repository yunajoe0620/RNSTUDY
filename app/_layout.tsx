import { Stack } from "expo-router";
import React from "react";

function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }}></Stack.Screen>
      <Stack.Screen name="about" options={{ title: "About" }}></Stack.Screen>
    </Stack>
  );
}

export default RootLayout;
