import { Dispatch, SetStateAction } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
  currItemId: string;
  loading: boolean;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  deleteIngredient: (ingredientId: string) => Promise<void>;
};

const DeleteIngredient: React.FC<Props> = ({
  showModal,
  setShowModal,
  deleteIngredient,
  loading,
  currItemId,
}) => {
  return (
    <Modal
      isVisible={showModal}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
    >
      <View className="w-full rounded-md items-center justify-center  bg-white">
        <View className=" bg-orange-400  w-full rounded-t-md flex-row items-center justify-between p-2">
          <Text className="text-xl font-poppins-regular text-white">
            Delete Ingredient?
          </Text>
        </View>
        <View className="w-full flex-row  justify-end bg-white rounded-b-md p-4">
          <TouchableOpacity
            disabled={loading}
            className="bg-red-500 px-4 py-2 rounded-md shadow-md shadow-black"
            onPress={() => deleteIngredient(currItemId)}
          >
            <Text className="text-white">
              {loading ? "Deleting..." : "Delete"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="ml-4 bg-emerald-500 px-4 py-2 rounded-md shadow-md shadow-black"
            onPress={() => setShowModal(false)}
          >
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
export default DeleteIngredient;
const styles = StyleSheet.create({});
