import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

//screens
import StatsScreen from "../../screens/StatsScreen/StatsScreen";
import ResultsScreen from "../../screens/ResultsScreen";
import LeaguesNavigator from "../LeaguesNavigator/LeaguesNavigator";

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

          if (rn === "LeaguesScreen") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (rn === "ResultsScreen") {
            iconName = focused ? "view-list" : "view-list-outline";
          } else if (rn === "StatsScreen") {
            iconName = focused ? "account-circle" : "account-circle-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },

        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="LeaguesScreen" component={LeaguesNavigator} />
      <Tab.Screen name="ResultsScreen" component={ResultsScreen} />
      <Tab.Screen name="StatsScreen" component={StatsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
