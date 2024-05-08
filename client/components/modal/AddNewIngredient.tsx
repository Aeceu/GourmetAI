import { SetStateAction } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  loading: boolean;
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  newIngredient: string;
  setNewIngredient: React.Dispatch<SetStateAction<string>>;
  handleAddnewIngredient: () => Promise<void>;
};

const AddNewIngredient: React.FC<Props> = ({
  newIngredient,
  setNewIngredient,
  setShowModal,
  showModal,
  handleAddnewIngredient,
  loading,
}) => {
  return (
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
            <Pressable disabled={loading} onPress={handleAddnewIngredient}>
              <Text className=" text-lg bg-orange-500 rounded-md text-white px-4 py-1.5 shadow-md shadow-black/50 ">
                {loading ? "ADDING..." : "ADD"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default AddNewIngredient;
const styles = StyleSheet.create({});
