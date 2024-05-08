import { useGlobal } from "@/context/GlobalProvider";
import { StyleSheet, Text, View } from "react-native";
import RecipeCard from "./RecipeCard";
const FavoriteRecipe = () => {
  const { state } = useGlobal();

  return (
    <View className="bg-white p-4 min-h-[700px] h-full">
      <View className=" w-full h-full  relative ">
        {state.recipes.length <= 0 ? (
          <Text className="font-poor-story text-2xl text-black/50">
            No favorite recipes on hand.
          </Text>
        ) : (
          state.recipes.map((item, idx) => {
            if (item.isFavorite) {
              return <RecipeCard key={idx} item={item} />;
            }
          })
        )}
      </View>
    </View>
  );
};
export default FavoriteRecipe;
const styles = StyleSheet.create({});
