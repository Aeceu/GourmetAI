import CompletedRecipe from "@/components/recipe/CompletedRecipe";
import FavoriteRecipe from "@/components/recipe/FavoriteRecipe";
import RecipeCard from "@/components/recipe/RecipeCard";
import { useGlobal } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const profile = () => {
  const { state, dispatch } = useGlobal();
  const [curr, setCurr] = useState(0);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView className="h-full bg-[#F0FFFF] p-2">
        <View className="flex-row items-end justify-end p-2">
          <TouchableOpacity
            onPress={handleLogout}
            className=" flex flex-row items-center px-3 py-1 shadow-md shadow-black bg-white rounded-md"
          >
            <Text className="mr-2 text-[#FF9900] tracking-wider text-sm font-poppins-regular">
              Logout
            </Text>
            <Image
              source={require("@/assets/icons/logout.png")}
              className="w-[20px] h-[20px]"
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col justify-center items-center px-4 py-4">
          <Image
            source={require("@/assets/icons/food_1.png")}
            className="w-20 h-20"
            resizeMode="cover"
          />
          <Text className="mt-4 text-black font-poppins-regular text-xl">
            {state.currentUser?.email.split("@")[0]}
          </Text>
          <View className="flex-row items-center justify-center  mt-2">
            <View className="mx-3 flex-col items-center justify-center">
              <Text className="font-poppins-regular text-orange-400 text-xl">
                {state.ingredients.length}
              </Text>
              <Text className="font-poppins-regular text-black/50 text-sm">
                Ingredients
              </Text>
            </View>
            <View className="mx-3 flex-col items-center justify-center">
              <Text className="font-poppins-regular text-orange-400 text-xl">
                {state.recipes.length}
              </Text>
              <Text className="font-poppins-regular text-black/50 text-sm">
                Recipes
              </Text>
            </View>
          </View>
        </View>
        <View className="shadow-md shadow-black/50  flex flex-col items-start justify-center">
          <Text
            className="w-max px-3 py-1 font-poppins-regular bg-[#FFFBFB] rounded-t-md
          text-orange-500  border-black/5 border-x"
          >
            Personal Information
          </Text>
          <View className="p-2 bg-[#FFFBFB] w-full border-black/5 border-x border-b rounded-b-md rounded-tr-md ">
            <View className="flex-row">
              <Text className="mr-2 text-orange-500 font-poppins-regular">
                First Name:
              </Text>
              <Text className=" text-black font-poppins-regular">
                {state.currentUser?.firstName}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="mr-2 text-orange-500 font-poppins-regular">
                Last Name:
              </Text>
              <Text className=" text-black font-poppins-regular">
                {state.currentUser?.lastName}
              </Text>
            </View>
            <View className="flex-row">
              <Text className="mr-2 text-orange-500 font-poppins-regular">
                Email:
              </Text>
              <Text className=" text-black font-poppins-regular">
                joseacebuche2@gmail.com
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-2">
          <ScrollView horizontal>
            <Text
              onPress={() => setCurr(0)}
              className={`px-3 py-1 font-poppins-regular rounded-t-md  ${
                curr == 0 &&
                "text-orange-500 bg-[#FFFBFB] shadow-md shadow-black/50 border-black/5 border-x"
              }`}
            >
              Favorite Recipe
            </Text>
            <Text
              onPress={() => setCurr(1)}
              className={`px-3 py-1 font-poppins-regular rounded-t-md  ${
                curr == 1 &&
                "text-orange-500 bg-[#FFFBFB] shadow-md shadow-black/50 border-black/5 border-x "
              }`}
            >
              Completed Recipe
            </Text>
          </ScrollView>
        </View>
        {curr == 0 && <FavoriteRecipe />}
        {curr == 1 && <CompletedRecipe />}
      </ScrollView>
    </SafeAreaView>
  );
};
export default profile;
