import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

function Index() {
  const router = useRouter();
  const result = useLocalSearchParams();
  console.log("result", result);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <View>
        <TouchableOpacity onPress={() => router.push(`/${username}`)}>
          <Text>묭아사랑해222</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}/replies`)}>
          <Text>하늘만쿰사탕해2222</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}/reposts`)}>
          <Text>쪽22222</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default Index;
