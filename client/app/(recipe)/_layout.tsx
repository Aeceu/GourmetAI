import { Slot, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};
export default _layout;
