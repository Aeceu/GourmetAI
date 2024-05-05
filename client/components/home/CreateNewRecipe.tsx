import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
const CreateNewRecipe = () => {
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
        <ScrollView className="flex-col gap-2 p-2">
          <Text className="font-poor-story text-orange-500 text-3xl">
            Create new recipe
          </Text>
          <Text className="font-poor-story text-2xl">• Egg</Text>
          <Text className="font-poor-story text-2xl">• Peanut</Text>
          <Text className="font-poor-story text-2xl">• Mayonnaise</Text>
          <Text className="font-poor-story text-2xl">• Onions</Text>
        </ScrollView>
        <View className="w-full flex flex-row p-4 items-center justify-end">
          <Pressable className="bg-white rounded-full shadow-md shadow-black">
            <Image
              source={require("@/assets/icons/plus.png")}
              className="w-[40px] h-[40px] rounded-full"
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};
export default CreateNewRecipe;
const styles = StyleSheet.create({});
