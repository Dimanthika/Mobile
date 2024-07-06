import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Platform, Text, View } from "react-native";

interface Icon {
  uri: string;
}

const TabIcon: React.FC<{
  icon: Icon;
  color?: string;
  focused?: boolean;
  name: string;
}> = ({ icon, color, focused, name }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-pbold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const tabBarHeight = Platform.OS === "ios" ? 100 : 75;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#01cd74",
          tabBarInactiveTintColor: "#4d4f53",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0.5,
            borderBottomWidth: 0,
            borderTopColor: "#01cd74",
            borderBottomColor: "#fff",
            height: tabBarHeight,
            shadowColor: "#01cd74",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 1,
            shadowRadius: 3.84,
            elevation: 5,
          },
        }}
      >
        <Tabs.Screen
          name="elections"
          options={{
            title: "Elections",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Elections"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="results"
          options={{
            title: "Results",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.reports}
                color={color}
                name="Results"
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
                icon={icons.user}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#ffffff" style="dark" />
    </>
  );
};

export default TabLayout;
