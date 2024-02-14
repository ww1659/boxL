import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { validateScore } from "../../utils/validateScore";

const ScoreInput = ({
  value,
  setValue,
  placeholder,
  error,
  setError,
  readOnly,
}) => {
  let typingTimer;

  const handleInputChange = (score) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      const isValid = validateScore(score);
      setError(!isValid);
    }, 2000);
    setValue(score);
  };

  return (
    <View style={[styles.scoreInput, error && styles.error]}>
      <TextInput
        style={styles.text}
        value={value}
        onChangeText={handleInputChange}
        placeholder={placeholder}
        maxLength={3}
        readOnly={readOnly}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scoreInput: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "#2B2D42",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  error: {
    borderColor: "#D90429",
  },
  text: { color: "#2B2D42", fontSize: 18 },
});

export default ScoreInput;
