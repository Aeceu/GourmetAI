import { useGlobal } from "@/context/GlobalProvider";
import { Redirect, Tabs } from "expo-router";
import { Image, ImageProps, StyleSheet, Text, View } from "react-native";

const TabIcon = ({
  icon,
  color,
  name,
  focused,
}: {
  icon: ImageProps;
  color: string;
  name: string;
  focused: boolean;
}) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { state } = useGlobal();

  if (!state.currentUser) return <Redirect href={"/(auth)/login"} />;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#000000",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#F0FFFF",
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require("@/assets/icons/home.png")}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: "Recipe",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require("@/assets/icons/recipe.png")}
              color={color}
              name="Recipe"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require("@/assets/icons/profile.png")}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require("@/assets/icons/settings.png")}
              color={color}
              name="Settings"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;
