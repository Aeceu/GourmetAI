import { useGlobal } from "@/context/GlobalProvider";
import { Link, Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const index = () => {
  const { state } = useGlobal();
  if (state.isLogged && state.currentUser)
    return <Redirect href={"/(tabs)/home"} />;
  return (
    <SafeAreaView className="bg-black h-full">
      <View className="bg-[#F0FFFF] w-full h-full flex flex-col items-center justify-center">
        <View className="h-1/2 flex flex-col items-center justify-center">
          <View className="p-4 flex flex-row items-center  ">
            <Image
              className="w-[50px] h-[50px]"
              source={require("@/assets/icons/food_1.png")}
            />
            <Text
              className="text-4xl flex flex-row items-center gap-2"
              style={{ fontFamily: "cursive" }}
            >
              Gourmet<Text className="text-orange-500">AI</Text>
            </Text>
          </View>
          <Text className="text-lg text-center font-poor-story ">
            Your culinary companion powered by AI for effortless recipe
            crafting.
          </Text>
        </View>
        <View className="p-4 w-full h-1/2 flex flex-col items-center justify-end">
          <Link href={"/(auth)/login"} asChild>
            <TouchableOpacity className="bg-orange-400 w-full flex flex-row p-3  rounded-md border border-orange-100 shadow-md shadow-black items-center justify-center">
              <Text className="text-white font-poppins-regular  text-2xl">
                Log in
              </Text>
            </TouchableOpacity>
          </Link>
          <Text className="my-1 text-lg font-poppins-regular">or</Text>
          <Link href={"/(auth)/signup"} asChild>
            <TouchableOpacity className="bg-orange-400 w-full flex flex-row p-3  rounded-md border border-orange-100 shadow-md shadow-black items-center justify-center">
              <Text className="text-white font-poppins-regular  text-2xl">
                Sign up
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};
export default index;
