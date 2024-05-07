import axios from "@/api/axios";
import { useGlobal } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const verify = () => {
  const [otp, setOtp] = useState("");
  const { state, dispatch } = useGlobal();
  const [loading, setLoading] = useState(false);
  const handleSendCode = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/verify", { userId: state.userId, otp });
      console.log(res.data);
      dispatch({ type: "SET_CURRENT_USER", payload: res.data.user });
      dispatch({ type: "SET_USER_ID", payload: res.data.user.id });
      console.log(res.data.user.id);
      router.push("/");
    } catch (error) {
      console.log(error);
      console.log("ERROR!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full h-full flex flex-col items-center  bg-[#FFFBFB]">
      <Image
        source={require("@/assets/images/auth.png")}
        className="h-[250px] w-full"
        resizeMode="cover"
      />

      <View className="mb-2 flex flex-row items-center gap-4 ">
        <Image
          className="w-[40px] h-[40px]"
          source={require("@/assets/icons/food_1.png")}
        />
        <Text
          className="text-4xl flex flex-row items-center gap-2"
          style={{ fontFamily: "cursive" }}
        >
          Gourmet<Text className="text-orange-500">AI</Text>
        </Text>
      </View>

      <View className="w-full h-full p-8 space-y-4">
        <Text>Input Code:</Text>
        <TextInput
          value={otp}
          onChangeText={(e) => setOtp(e)}
          keyboardType="numeric"
          className="rounded-md w-full bg-white shadow-md shadow-black px-4 py-2"
        />
        <TouchableOpacity
          disabled={loading}
          onPress={handleSendCode}
          className="rounded-md bg-[#FF9900] p-2 flex items-center justify-center shadow-md shadow-black"
        >
          <Text className="text-white font-poppins-regular text-lg font-bold">
            {loading ? "Sending code..." : "Send Code"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default verify;
