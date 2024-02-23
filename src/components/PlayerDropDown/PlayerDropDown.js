import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const PlayerDropDown = ({
  items,
  value,
  setValue,
  label,
  isCourt,
  oppositionInput,
}) => {
  const [open, setOpen] = useState(false);

  //calculate unique groups and append to list item
  if (!isCourt) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].value === oppositionInput) {
        items[i].disabled = true;
        (items[i].containerStyle = {
          backgroundColor: "white",
        }),
          (items[i].labelStyle = {
            color: "grey",
          });
        break;
      }
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.dropdown}>
          <DropDownPicker
            listMode="MODAL"
            modalTitle={label}
            categorySelectable={false}
            listParentLabelStyle={{
              fontWeight: "bold",
            }}
            open={open}
            items={items}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
            placeholder={label}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdown: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: "100%",
  },
});

export default PlayerDropDown;
