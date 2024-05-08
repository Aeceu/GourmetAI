import axios from "@/api/axios";
import Navbar from "@/components/Navbar";
import CreateNewRecipe from "@/components/home/CreateNewRecipe";
import MyIngredients from "@/components/home/MyIngredients";
import RecentActivities from "@/components/home/RecentActivities";
import ShoppingLists from "@/components/home/ShoppingLists";
import { useGlobal } from "@/context/GlobalProvider";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const [curr, setCurr] = useState(0);
  const { state, dispatch } = useGlobal();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/recipe/${state.userId}`);
        dispatch({ type: "SET_CURRENT_RECIPE", payload: res.data });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView className="h-full bg-[#F0FFFF]">
        <View className="flex justify-between items-start flex-row p-4">
          <View>
            <Text className="font-pmedium text-sm text-black">Welcome to</Text>
            <Text
              className="text-4xl flex flex-row items-center gap-2 text-black"
              style={{ fontFamily: "cursive" }}
            >
              Gourmet<Text className="text-orange-500">AI</Text>
            </Text>
          </View>

          <View className="mt-1.5">
            <Image
              source={require("@/assets/icons/food_1.png")}
              className="w-9 h-10"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="w-full  justify-center items-center p-4">
          <View className="w-full rounded-md p-2 flex-col gap-2 bg-[#FFFBFB] shadow-md shadow-black ">
            <Text className="font-poor-story text-3xl text-orange-500">
              Kitchen Overview
            </Text>
            <Text className="font-poor-story text-xl flex">
              Available Ingredients:
              <Text className="text-orange-500">
                {" "}
                {state.ingredients.length}
              </Text>
            </Text>
            <Text className="font-poor-story text-xl flex">
              Recipes on Hand:
              <Text className="text-orange-500"> {state.recipes.length}</Text>
            </Text>
          </View>
        </View>
        <View>
          <ScrollView horizontal>
            <Text
              onPress={() => setCurr(0)}
              className={`p-3 text-lg font-poor-story rounded-t-md  ${
                curr == 0 &&
                "text-orange-500  bg-[#FFFBFB] shadow-md shadow-black/50 border-black/5 border-x"
              }`}
            >
              My Ingredients
            </Text>
            <Text
              onPress={() => setCurr(1)}
              className={`p-3 text-lg font-poor-story rounded-t-md  ${
                curr == 1 &&
                "text-orange-500  bg-[#FFFBFB] shadow-md shadow-black/50 border-black/5 border-x "
              }`}
            >
              Create new recipe
            </Text>
          </ScrollView>
        </View>
        {curr == 0 && <MyIngredients />}
        {curr == 1 && <CreateNewRecipe />}
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
