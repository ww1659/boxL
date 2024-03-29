import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LeagueButton = ({ text, icon, onPress }) => (
  <View style={styles.button}>
    <Button
      icon={() => (
        <MaterialCommunityIcons name={icon} size={18} color="#EDF2F4" />
      )}
      mode="contained-tonal"
      buttonColor="#2B2D42"
      textColor="#EDF2F4"
      onPress={onPress}
    >
      {text}
    </Button>
  </View>
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 2,
  },
});

export default LeagueButton;
