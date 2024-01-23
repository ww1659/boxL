import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

//screens
import HomeNavigator from "../HomeNavigator";
import SettingsScreen from "../../screens/SettingsScreen/SettingsScreen";
import ProfileScreen from "../../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          color = "#2B2D42";
          size = 24;

          if (rn === "HomeScreen") {
            iconName = focused ? "home-variant" : "home-variant-outline";
          } else if (rn === "ProfileScreen") {
            iconName = focused ? "account-circle" : "account-circle-outline";
          } else if (rn === "SettingsScreen") {
            iconName = focused ? "cog" : "cog-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },

        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeNavigator} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
