import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LogoutButton from "../LogoutButton/LogoutButton";

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.screen}>
        <Text style={styles.headerText}>Header</Text>
      </View>
      <View style={styles.logout}>
        <LogoutButton navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
  screen: {
    flex: 2,
  },
  logout: {
    flex: 1,
  },
  headerText: {
    fontWeight: "bold",
    color: "#2B2D42",
    fontSize: 18,
    letterSpacing: 1,
  },
});

export default Header;
