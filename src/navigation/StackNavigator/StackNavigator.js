import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import SignInScreen from "../../screens/SignInScreen";
import CreateAccountScreen from "../../screens/CreateAccountScreen";
import BottomTabs from "../BottomTabs/";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
