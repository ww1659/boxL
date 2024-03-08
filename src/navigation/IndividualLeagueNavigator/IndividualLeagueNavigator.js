import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/Header";

//screens
import IndividualLeagueScreen from "../../screens/IndividualLeagueScreen";
import PlayersScreen from "../../screens/PlayersScreen/PlayersScreen";
import LeagueResultsScreen from "../../screens/LeagueResultsScreen/LeagueResultsScreen";
import PostResultScreen from "../../screens/PostResultScreen/PostResultScreen";
import { LeagueDataProvider } from "../../contexts/LeagueDataContext";

const Stack = createNativeStackNavigator();

const IndividualLeagueNavigator = ({ route, navigation }) => {
  const { leagueId } = route.params;

  return (
    <LeagueDataProvider leagueId={leagueId}>
      <Stack.Navigator>
        <Stack.Screen
          name="IndividualLeague"
          component={IndividualLeagueScreen}
          initialParams={{ leagueId }}
          options={{
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <Header {...props} navigation={navigation} />
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="PlayersScreen"
          component={PlayersScreen}
          initialParams={{ leagueId }}
          options={{
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <Header {...props} navigation={navigation} />
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="LeagueResultsScreen"
          component={LeagueResultsScreen}
          initialParams={{ leagueId }}
          options={{
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <Header {...props} navigation={navigation} />
            ),
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="PostResultScreen"
          component={PostResultScreen}
          initialParams={{ leagueId }}
          options={{
            headerTitleAlign: "center",
            headerTitle: (props) => (
              <Header {...props} navigation={navigation} />
            ),
          }}
        ></Stack.Screen>
      </Stack.Navigator>
    </LeagueDataProvider>
  );
};

export default IndividualLeagueNavigator;
