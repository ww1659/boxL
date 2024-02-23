import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { validateScore } from "../../utils/validateScore";
import { validateChampsTiebreak } from "../../utils/validateChampsTiebreak";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { validateThirdSetScore } from "../../utils/validateThirdSetScore";

const ScoreInput = ({
  value,
  setValue,
  placeholder,
  error,
  setError,
  thirdSet,
  maxChars,
  setLoss,
  otherSetLoss,
  isTiebreak,
  straightSetsError,
  setStraightSetsError,
}) => {
  const [showIcon, setShowIcon] = useState(false);

  const validate = (event) => {
    const score = event.nativeEvent.text;
    if (otherSetLoss === true) {
      if (score.split("-")[1] > score.split("-")[0]) {
        setStraightSetsError(true);
      } else {
        setStraightSetsError(false);
      }
    }

    setShowIcon(true);
    let isValid;
    if (isTiebreak) {
      isValid = validateChampsTiebreak(score);
    } else if (thirdSet) {
      isValid = validateThirdSetScore(score);
    } else {
      isValid = validateScore(score);
    }

    if (isValid && !thirdSet) {
      if (score.split("-")[1] > score.split("-")[0]) {
        setLoss(true);
      } else {
        setLoss(false);
      }
    }

    setError(!isValid);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.scoreInput,
          (straightSetsError || error) && styles.error,
        ]}
      >
        <TextInput
          style={styles.text}
          value={value}
          onChangeText={setValue}
          onEndEditing={validate}
          placeholder={placeholder}
          maxLength={maxChars}
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
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#2B2D42",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
  error: {
    borderColor: "#D90429",
  },
  text: {
    color: "#2B2D42",
    fontSize: 20,
    fontWeight: "500",
    flex: 4,
  },
  icon: { marginLeft: 10, flex: 1 },
});

export default ScoreInput;
