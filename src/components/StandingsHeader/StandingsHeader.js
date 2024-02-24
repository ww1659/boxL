import React from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet } from "react-native";

const StandingsHeader = ({ expanded }) => {
  return (
    <DataTable.Header>
      <DataTable.Title textStyle={expanded ? null : styles.large}>
        Player
      </DataTable.Title>
      <DataTable.Title numeric textStyle={expanded ? null : styles.large}>
        {expanded ? "P" : "Played"}
      </DataTable.Title>
      <DataTable.Title numeric textStyle={expanded ? null : styles.large}>
        {expanded ? "W" : "Wins"}
      </DataTable.Title>
      {expanded ? (
        <>
          <DataTable.Title numeric>Sets R</DataTable.Title>
          <DataTable.Title numeric>Games R</DataTable.Title>
          {/* <DataTable.Title numeric>G+</DataTable.Title>
          <DataTable.Title numeric>G-</DataTable.Title> */}
        </>
      ) : null}

      <DataTable.Title
        numeric
        textStyle={[styles.bold, expanded ? null : styles.large]}
      >
        Pts
      </DataTable.Title>
    </DataTable.Header>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  large: {
    fontSize: 16,
  },
});

export default StandingsHeader;
