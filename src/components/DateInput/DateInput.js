import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

const DateInput = ({ dateInput, setDateInput }) => {
  const handleDateChange = (newDate) => {
    // You may want to add some validation for the new date here
    setDateInput(newDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text}
        value={dateInput}
        onChangeText={handleDateChange}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "#2B2D42",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  text: {
    color: "#2B2D42",
    fontSize: 18,
    width: "100%",
  },
});
export default DateInput;
