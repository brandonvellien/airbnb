import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => {
          return;
        },
        headerBackTitleVisible: false,
        headerTintColor: "grey",
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="room" />
    </Stack>
  );
};
