import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
const AnimatedTabBarButton = ({
  children,
  onPress,
  style,
  ...restProps // rest 문법
}: BottomTabBarButtonProps) => {
  const test = useSharedValue<number>(0);

  const handlePressOut = () => {
    test.value = withSpring(test.value + 50);

    // scale.value += 100;
    // scale.value = withSequence(
    //   withSpring(scale.value, {
    //     mass: 1,
    //     damping: 10,
    //     stiffness: 100,
    //     overshootClamping: false,
    //     restDisplacementThreshold: 0.01,
    //     restSpeedThreshold: 10,
    //     reduceMotion: ReduceMotion.System,
    //   }),
    //   withSpring(scale.value, {
    //     mass: 1,
    //     damping: 10,
    //     stiffness: 100,
    //     overshootClamping: false,
    //     restDisplacementThreshold: 0.01,
    //     restSpeedThreshold: 10,
    //     reduceMotion: ReduceMotion.System,
    //   })
    // );
    // withSpring(value, {
    //   toValue: 2,
    //   useNativeDriver: true,
    //   friction: 4,
    // });
    // Animated.sequence([
    //   Animated.spring(scaleValue, {
    //     toValue: 2,
    //     useNativeDriver: true,
    //     friction: 4,
    //   }),
    //   Animated.spring(scaleValue, {
    //     toValue: 1,
    //     useNativeDriver: true,
    //     speed: 100,
    //     friction: 100,
    //   }),
    // ]).start();
  };
  // Pressable이 TouchableOpacity보다 더 custom하기에 좋다

  return (
    <Pressable
      // {...restProps} // spread문법 에러가난다 음
      onPress={onPress}
      onPressOut={handlePressOut}
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        style,
      ]}
      android_ripple={{ borderless: false, radius: 0 }}
    >
      <Animated.View style={{ backgroundColor: "red", width: test }}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default function TabLayout() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const isLogin = true;
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <Tabs
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarButton: (props) => {
            return <AnimatedTabBarButton {...props}></AnimatedTabBarButton>;
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="index"
          options={{
            // 아이콘 아래에 title 안보이게 함
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="search"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="search"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              if (isLogin) {
                router.navigate("/modal");
              } else {
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="add"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          listeners={{
            tabPress: (e) => {
              if (!isLogin) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="heart-outline"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="[username]"
          listeners={{
            tabPress: (e) => {
              if (!isLogin) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="person-outline"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(post)/[username]/post/[postID]"
          options={{
            tabBarLabel: () => null,
            href: null,
          }}
        />
      </Tabs>
      <Modal visible={isLoginModalOpen} transparent={true} animationType="fade">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View style={{ backgroundColor: "white", height: 200 }}>
            <Text>Login Modal</Text>
            <TouchableOpacity onPress={closeLoginModal}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
