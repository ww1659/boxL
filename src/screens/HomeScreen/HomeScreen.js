import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import LogoInverse from "../../../assets/images/logoInverse.png";

const HomeScreen = () => {
  return (
    <View style={styles.root}>
      <Image source={LogoInverse} style={[styles.logo]} resizeMode="contain" />
      <Text style={styles.header}>Welcome, Billy</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: "100%",
    maxWidth: 500,
    maxHeight: 80,
  },
  header: {
    fontSize: 30,
    textAlign: "left",
    color: "#2B2D42",
  },
});
