import React from "react";
import { View, Text, Button, StyleSheet, Pressable } from "react-native";

const CustomButton = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColour,
  fgColour,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        styles[`button_${type}`],
        bgColour ? { backgroundColor: bgColour } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColour ? { color: fgColour } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },

  button_PRIMARY: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#2B2D42",
  },

  button_TERTIARY: { padding: 2 },

  text: { color: "#EDF2F4", fontWeight: "bold", fontSize: 18 },

  text_TERTIARY: {
    fontSize: 14,
    color: "#D90429",
  },
});

export default CustomButton;
