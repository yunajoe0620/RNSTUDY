import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

function Modal() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>I'm a moal</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Close</Text>
      </Pressable>
    </View>
  );
}

export default Modal;
