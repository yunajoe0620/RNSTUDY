import { Stack } from "expo-router";
import React from "react";

function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "oops" }} />;
    </>
  );
}

export default NotFoundScreen;
