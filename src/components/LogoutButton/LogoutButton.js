import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";

const LogoutButton = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.dispatch(StackActions.replace("SignInScreen"));
  };

  return (
    <View>
      <Button icon="logout" mode="contained-tonal" onPress={handleLogout}>
        Log Out
      </Button>
    </View>
  );
};

export default LogoutButton;
