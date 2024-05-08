import { useGlobal } from "@/context/GlobalProvider";
import { StyleSheet, Text, View } from "react-native";
import RecipeCard from "./RecipeCard";
const FavoriteRecipe = () => {
  const { state } = useGlobal();

  return (
    <View className="bg-[#FFFBFB] p-4 min-h-[700px] h-full border-black/5 border-x border-b rounded-b-md rounded-tr-md ">
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
