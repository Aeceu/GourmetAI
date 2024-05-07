import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
const MyIngredients = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newIngredient, setNewIngredient] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);

  const handleAddnewIngredient = () => {
    ToastAndroid.show(newIngredient, ToastAndroid.SHORT);
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
            My Ingredients
          </Text>
          <Text className="font-poor-story text-2xl">• Egg</Text>
          <Text className="font-poor-story text-2xl">• Peanut</Text>
          <Text className="font-poor-story text-2xl">• Mayonnaise</Text>
          <Text className="font-poor-story text-2xl">• Onions</Text>
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
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View className="bg-white h-[39%] w-full rounded-t-2xl  bottom-0 absolute shadow-md shadow-black">
          <View className="bg-orange-500 rounded-t-2xl flex flex-row  items-center justify-between px-4 py-2 ">
            <Text className="text-white font-poor-story text-2xl">
              Add new ingredient
            </Text>
            <Pressable onPress={() => setShowModal(!showModal)}>
              <Text className="text-white text-lg">Close</Text>
            </Pressable>
          </View>
          <View className="p-4 space-y-2">
            <Text className="font-poppins-regular">Ingredient name</Text>
            <TextInput
              value={newIngredient}
              onChangeText={(e) => setNewIngredient(e)}
              className="rounded-md px-4 py-2 bg-[#FFFBFB] shadow-md shadow-black/50 border border-black/5"
            />
            <View className="w-full flex justify-end items-end">
              <Pressable onPress={handleAddnewIngredient}>
                <Text className=" text-lg bg-orange-500 rounded-md text-white px-4 py-1.5 shadow-md shadow-black/50 ">
                  ADD
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
export default MyIngredients;
