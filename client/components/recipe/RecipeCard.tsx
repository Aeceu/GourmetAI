import { Recipe, useGlobal } from "@/context/GlobalProvider";
import { useState } from "react";
import {
  ScrollView,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import { renderFormattedText } from "@/utils/formatText";
import axios from "@/api/axios";

type RecipeCardProps = {
  item: Recipe;
};
const RecipeCard: React.FC<RecipeCardProps> = ({ item }) => {
  const { state, dispatch } = useGlobal();
  const [viewRecipe, setViewRecipe] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);
  const [completeLoading, setCompleteLoading] = useState<boolean>(false);

  const handleDeleteRecipe = async () => {
    try {
      setDeleteLoading(true);
      const res = await axios.delete(`/${item.id}`);
      dispatch({ type: "REMOVE_FROM_CURRENT_RECIPES", payload: item.id });
      ToastAndroid.show(res.data, ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFavorite = async () => {
    try {
      setFavoriteLoading(true);
      const res = await axios.get(`/recipe/favorite/${item.id}`);
      dispatch({ type: "UPDATE_RECIPE_IF_FAVORITE", payload: item.id });
      ToastAndroid.show(res.data, ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleCompleted = async () => {
    try {
      setCompleteLoading(true);
      const res = await axios.get(`/recipe/complete/${item.id}`);
      dispatch({ type: "UPDATE_RECIPE_IF_COMPLETED", payload: item.id });
      ToastAndroid.show(res.data, ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    } finally {
      setCompleteLoading(false);
    }
  };

  return (
    <View className="mt-2 w-full min-h-[100px] py-4 px-2 rounded-md shadow-md border border-black/5 bg-[#FFFBFB] relative flex-col justify-between">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="font-poor-story text-orange-400 text-xl">
          {item.name.trim()}
        </Text>
        <View className="flex-row items-center px-2">
          <TouchableOpacity disabled={favoriteLoading} onPress={handleFavorite}>
            <Icon
              name="heart"
              size={16}
              color={`${item.isFavorite ? "#FFA001" : "#000000"}`}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={completeLoading}
            onPress={handleCompleted}
            className={`ml-2 ${
              item.isComplete ? "bg-emerald-500" : "bg-black"
            } rounded-full p-1`}
          >
            <Icon name="check" size={10} color={"#FFFFFF"} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-row items-center ">
        <TouchableOpacity
          onPress={() => setViewRecipe(true)}
          className="bg-emerald-500 px-2 py-1 rounded-md shadow-md shadow-black"
        >
          <Text className="font-poor-story text-lg text-white">
            View Recipe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={deleteLoading}
          onPress={handleDeleteRecipe}
          className="ml-4 bg-red-500 px-2 py-1 rounded-md shadow-md shadow-black"
        >
          <Text className="font-poor-story text-lg text-white">
            {deleteLoading ? "deleting..." : "Delete Recipe"}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={viewRecipe}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
      >
        <ScrollView className="h-full rounded-t-md ">
          <Text className="rounded-t-md text-2xl font-poor-story text-white bg-orange-400 p-2">
            Created Recipe
          </Text>
          <Text className="bg-white p-2">
            {renderFormattedText(item.name + item.description)}
          </Text>

          <View className="w-full bg-orange-400 p-2 flex-row items-end justify-end">
            {/* <TouchableOpacity
              onPress={handleSaveRecipe}
              className="bg-white  px-2 py-1 rounded-md shadow-md shadow-black"
            >
              <Text className="text-orange-400 font-poor-story text-lg">
                {loadingSaving ? "Saving..." : "Save Recipe"}
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => setViewRecipe(false)}
              className="ml-4 bg-white  px-2 py-1 rounded-md shadow-md shadow-black"
            >
              <Text className="text-red-400 font-poor-story text-lg">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};
export default RecipeCard;
