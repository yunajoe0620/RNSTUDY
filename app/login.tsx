import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function Login() {
  const isLoggedIn = false;
  if (isLoggedIn) {
    return <Redirect href="/(tabs)"></Redirect>;
  }

  return (
    <View>
      <Text>Login페이지</Text>
    </View>
  );
}

export default Login;
