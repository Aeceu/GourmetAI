import Navbar from "@/components/Navbar";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Home = () => {
  return (
    <SafeAreaView className="bg-[#FFFBFB]">
      <Navbar />
      <View className="w-full  justify-center items-center p-4">
        <View className="w-full rounded-md p-2 flex-col gap-2 bg-white shadow-md shadow-black ">
          <Text className="font-poor-story text-2xl text-orange-500">
            Kitchen Overview
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ height: "100%" }}></ScrollView>
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({});
