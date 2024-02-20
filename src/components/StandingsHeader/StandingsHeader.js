import React from "react";
import { DataTable } from "react-native-paper";

const StandingsHeader = () => {
  return (
    <DataTable.Header>
      <DataTable.Title>Player</DataTable.Title>
      <DataTable.Title numeric>P</DataTable.Title>
      <DataTable.Title numeric>W</DataTable.Title>
      <DataTable.Title numeric>Pts</DataTable.Title>
    </DataTable.Header>
  );
};

export default StandingsHeader;
