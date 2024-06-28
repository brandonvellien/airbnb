import { Tabs } from "expo-router";

export default AppLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" options={{ headerShown: false }} />
      <Tabs.Screen name="map" />
    </Tabs>
  );
};
