import { View, StyleSheet, Pressable, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePicker = ({
  dateInput,
  setDateInput,
  showDate,
  setShowDate,
}) => {
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const formattedDate = new Date(currentDate).toISOString().split("T")[0];
    setShowDate(false);
    setDateInput(formattedDate);
  };

  const handlePress = () => {
    setShowDate(true);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.dateButton} onPress={handlePress}>
        <Text style={styles.text}>{dateInput ? dateInput : "Select Date"}</Text>
        <MaterialCommunityIcons
          style={styles.icon}
          name="calendar-today"
          size={24}
          color="black"
        />
      </Pressable>
      {showDate ? (
        <RNDateTimePicker mode="date" value={new Date()} onChange={onChange} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  dateButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#2B2D42",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  text: {
    alignItems: "center",
    fontSize: 18,
  },
  icon: {
    marginLeft: 20,
  },
});

export default CustomDatePicker;
