import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
const RecentActivities = () => {
  return (
    <ScrollView
      className="bg-white p-4"
      contentContainerStyle={{ height: "100%" }}
    >
      <View className=" w-full h-full  relative ">
        <Image
          source={require("@/assets/images/nb.jpg")}
          className="w-full h-full opacity-50 rounded-md absolute top-0 left-0"
          resizeMode="stretch"
        />
        <ScrollView className="flex-col gap-4 p-2">
          <Text className="font-poor-story  text-orange-500 text-3xl">
            Recent Activities
          </Text>
          <Text className="font-poppins-regular text-sm">
            12:00: <Text className="text-[#FF9900] font-bold">chicken</Text> has
            been added to{" "}
            <Text className="text-emerald-500 font-bold">My Ingredients</Text>.
          </Text>
          <Text className="font-poppins-regular text-sm">
            11:45: <Text className="text-[#FF9900] font-bold">vinegar</Text>{" "}
            removed from{" "}
            <Text className="text-emerald-500 font-bold">My Ingredients</Text>.
          </Text>
          <Text className="font-poppins-regular text-sm">
            10:30: <Text className="text-[#FF9900] font-bold">onions</Text> has
            been added to{" "}
            <Text className="text-emerald-500 font-bold">My Ingredients</Text>.
          </Text>
          <Text className="font-poppins-regular text-sm">
            8:00: <Text className="text-[#FF9900] font-bold">milk</Text> has
            been added to{" "}
            <Text className="text-emerald-500 font-bold">My Ingredients</Text>.
          </Text>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
export default RecentActivities;
