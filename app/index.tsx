import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function Index() {
  return (
    <View>
      <Text>인덱스페이지</Text>
      <Link href="/about">Go to About Screen</Link>
    </View>
  );
}

export default Index;
