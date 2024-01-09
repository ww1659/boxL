import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Logo from "../../../assets/images/logo.png";

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo]} resizeMode="contain" />
      <Text style={styles.header}>Welcome, Billy</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: "100%",
    maxWidth: 500,
    maxHeight: 40,
  },
  header: {
    fontSize: 30,
    textAlign: "left",
    color: "#2B2D42",
  },
});
