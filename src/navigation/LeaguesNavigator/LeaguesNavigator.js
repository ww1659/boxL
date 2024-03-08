import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/Header";

//screens
import LeaguesScreen from "../../screens/LeaguesScreen";
import IndividualLeagueNavigator from "../IndividualLeagueNavigator/IndividualLeagueNavigator";

const Stack = createNativeStackNavigator();

const LeaguesNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leagues"
        component={LeaguesScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <Header {...props} navigation={navigation} />,
          headerLeft: () => null,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="IndividualNavigator"
        component={IndividualLeagueNavigator}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default LeaguesNavigator;
