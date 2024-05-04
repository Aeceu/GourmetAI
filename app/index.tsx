import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl">Hello World</Text>
      <StatusBar style="auto" />
      <Link href={"/login"}>Go to login Page</Link>
    </View>
  );
};
export default App;
