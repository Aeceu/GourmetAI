import { useGlobal } from "@/context/GlobalProvider";
import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

const Navbar = () => {
  const { state, dispatch } = useGlobal();
  const [showNav, setShowNav] = useState<boolean>(false);

  const handleClick = () => {
    router.push("/recipe");
    setShowNav(false);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // router.push("/(auth)/login");
  };

  return (
    <View className="flex-row items-center justify-between px-4 h-[50px] bg-orange-500">
      <Pressable onPress={() => setShowNav(true)}>
        <Image
          source={require("@/assets/icons/burger.png")}
          className=" w-[40px] h-[40px]"
        />
      </Pressable>
      <Image
        source={require("@/assets/images/download.png")}
        className=" w-[40px] h-[40px] rounded-full"
      />

      <Modal
        isVisible={showNav}
        animationIn={"slideInLeft"}
        animationOut={"slideOutLeft"}
      >
        <View className="w-screen h-screen bg-[#FF9900] flex flex-col justify-center items-center  gap-4 absolute top-0 left-0 "></View>

        <View className="flex items-end">
          <TouchableOpacity onPress={() => setShowNav(false)}>
            <Image
              source={require("@/assets/icons/close.png")}
              className="w-[40px] h-[40px]"
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-col h-full items-center justify-center gap-4">
          <View className="mb-4 flex flex-row items-center gap-4 ">
            <Image
              className="w-[40px] h-[40px]"
              source={require("@/assets/icons/food_1.png")}
            />
            <Text
              className="text-4xl flex flex-row items-center gap-2"
              style={{ fontFamily: "cursive" }}
            >
              Gourmet<Text className="text-white">AI</Text>
            </Text>
          </View>

          <Pressable onPress={() => router.replace("/home")} className="w-max">
            <TouchableOpacity
              onPress={handleClick}
              className="flex-row gap-2 items-center"
            >
              <Image
                className="w-[30px] h-[30px]"
                source={require("@/assets/icons/home.png")}
              />
              <Text className="text-xl text-white font-poppins-regular ">
                Home
              </Text>
            </TouchableOpacity>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/recipe")}
            className="w-max"
          >
            <TouchableOpacity
              onPress={handleClick}
              className="flex-row gap-2 items-center"
            >
              <Image
                className="w-[30px] h-[30px]"
                source={require("@/assets/icons/recipe.png")}
              />
              <Text className="text-xl text-white font-poppins-regular ">
                Recipes
              </Text>
            </TouchableOpacity>
          </Pressable>

          <Link href={"/"} className="w-max">
            <TouchableOpacity
              onPress={handleClick}
              className="flex-row gap-2 items-center"
            >
              <Image
                className="w-[30px] h-[30px]"
                source={require("@/assets/icons/profile.png")}
              />
              <Text className="text-xl text-white font-poppins-regular ">
                Profile
              </Text>
            </TouchableOpacity>
          </Link>

          <Link href={"/"} className="w-max">
            <TouchableOpacity
              onPress={handleClick}
              className="flex-row gap-2 items-center"
            >
              <Image
                className="w-[30px] h-[30px]"
                source={require("@/assets/icons/settings.png")}
              />
              <Text className="text-xl text-white font-poppins-regular ">
                Settings
              </Text>
            </TouchableOpacity>
          </Link>

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
      </Modal>
    </View>
  );
};
export default Navbar;
