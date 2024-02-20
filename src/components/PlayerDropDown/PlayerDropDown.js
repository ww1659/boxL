import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const PlayerDropDown = ({ items, value, setValue, label }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.dropdown}>
        <DropDownPicker
          open={open}
          items={items}
          setOpen={setOpen}
          value={value}
          setValue={setValue}
          placeholder={label}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
  },
  dropdown: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlayerDropDown;
