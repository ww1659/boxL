import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Text } from "react-native-paper";
import React from "react";

const StatsScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Avatar.Text label={"BW"} />
        <Text variant="headlineMedium" style={styles.header}>
          Billy White
        </Text>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Coming soon...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: { marginVertical: 10, color: "#2B2D42" },
  loading: {
    paddingTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginVertical: 5,
    fontSize: 24,
    color: "#2B2D42",
  },
});

export default StatsScreen;
