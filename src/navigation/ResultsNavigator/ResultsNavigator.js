import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/Header";

//screens
import ResultsScreen from "../../screens/ResultsScreen";

const Stack = createNativeStackNavigator();

const ResultsNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Leagues"
        component={ResultsScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: (props) => <Header {...props} navigation={navigation} />,
          headerLeft: () => null,
        }}
      ></Stack.Screen>
      {/* <Stack.Screen
        name="IndividualNavigator"
        component={IndividualLeagueNavigator}
        options={{ headerShown: false }}
      ></Stack.Screen> */}
    </Stack.Navigator>
  );
};

export default ResultsNavigator;
