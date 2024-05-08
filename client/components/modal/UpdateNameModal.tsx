import { TUpdateUserName } from "@/app/(tabs)/settings";
import { Dispatch, FC, SetStateAction } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  loading: boolean;
  setShowUpdateName: Dispatch<SetStateAction<boolean>>;
  showUpdateName: boolean;
  handleUpdateName: () => Promise<void>;
  data: TUpdateUserName;
  setData: Dispatch<SetStateAction<TUpdateUserName>>;
};

const UpdateNameModal: FC<Props> = ({
  loading,
  setShowUpdateName,
  showUpdateName,
  handleUpdateName,
  data,
  setData,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={showUpdateName}>
      <View className="bg-white h-[39%] w-full rounded-t-2xl  bottom-0 absolute shadow-md shadow-black">
        <View className="bg-orange-500 rounded-t-2xl flex flex-row  items-center justify-between px-4 py-2 ">
          <Text className="text-white font-poor-story text-2xl">
            Update user name
          </Text>
          <TouchableOpacity onPress={() => setShowUpdateName(!showUpdateName)}>
            <Text className="text-white text-lg">Close</Text>
          </TouchableOpacity>
        </View>
        <View className="p-4 space-y-2">
          <Text className="font-poppins-regular">First Name:</Text>
          <TextInput
            value={data.firstName}
            onChangeText={(e) => setData({ ...data, firstName: e })}
            className="rounded-md px-4 py-2 bg-[#FFFBFB] shadow-md shadow-black/50 border border-black/5"
          />
          <Text className="font-poppins-regular">Last Name:</Text>
          <TextInput
            value={data.lastName}
            onChangeText={(e) => setData({ ...data, lastName: e })}
            className="rounded-md px-4 py-2 bg-[#FFFBFB] shadow-md shadow-black/50 border border-black/5"
          />
          <View className="w-full flex justify-end items-end">
            <Pressable disabled={loading} onPress={handleUpdateName}>
              <Text className=" text-lg bg-orange-500 rounded-md text-white px-4 py-1.5 shadow-md shadow-black/50 ">
                {loading ? "Updating..." : "Update"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default UpdateNameModal;
