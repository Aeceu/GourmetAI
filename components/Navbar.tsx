import { View, Text, Image } from "react-native";
const Navbar = () => {
  return (
    <View className="flex-row items-center justify-between px-4 h-[50px] bg-orange-500">
      <Image
        source={require("@/assets/icons/burger.png")}
        className=" w-[40px] h-[40px]"
      />
      <Image
        source={require("@/assets/images/download.png")}
        className=" w-[40px] h-[40px] rounded-full"
      />
    </View>
  );
};
export default Navbar;
