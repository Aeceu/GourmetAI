import Navbar from "@/components/Navbar";
import { useGlobal } from "@/context/GlobalProvider";
import { Redirect } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  const { state } = useGlobal();

  if (!state.currentUser) return <Redirect href={"/(auth)/login"} />;

  return (
    <SafeAreaView className=" h-full bg-black">
      <View className="h-full bg-[#FFFBFB]">
        <Navbar />
        <View className="w-full  justify-center items-center p-4">
          <View className="w-full rounded-md p-2 flex-col gap-2 bg-white shadow-md shadow-black ">
            <Text className="font-poor-story text-3xl text-orange-500">
              Kitchen Overview
            </Text>
            <Text className="font-poor-story text-xl flex">
              Available Ingredients:
              <Text className="text-orange-500"> 4</Text>
            </Text>
            <Text className="font-poor-story text-xl flex">
              Recipes on Hand:
              <Text className="text-orange-500"> 0</Text>
            </Text>
            <Text className="font-poor-story text-xl flex">
              Favorite Recipes:
              <Text className="text-orange-500"> 0</Text>
            </Text>
            <Text className="font-poor-story text-xl flex">
              Completed Recipes:
              <Text className="text-orange-500"> 0</Text>
            </Text>
          </View>
        </View>
        <View>
          <ScrollView horizontal>
            <Text className={`p-4 font-poor-story rounded-t-md  `}>
              My Ingredients
            </Text>
            <Text className={`p-4 font-poor-story rounded-t-md  `}>
              Create new recipe
            </Text>
            <Text className={`p-4 font-poor-story rounded-t-md  `}>
              Shopping Lists
            </Text>
            <Text className={`p-4 font-poor-story rounded-t-md  `}>
              Recent Activities
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default index;
