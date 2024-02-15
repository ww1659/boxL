import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { validateScore } from "../../utils/validateScore";
import { validateChampsTiebreak } from "../../utils/validateChampsTiebreak";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ScoreInput = ({
  value,
  setValue,
  placeholder,
  error,
  setError,
  readOnly,
  maxChars,
  setSetsEntered,
  isTiebreak,
}) => {
  const [showIcon, setShowIcon] = useState(false);

  console.log(showIcon);

  const validate = (event) => {
    const score = event.target.value;
    setShowIcon(true);
    let isValid;
    if (isTiebreak) {
      isValid = validateChampsTiebreak(score);
    } else {
      isValid = validateScore(score);
    }
    setSetsEntered((current) => current + 1);
    setError(!isValid);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.scoreInput, error && styles.error]}>
        <TextInput
          style={styles.text}
          value={value}
          onChangeText={setValue}
          onBlur={validate}
          placeholder={placeholder}
          maxLength={maxChars}
          readOnly={readOnly}
        />
        {showIcon ? (
          <MaterialCommunityIcons
            style={styles.icon}
            name={error ? "alert-box-outline" : "hand-okay"}
            size={24}
            color={error ? "#D90429" : "#008000"}
          />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreInput: {
    borderWidth: 1,
    flexDirection: "row",
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
  text: { color: "#2B2D42", fontSize: 18, width: "100%" },
  icon: { marginLeft: 10 },
});

export default ScoreInput;
