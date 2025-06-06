// my-app://main
// stack, tab, drawer
import { usePathname, useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BlurView from "./../../../node_modules/expo-blur/build/BlurView.d";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const { width, height } = Dimensions.get("window");

  console.log("pathname222 ===>", pathname, insets);
  console.log("width", width, "height", height);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <BlurView style={styles.header} intensity={70}>
        <Image source={require("@/assets/images/react-ogo.png")}></Image>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
      </BlurView>
      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => router.push(`/`)}>
            <Text style={{ color: pathname === "/" ? "red" : "black" }}>
              For You
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => router.push(`/following`)}>
          <Text style={{ color: pathname === "/" ? "black" : "red" }}>
            For following
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@my-app/post/1`)}>
          <Text>게시글1</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@my-app/post/2`)}>
          <Text>게시글2</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/@my-app/post/3`)}>
          <Text>게시글3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  headerLogo: {
    width: 42, // DP or DIP
    height: 42,
  },
  loginButton: {
    position: "absolute",
    right: 10,
    left: 10,
    backgroundColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  loginButtonText: {
    color: "black",
  },
});
