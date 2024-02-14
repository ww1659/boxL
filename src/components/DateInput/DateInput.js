import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

const DateInput = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleDateChange = (newDate) => {
    // You may want to add some validation for the new date here
    setDate(newDate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={handleDateChange}
        keyboardType="numeric"
      />
      {/* You can add a button here to submit the date or perform any action */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderColor: "#2B2D42",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  input: {
    text: { color: "#2B2D42", fontSize: 18 },
  },
});
export default DateInput;
