import axios from "@/api/axios";
import { useGlobal } from "@/context/GlobalProvider";
import { renderFormattedText } from "@/utils/formatText";
import { AxiosError } from "axios";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

const WantSpecificRecipe = () => {
  const { state, dispatch } = useGlobal();
  const [recipeName, setRecipeName] = useState("");
  const [loading, setLoading] = useState(false);

  const [loadingSaving, setLoadingSaving] = useState(false);
  const [saveRecipeModal, setShowRecipeModal] = useState(false);
  const [recipeText, setRecipeText] = useState("");

  const handleAddNewRecipe = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/recipeByName/${recipeName}`);
      setRecipeText(res.data);
      setShowRecipeModal(true);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const axiosErr = error as AxiosError;
        if (axiosErr.response && axiosErr.response.data) {
          if (typeof axiosErr.response.data === "string") {
            ToastAndroid.show(axiosErr.response.data, ToastAndroid.SHORT);
          }
        }
      } else {
        ToastAndroid.show("ERROR!", ToastAndroid.SHORT);
      }
    } finally {
      setLoading(false);
      setRecipeName("");
    }
  };

  const handleDeleteRecipe = () => {
    setShowRecipeModal(false);
  };

  const handleSaveRecipe = async () => {
    const startIndex =
      recipeText.indexOf("**Recipe Name:**") + "**Recipe Name:**".length;
    const name = recipeText.substring(
      startIndex,
      recipeText.indexOf("**", startIndex)
    );

    const description = recipeText.substring(
      recipeText.indexOf("**", startIndex) + 2
    );

    try {
      setLoadingSaving(true);
      const res = await axios.post(`/save/recipe/${state.userId}`, {
        name,
        description,
      });
      console.log(res.data);
      dispatch({ type: "ADD_TO_CURRENT_RECIPES", payload: res.data });
      ToastAndroid.show("New recipe added!", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSaving(false);
      setShowRecipeModal(false);
    }
  };

  return (
    <View className="bg-[#FFFBFB] p-4 min-h-[500px] h-[500px]">
      <View className=" w-full h-full  relative ">
        <Image
          source={require("@/assets/images/nb.jpg")}
          className="w-full h-full opacity-50 rounded-md absolute top-0 left-0"
          resizeMode="stretch"
        />
        <View className="p-4 space-y-2">
          <Text className="font-poppins-regular">Recipe name</Text>
          <TextInput
            value={recipeName}
            onChangeText={(e) => setRecipeName(e)}
            className="rounded-md px-4 py-2 bg-[#FFFBFB] shadow-md shadow-black/50 border border-black/5"
          />
          <View className="w-full flex justify-end items-end">
            <Pressable disabled={loading} onPress={handleAddNewRecipe}>
              <Text className=" text-lg bg-orange-500 rounded-md text-white px-4 py-1.5 shadow-md shadow-black/50 ">
                {loading ? "ADDING..." : "ADD"}
              </Text>
            </Pressable>
          </View>
        </View>

        <Modal
          isVisible={saveRecipeModal}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
        >
          <ScrollView className="h-full rounded-t-md ">
            <Text className="rounded-t-md text-2xl font-poor-story text-white bg-orange-400 p-2">
              Created Recipe
            </Text>
            <Text className="p-2 bg-white">
              {renderFormattedText(recipeText)}
            </Text>
            <View className="w-full bg-orange-400 p-2 flex-row items-end justify-end">
              <TouchableOpacity
                onPress={handleSaveRecipe}
                className="bg-white  px-2 py-1 rounded-md shadow-md shadow-black"
              >
                <Text className="text-orange-400 font-poor-story text-lg">
                  {loadingSaving ? "Saving..." : "Save Recipe"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteRecipe}
                className="ml-4 bg-white  px-2 py-1 rounded-md shadow-md shadow-black"
              >
                <Text className="text-red-400 font-poor-story text-lg">
                  Delete Recipe
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </View>
  );
};
export default WantSpecificRecipe;
