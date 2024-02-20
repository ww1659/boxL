import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

const CourtDropdown = ({
  numberOfCourts,
  onSelect,
  label,
  courtDropdownVisible,
  toggleDropdownVisibility,
}) => {
  const [selectedCourt, setSelectedCourt] = useState("");

  const courts = [];
  for (let i = 1; i <= numberOfCourts; i++) {
    courts.push(i);
  }

  const handleSelectCourt = (court) => {
    setSelectedCourt(court);
    onSelect(court);
    toggleDropdownVisibility();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={toggleDropdownVisibility}
        style={styles.button}
      >
        <Text style={styles.text}>{selectedCourt || `${label}`}</Text>
      </TouchableOpacity>
      {courtDropdownVisible && (
        <View style={styles.overlay}>
          {courts.map((court, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectCourt(court)}
              >
                <View>
                  <Text style={styles.courtNumber}>{court}</Text>
                  <Divider />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    borderColor: "#2B2D42",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  button: {
    width: "100%",
  },
  text: { color: "#2B2D42", fontSize: 18 },
  overlay: {
    borderWidth: 1,
    borderColor: "#2B2D42",
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderColor: "#2B2D42",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  courtNumber: {
    fontSize: 16,
    margin: 15,
  },
});

export default CourtDropdown;
