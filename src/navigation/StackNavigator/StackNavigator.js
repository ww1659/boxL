import { createNativeStackNavigator } from "@react-navigation/native-stack";

//screens
import SignInScreen from "../../screens/SignInScreen";
import CreateAccountScreen from "../../screens/CreateAccountScreen";
import BottomTabs from "../BottomTabs/";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen}></Stack.Screen>
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      ></Stack.Screen>
      <Stack.Screen name="BottomTabs" component={BottomTabs}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default StackNavigator;
