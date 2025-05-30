import { Stack } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

function LogoTitle(props: any) {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Image
        style={styles.image}
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
      />
      <Text>{props.children}</Text>
    </View>
  );
}
function Follows() {
  return (
    <View>
      <Stack.Screen
        options={{
          title: "follows",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      ></Stack.Screen>
    </View>
  );
}

export default Follows;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
