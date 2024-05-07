import Navbar from "@/components/Navbar";
import CreateNewRecipe from "@/components/home/CreateNewRecipe";
import MyIngredients from "@/components/home/MyIngredients";
import RecentActivities from "@/components/home/RecentActivities";
import ShoppingLists from "@/components/home/ShoppingLists";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const [curr, setCurr] = useState(0);
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
            <Text
              onPress={() => setCurr(0)}
              className={`p-4 font-poor-story rounded-t-md  ${
                curr == 0 &&
                "bg-white shadow-md shadow-black/50 border-black/5 border-x"
              }`}
            >
              My Ingredients
            </Text>
            <Text
              onPress={() => setCurr(1)}
              className={`p-4 font-poor-story rounded-t-md  ${
                curr == 1 &&
                "bg-white shadow-md shadow-black/50 border-black/5 border-x "
              }`}
            >
              Create new recipe
            </Text>
            <Text
              onPress={() => setCurr(2)}
              className={`p-4 font-poor-story rounded-t-md  ${
                curr == 2 &&
                "bg-white shadow-md shadow-black/50 border-black/5 border-x "
              }`}
            >
              Shopping Lists
            </Text>
            <Text
              onPress={() => setCurr(3)}
              className={`p-4 font-poor-story rounded-t-md  ${
                curr == 3 &&
                "bg-white shadow-md shadow-black/50 border-black/5 border-x "
              }`}
            >
              Recent Activities
            </Text>
          </ScrollView>
        </View>
        {curr == 0 && <MyIngredients />}
        {curr == 1 && <CreateNewRecipe />}
        {curr == 2 && <ShoppingLists />}
        {curr == 3 && <RecentActivities />}
      </View>
    </SafeAreaView>
  );
};
export default Home;
