import NotFoundPage from "@/app/+not-found";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

export default function Activity() {
  const router = useRouter();

  const pathname = usePathname();
  if (
    ![
      "/activity",
      "/activity/follows",
      "/activity/replies",
      "/activity/mentions",
      "/activity/quotes",
      "/activity/reposts",
    ].includes(pathname)
  ) {
    return <NotFoundPage />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.push(`/activity`)}>
          <Text>All</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/activity/follows`)}>
          <Text>Follows</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/activity/replies`)}>
          <Text>replies</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/activity/mentions`)}>
          <Text>mentions</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/activity/quotes`)}>
          <Text>quotes</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={() => router.push(`/activity/reposts`)}>
          <Text>reposts</Text>
        </TouchableOpacity>
      </View>
      <Stack.Screen
        options={{
          title: "Home",
          headerStyle: { backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      ></Stack.Screen>
      <Link href={{ pathname: "/search", params: { name: "Bacon", age: 100 } }}>
        Go to Details
      </Link>
    </View>
  );
}
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
