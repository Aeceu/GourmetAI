import axios from "@/api/axios";
import { AxiosError } from "axios";
// import axios, { AxiosError } from "axios";
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
  const [data, setData] = useState({
    email: "",
    reemail: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (data.email !== data.reemail) {
      return ToastAndroid.show(
        "email and retype-email doesnt match!",
        ToastAndroid.SHORT
      );
    }

    if (!data.email || !data.reemail || !data.password) {
      return ToastAndroid.show(
        "Please fill up the fields!",
        ToastAndroid.SHORT
      );
    }
    try {
      setLoading(true);
      const res = await axios.post("/signup", data, {
        withCredentials: true,
      });
      console.log(res.data);
      ToastAndroid.show("SUCCESS!", ToastAndroid.SHORT);
      router.push("/(auth)/login");
    } catch (error) {
      if (error === typeof AxiosError) {
        const axioserr = error as AxiosError;
        console.log("error");
        if (typeof axioserr.response?.data === "string") {
          console.log(axioserr.response?.data);
        }
      }
      console.log(error);
      ToastAndroid.show("ERROR!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      setData({
        email: "",
        reemail: "",
        password: "",
      });
    }
  };

  return (
    <View className="w-full p-4 h-full  font-poppins space-y-4">
      <View className="space-y-1">
        <Text className="">Email</Text>
        <TextInput
          value={data.email}
          onChangeText={(e) => setData({ ...data, email: e })}
          className="px-4 py-2 w-full bg-white rounded-md shadow-md shadow-black"
        />
      </View>
      <View className="space-y-1">
        <Text className="">Retype Email</Text>
        <TextInput
          value={data.reemail}
          onChangeText={(e) => setData({ ...data, reemail: e })}
          className="px-4 py-2 w-full bg-white rounded-md shadow-md shadow-black"
        />
      </View>
      <View className="space-y-1">
        <Text className="">Password</Text>
        <View className=" px-4 py-2 w-full bg-white rounded-md shadow-md shadow-black flex-row  items-center justify-between">
          <TextInput
            value={data.password}
            onChangeText={(e) => setData({ ...data, password: e })}
            className="flex-1 w-full"
            secureTextEntry={!showPass}
          />
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
        disabled={loading}
        className="w-full rounded-md bg-orange-500 p-2 items-center justify-center shadow-xl shadow-black"
        onPress={handleSignup}
      >
        <Text className="text-2xl text-white">
          {loading ? "Signing up..." : "Sign up"}
        </Text>
      </Pressable>
    </View>
  );
};
export default SignupForm;
