import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import { startCase } from "lodash";

const sentenceCase = (name) => {
  return startCase(name.split(" "));
};

const CustomDropdown = ({
  players,
  onSelect,
  label,
  winnerInput,
  loserInput,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleSelectPlayer = (player) => {
    setSelectedPlayer(sentenceCase(player.name));
    onSelect(player.name);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.button}>
        <Text style={styles.text}>{selectedPlayer || `Select ${label}`}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.overlay}>
          {players.map((player, index) => {
            if (player.name !== winnerInput && player.name !== loserInput) {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSelectPlayer(player)}
                >
                  <View>
                    <Text style={styles.playerName}>
                      {sentenceCase(player.name)}
                    </Text>
                    <Divider />
                  </View>
                </TouchableOpacity>
              );
            } else {
              return null;
            }
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
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  button: {
    width: "100%",
  },
  text: { color: "#2B2D42", fontSize: 18 },
  overlay: {
    borderWidth: 2,
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
  playerName: {
    fontSize: 16,
    margin: 15,
  },
});

export default CustomDropdown;
