import axios from "@/api/axios";
import UpdateNameModal from "@/components/modal/UpdateNameModal";
import { useGlobal } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { AxiosError } from "axios";
export type TUpdateUserName = {
  firstName: string;
  lastName: string;
};

const settings = () => {
  const { state, dispatch } = useGlobal();
  const [data, setData] = useState<TUpdateUserName>({
    firstName: "",
    lastName: "",
  });
  const [showUpdateName, setShowUpdateName] = useState<boolean>(false);
  const [showDeleteAccModal, setShowDeleteAccModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/(auth)/login");
  };

  const handleUpdateName = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`/user/${state.userId}`, data);
      dispatch({ type: "SET_CURRENT_USER", payload: res.data });
      ToastAndroid.show(
        "User account updated successfully!",
        ToastAndroid.SHORT
      );
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
      setShowUpdateName(false);
      setData({
        firstName: "",
        lastName: "",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await axios.delete(`/user/${state.userId}`);
      ToastAndroid.show("Account deleted successfully!", ToastAndroid.SHORT);
      handleLogout();
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
      setShowDeleteAccModal(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView className="h-full bg-[#F0FFFF] p-2">
        <View className="flex-row items-end justify-end p-2">
          <TouchableOpacity
            onPress={handleLogout}
            className=" flex flex-row items-center px-3 py-1 shadow-md shadow-black bg-white rounded-md"
          >
            <Text className="mr-2 text-[#FF9900] tracking-wider text-sm font-poppins-regular">
              Logout
            </Text>
            <Image
              source={require("@/assets/icons/logout.png")}
              className="w-[20px] h-[20px]"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mb-4">
          <Image
            source={require("@/assets/icons/settings-orange.png")}
            className="w-10 h-10"
            resizeMode="cover"
          />
          <Text className="ml-2 text-orange-400 font-poppins-regular text-3xl">
            Settings
          </Text>
        </View>
        <View className="shadow-md shadow-black/50  flex flex-col items-start justify-center">
          <Text
            className="w-max px-3 py-1 font-poppins-regular bg-[#FFFBFB] rounded-t-md
          text-orange-500  border-black/5 border-x"
          >
            Account Settings
          </Text>
          <View className="p-4 bg-[#FFFBFB] w-full border-black/5 border-x border-b rounded-b-md rounded-tr-md flex flex-col items-start justify-start">
            <Text className="font-poppins-regular text-sm mb-2">
              Click the "Update Information" to open dialog for information
              update.
            </Text>
            <TouchableOpacity
              onPress={() => setShowUpdateName(true)}
              className="bg-orange-400 rounded-md px-3 py-1 shadow-md shadow-black"
            >
              <Text className="text-white font-poppins-regular w-max">
                Update Information
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-2 shadow-md shadow-black/50  flex flex-col items-start justify-center">
          <Text
            className="w-max px-3 py-1 font-poppins-regular bg-[#FFFBFB] rounded-t-md
          text-red-500  border-black/5 border-x"
          >
            Account Deletion
          </Text>
          <View className="p-4 bg-[#FFFBFB] w-full border-black/5 border-x border-b rounded-b-md rounded-tr-md flex flex-col items-start justify-start">
            <Text className="font-poppins-regular text-sm mb-2 text-red-500">
              All your data such as recipe, ingredients and your personal
              information will be deleted from database.
            </Text>
            <TouchableOpacity
              onPress={() => setShowDeleteAccModal(true)}
              className="bg-red-500 rounded-md px-3 py-1 shadow-md shadow-black"
            >
              <Text className="text-white font-poppins-regular w-max">
                Delete account
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          isVisible={showDeleteAccModal}
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
        >
          <View className="p-4 rounded-md shadow-md shadow-black flex-col bg-white">
            <Text className="font-poppins-regular">
              Are you sure you want to delete your account?
            </Text>
            <View className="mt-2 flex-row items-end justify-end">
              <TouchableOpacity
                disabled={loading}
                onPress={handleDeleteAccount}
                className="mx-1 bg-red-600 rounded-md px-2 py-1 shadow-black shadow-md"
              >
                <Text className="font-poppins-regular text-white">
                  {loading ? "Deleting account..." : "Delete Account"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="mx-1 bg-emerald-500 rounded-md px-2 py-1 shadow-black shadow-md"
                onPress={() => setShowDeleteAccModal(!showDeleteAccModal)}
              >
                <Text className="font-poppins-regular text-white">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <UpdateNameModal
          data={data}
          setData={setData}
          loading={loading}
          handleUpdateName={handleUpdateName}
          setShowUpdateName={setShowUpdateName}
          showUpdateName={showUpdateName}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default settings;
