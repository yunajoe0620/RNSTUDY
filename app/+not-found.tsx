import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "oops" }} />
      <View>
        <Text>잘못된 페이지</Text>
      </View>
    </>
  );
}

export default NotFoundScreen;
