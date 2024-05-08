import axios from "@/api/axios";
import { useGlobal } from "@/context/GlobalProvider";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import AddNewIngredient from "../modal/AddNewIngredient";
import DeleteIngredient from "../modal/DeleteIngredient";

const MyIngredients = () => {
  const { dispatch, state } = useGlobal();
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [currItemId, setCurrItemId] = useState<string>("");

  const handleAddnewIngredient = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/ingredients/${state.userId}`, {
        ingredient: newIngredient,
      });
      dispatch({ type: "SET_CURRENT_INGREDIENTS", payload: res.data });
      console.log(res.data);
      ToastAndroid.show("New ingredient added!", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      setNewIngredient("");
    }
  };

  const deleteIngredient = async (ingredientId: string) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/ingredients/${ingredientId}`);
      dispatch({ type: "DELETE_ONE_INGREDIENT", payload: ingredientId });
      console.log(res.data);
      ToastAndroid.show("Ingredient deleted!", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Error!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setCurrItemId("");
    }
  };

  useEffect(() => {
    const fetchIngredient = async () => {
      try {
        const res = await axios.get(`/ingredients/${state.userId}`);
        dispatch({ type: "SET_CURRENT_INGREDIENTS", payload: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    fetchIngredient();
  }, []);

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
            My Ingredients
          </Text>
          {state.ingredients.map((item, idex) => (
            <TouchableOpacity
              key={idex}
              onPress={() => {
                setCurrItemId(item.id);
                setShowDeleteModal(true);
              }}
            >
              <Text className="font-poor-story text-2xl">• {item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View className="w-full flex flex-row p-4 items-center justify-end">
          <Pressable
            onPress={() => setShowModal(!showModal)}
            className="bg-white rounded-full shadow-md shadow-black"
          >
            <Image
              source={require("@/assets/icons/plus.png")}
              className="w-[40px] h-[40px] rounded-full"
            />
          </Pressable>
        </View>
      </View>

      <AddNewIngredient
        handleAddnewIngredient={handleAddnewIngredient}
        loading={loading}
        newIngredient={newIngredient}
        setNewIngredient={setNewIngredient}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <DeleteIngredient
        currItemId={currItemId}
        loading={loading}
        deleteIngredient={deleteIngredient}
        setShowModal={setShowDeleteModal}
        showModal={showDeleteModal}
      />
    </ScrollView>
  );
};
export default MyIngredients;
