import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Index() {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  // const result = useGlobalSearchParams();
  // console.log("result", result);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        {/* http://localhost:8081/my-app  */}
        <TouchableOpacity onPress={() => router.push(`/${username}`)}>
          <Text>묭아사랑해</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* http://localhost:8081/my-app/replies */}
        <TouchableOpacity onPress={() => router.push(`/${username}/replies`)}>
          <Text>하늘만쿰사탕해</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* http://localhost:8081/my-app/reposts */}
        <TouchableOpacity onPress={() => router.push(`/${username}/reposts`)}>
          <Text>쪽</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Index;
