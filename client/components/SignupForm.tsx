import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

const SignupForm = () => {
  const [showPass, setShowPass] = useState(false);

  function showToast() {
    ToastAndroid.show("Request sent successfully!", ToastAndroid.SHORT);
    router.replace("/(auth)/login");
  }

  return (
    <View className="w-full p-4 h-full  font-poppins space-y-4">
      <View className="space-y-1">
        <Text className="">Email</Text>
        <TextInput className="px-4 py-2 w-full bg-white rounded-md shadow-md shadow-black" />
      </View>
      <View className="space-y-1">
        <Text className="">Retype Email</Text>
        <TextInput className="px-4 py-2 w-full bg-white rounded-md shadow-md shadow-black" />
      </View>
      <View className="space-y-1">
        <Text className="">Password</Text>
        <View className=" px-4 py-2 w-full bg-white rounded-md shadow-md shadow-black flex-row  items-center justify-between">
          <TextInput className="flex-1 w-full" secureTextEntry={!showPass} />
          {
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <Image
                source={
                  showPass
                    ? require("@/assets/icons/eye.png")
                    : require("@/assets/icons/eyeoff.png")
                }
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          }
        </View>
      </View>
      <Link href={"/(auth)/login"} className="text-sm text-center">
        Already have an account?{" "}
        <Text className="text-emerald-500 font-bold">Log in here</Text>
      </Link>
      <Pressable
        className="w-full rounded-md bg-orange-500 p-2 items-center justify-center shadow-xl shadow-black"
        onPress={showToast}
      >
        <Text className="text-2xl text-white">Sign up</Text>
      </Pressable>
    </View>
  );
};
export default SignupForm;
