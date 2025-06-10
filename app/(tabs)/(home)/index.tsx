// my-app://main
// stack, tab, drawer
import { BlurView } from "expo-blur";
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

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isLoggin = false;

  const { width, height } = Dimensions.get("window");
  // 미디어쿼리를 하려면은
  // if(width <375){

  // }
  // console.log(`화면 너비: ${width}dp, 높이:  ${height}dp`);
  // console.log(
  //   `화면 너비: ${width * PixelRatio.get()}px, 높이:  ${
  //     height * PixelRatio.get()
  //   }px`
  // );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <BlurView style={styles.header} intensity={70}>
        <Image source={require("@/assets/images/react-logo.png")}></Image>
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
    marginTop: 20,
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
    color: "white",
  },
});
