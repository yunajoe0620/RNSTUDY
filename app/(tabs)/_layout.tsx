import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        // headerStyle: {
        //   backgroundColor: "#25292e",
        // },
        headerShadowVisible: false,
        // headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
            ></Ionicons>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "about",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: "activity",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "footsteps" : "footsteps-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "favorite",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "heart-circle" : "heart-circle-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="username"
        options={{
          title: "username",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
