import { useGlobal } from "@/context/GlobalProvider";
import { Redirect, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const AuthLayout = () => {
  const { dispatch, state } = useGlobal();

  if (!state.loading && state.isLogged) return <Redirect href={"/(home)/"} />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
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
      <Stack.Screen
        name="verify"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};
export default AuthLayout;
