import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Image, Text, TextInput, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import LoginForm from "@/components/LoginForm";
SplashScreen.preventAutoHideAsync();

const login = () => {
  const [loaded, error] = useFonts({
    cursive: require("@/assets/fonts/dancing_script.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

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

      <LoginForm />
    </View>
  );
};
export default login;
