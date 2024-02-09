import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  formIcon,
  error,
}) => {
  return (
    <View style={[styles.container, error && styles.error]}>
      <MaterialIcons
        style={styles.icon}
        name={formIcon}
        size={24}
        color={error ? "#D90429" : "#2B2D42"}
      />
      <TextInput
        style={styles.text}
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    borderColor: "#2B2D42",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  error: {
    borderColor: "#D90429",
  },
  text: { color: "#2B2D42", fontSize: 18 },
  icon: { marginRight: 10 },
});

export default CustomInput;
