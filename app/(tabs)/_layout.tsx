import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="addtest" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="[username]" />
    </Tabs>
  );
}
