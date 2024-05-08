import { useGlobal } from "@/context/GlobalProvider";
import { StyleSheet, Text, View } from "react-native";
import RecipeCard from "./RecipeCard";
const CompletedRecipe = () => {
  const { state } = useGlobal();

  return (
    <View className="bg-white p-4 min-h-[700px] h-full">
      <View className=" w-full h-full  relative ">
        {state.recipes.length <= 0 ? (
          <Text className="font-poor-story text-2xl text-black/50">
            No completed recipes on hand.
          </Text>
        ) : (
          state.recipes.map((item, idx) => {
            if (item.isComplete) {
              return <RecipeCard key={idx} item={item} />;
            }
          })
        )}
      </View>
    </View>
  );
};
export default CompletedRecipe;
const styles = StyleSheet.create({});
