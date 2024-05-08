import { useGlobal } from "@/context/GlobalProvider";
import { Text, View } from "react-native";
import RecipeCard from "./RecipeCard";

const Recipes = () => {
  const { state } = useGlobal();

  return (
    <View className="bg-white p-4 min-h-[700px] h-full">
      <View className=" w-full h-full  relative ">
        {state.recipes.length <= 0 ? (
          <Text className="font-poor-story text-2xl text-black/50">
            No recipe on hand.
          </Text>
        ) : (
          state.recipes.map((item, idx) => <RecipeCard key={idx} item={item} />)
        )}
      </View>
    </View>
  );
};
export default Recipes;
