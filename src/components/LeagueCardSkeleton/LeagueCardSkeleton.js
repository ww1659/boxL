import React from "react";
import { View, StyleSheet } from "react-native";

const LeagueCardSkeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.circle}>
          <View style={styles.avatar} />
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.placeholder} />
    </View>
  );
};

export default LeagueCardSkeleton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F6F6",
    borderRadius: 13,
    padding: 16,
    marginVertical: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  circle: {
    flex: 1,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
  },
  placeholder: {
    flex: 4,
    backgroundColor: "#ccc",
    height: 16,
    borderRadius: 4,
    marginBottom: 4,
  },
});
