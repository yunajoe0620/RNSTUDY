import { usePathname } from "expo-router";
import { Text, View } from "react-native";

export default function Search() {
  const pathname = usePathname();
  console.log("패스네임 ===>>", pathname);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Search페이지</Text>
    </View>
  );
}
