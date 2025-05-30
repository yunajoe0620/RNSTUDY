import { Stack } from "expo-router";
import React from "react";

function ActivityLayOut() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    ></Stack>
  );
}

export default ActivityLayOut;
