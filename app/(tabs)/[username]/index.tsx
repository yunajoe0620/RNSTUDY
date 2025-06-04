import {
  useGlobalSearchParams,
  useLocalSearchParams,
  usePathname,
} from "expo-router";
import React from "react";
import { View } from "react-native";

function Index() {
  const glob = useGlobalSearchParams();
  const local = useLocalSearchParams();
  const path = usePathname();

  console.log("Local:", local.user, "Global:", glob.user, "pathName", path);

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
          <Text>묭아사랑해</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}/replies`)}>
          <Text>하늘만쿰사탕해</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/${username}/reposts`)}>
          <Text>쪽</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

export default Index;
