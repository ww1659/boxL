import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import StackNavigator from "./src/navigation/StackNavigator";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider theme={customTheme}>
        <NavigationContainer style={styles.container}>
          <StackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2B2D42",
    accent: "#8D99AE",
    background: "#EDF2F4",
    text: "#D90429",
    disabled: "#EF233C",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edf2f4",
  },
});
