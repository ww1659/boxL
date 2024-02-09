import React from "react";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

const LeagueButton = ({ text, icon, onPress }) => (
  <View style={styles.button}>
    <Button
      icon={() => (
        <MaterialCommunityIcons name={icon} size={24} color="#EDF2F4" />
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
    paddingVertical: 20,
  },
});

export default LeagueButton;
