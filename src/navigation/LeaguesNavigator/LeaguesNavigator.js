import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/Header";

//screens
import LeaguesScreen from "../../screens/LeaguesScreen";
import IndividualLeagueScreen from "../../screens/IndividualLeagueScreen";
import PlayersScreen from "../../screens/PlayersScreen/PlayersScreen";
import LeagueResultsScreen from "../../screens/LeagueResultsScreen/LeagueResultsScreen";

const Stack = createNativeStackNavigator();

const LeaguesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leagues"
        component={LeaguesScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <Header />,
          headerLeft: () => null,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="IndividualLeague"
        component={IndividualLeagueScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <Header />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="PlayersScreen"
        component={PlayersScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <Header />,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="LeagueResultsScreen"
        component={LeagueResultsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <Header />,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default LeaguesNavigator;
