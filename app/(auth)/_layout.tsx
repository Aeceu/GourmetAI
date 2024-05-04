import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default AuthLayout;
