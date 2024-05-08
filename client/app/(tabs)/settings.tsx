import { useGlobal } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const settings = () => {
  const { state, dispatch } = useGlobal();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    router.push("/(auth)/login");
  };
  return (
    <View>
      <Text>settings</Text>
      <TouchableOpacity
        onPress={handleLogout}
        className="bg-white rounded-md flex flex-row items-center px-6 py-2 shadow-md shadow-black"
      >
        <Text className="mr-2 text-[#FF9900] tracking-wider text-xl font-poppins-regular">
          Logout
        </Text>
        <Image
          source={require("@/assets/icons/logout.png")}
          className="w-[30px] h-[30px]"
        />
      </TouchableOpacity>
    </View>
  );
};
export default settings;
const styles = StyleSheet.create({});
