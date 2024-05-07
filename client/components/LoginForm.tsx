import axios from "@/api/axios";
import { useGlobal } from "@/context/GlobalProvider";
import { AxiosError } from "axios";
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

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useGlobal();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/login", data);
      console.log(res.data);
      dispatch({ type: "SET_USER_ID", payload: res.data.id });
      router.push("/verify");
    } catch (error) {
      if (error === typeof AxiosError) {
        const axioserr = error as AxiosError;
        console.log("error");
        if (typeof axioserr.response?.data === "string") {
          console.log(axioserr.response?.data);
        }
      }
      console.log("error1");
      console.log(error);
      ToastAndroid.show("ERROR!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
      setData({
        email: "",
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
      <Link href={"/(auth)/signup"} className="text-sm text-center">
        Don't have an account?{" "}
        <Text className="text-emerald-500 font-bold">Sign up here</Text>
      </Link>
      <Pressable
        disabled={loading}
        className="w-full rounded-md bg-orange-500 p-2 items-center justify-center shadow-xl shadow-black"
        onPress={handleLogin}
      >
        <Text className="text-2xl text-white">
          {loading ? "Logging in..." : "Log in"}
        </Text>
      </Pressable>
    </View>
  );
};
export default LoginForm;
