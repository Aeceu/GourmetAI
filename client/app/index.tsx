import { useGlobal } from "@/context/GlobalProvider";
import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  const { state } = useGlobal();
  if (state.isLogged && state.currentUser)
    return <Redirect href={"/(tabs)/home"} />;
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Link href={"/(auth)/login"}>
          <Text className="text-orange-400 text-2xl">Go to Login Page.</Text>
        </Link>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default index;
