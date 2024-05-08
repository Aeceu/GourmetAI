import axios from "@/api/axios";
import { Ingredient, useGlobal } from "@/context/GlobalProvider";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

const CreateNewRecipe = () => {
  const { state, dispatch } = useGlobal();
  const [currIngredients, setCurrIngredients] = useState(state.ingredients);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [loadingSaving, setLoadingSaving] = useState(false);
  const [saveRecipeModal, setShowRecipeModal] = useState(false);
  const [recipeText, setRecipeText] = useState("");

  // Handle transfer of available to selected ingredients
  const handleAvailableIngredient = (item: Ingredient) => {
    setSelectedIngredients([...selectedIngredients, item]);
    setCurrIngredients(
      currIngredients.filter((ingredient) => ingredient.id !== item.id)
    );
  };

  const handleSelectedIngredient = (item: Ingredient) => {
    setCurrIngredients([...currIngredients, item]);
    setSelectedIngredients(
      selectedIngredients.filter((ingredient) => ingredient.id !== item.id)
    );
  };

  const handleReset = () => {
    setCurrIngredients(state.ingredients);
    setSelectedIngredients([]);
    setShowRecipeModal(false);
  };

  const handleCreateRecipe = async () => {
    let body = "";
    selectedIngredients.map((item) => (body += item.name + ","));
    try {
      setLoading(true);
      const res = await axios.post("/recipe", {
        ingredients: body,
      });
      setRecipeText(res.data);
      setShowRecipeModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      // handleReset();
    }
  };

  const renderFormattedText = (text: string) => {
    // Replace '**' with React Native's text styling syntax for bold
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "$1");
    // Replace '\n\n' with newline character in React Native
    formattedText = formattedText.replace(/\n\n/g, "\n");
    // Replace '*' with bullet point unicode character
    formattedText = formattedText.replace(/\*/g, "\u2022");
    // Replace '\n' with newline character in React Native
    formattedText = formattedText.replace(/\n/g, "\n\n");
    // Return the processed text
    return formattedText;
  };

  const handleDeleteRecipe = () => {
    handleReset();
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
        ingredeitns: selectedIngredients,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSaving(false);
      handleReset();
    }
  };

  return (
    <ScrollView
      className="bg-white p-4"
      contentContainerStyle={{ height: "100%" }}
    >
      <View className=" w-full h-full  relative ">
        <Image
          source={require("@/assets/images/nb.jpg")}
          className="w-full h-full opacity-50 rounded-md absolute top-0 left-0"
          resizeMode="stretch"
        />
        <ScrollView className="flex-col gap-2 p-2">
          <Text className="font-poor-story text-orange-500 text-3xl">
            Create new recipe
          </Text>
          <Text className="text-orange-500 font-poor-story text-xl border-b border-black/70">
            Available Ingredients:
          </Text>
          {currIngredients.length <= 0 ? (
            <Text className="font-poor-story text-2xl text-black/50">
              No available Ingredients.
            </Text>
          ) : (
            currIngredients.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleAvailableIngredient(item)}
              >
                <Text className="font-poor-story text-xl">• {item.name}</Text>
              </TouchableOpacity>
            ))
          )}
          <Text className="text-orange-500 font-poor-story text-xl border-b border-black/70">
            Selected Ingredients:
          </Text>
          {selectedIngredients.length <= 0 ? (
            <Text className="font-poor-story text-2xl text-black/50">
              No selected Ingredients.
            </Text>
          ) : (
            selectedIngredients.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleSelectedIngredient(item)}
              >
                <Text className="font-poor-story text-xl">• {item.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
        <View className="w-full flex flex-row p-4 items-center justify-end">
          <Pressable
            disabled={loading}
            onPress={handleCreateRecipe}
            className="bg-orange-400 rounded-md px-2 py-1  shadow-md shadow-black"
          >
            <Text className="text-white text-lg font-poor-story">
              {loading ? "Creating..." : "Create Recipe"}
            </Text>
          </Pressable>
          <Pressable
            onPress={handleReset}
            className="ml-4 bg-red-400 rounded-md px-2 py-1  shadow-md shadow-black"
          >
            <Text className="text-white text-lg font-poor-story">Reset</Text>
          </Pressable>
        </View>

        <Modal
          isVisible={saveRecipeModal}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
        >
          <Text className="rounded-t-md text-2xl font-poor-story text-white bg-orange-400 p-2">
            Created Recipe
          </Text>
          <ScrollView className="bg-white p-2 ">
            <Text>{renderFormattedText(recipeText)}</Text>
          </ScrollView>
          <View className="bg-orange-400 p-2 flex-row items-end justify-end">
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
        </Modal>
      </View>
    </ScrollView>
  );
};
export default CreateNewRecipe;
