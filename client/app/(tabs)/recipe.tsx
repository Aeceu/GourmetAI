import CompletedRecipe from "@/components/recipe/CompletedRecipe";
import FavoriteRecipe from "@/components/recipe/FavoriteRecipe";
import Recipes from "@/components/recipe/Recipes";
import { useGlobal } from "@/context/GlobalProvider";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  const { state } = useGlobal();
  const [curr, setCurr] = useState(0);

  return (
    <SafeAreaView className=" h-full bg-black">
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
        <View>
          <ScrollView horizontal>
            <Text
              onPress={() => setCurr(0)}
              className={`px-4 py-2 font-poor-story rounded-t-md  ${
                curr == 0 &&
                "bg-white shadow-md shadow-black/50 border-black/5 border-x"
              }`}
            >
              Recipes
            </Text>
            <Text
              onPress={() => setCurr(1)}
              className={`px-4 py-2 font-poor-story rounded-t-md  ${
                curr == 1 &&
                "bg-white shadow-md shadow-black/50 border-black/5 border-x "
              }`}
            >
              Favorite Recipes
            </Text>
            <Text
              onPress={() => setCurr(2)}
              className={`px-4 py-2 font-poor-story rounded-t-md  ${
                curr == 2 &&
                "bg-white shadow-md shadow-black/50 border-black/5 border-x "
              }`}
            >
              Completed Recipes
            </Text>
          </ScrollView>
        </View>

        {curr == 0 && <Recipes />}
        {curr == 1 && <FavoriteRecipe />}
        {curr == 2 && <CompletedRecipe />}
      </ScrollView>
    </SafeAreaView>
  );
};
export default index;
