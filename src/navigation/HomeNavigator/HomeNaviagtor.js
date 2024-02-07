import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../../components/Header";

//screens
import LeaguesScreen from "../../screens/LeaguesScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={LeaguesScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <Header />,
          headerLeft: () => null,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
