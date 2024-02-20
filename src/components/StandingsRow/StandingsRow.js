import React from "react";
import { DataTable } from "react-native-paper";

const StandingsRow = ({
  player,
  matchesPlayed,
  wins,
  setsWon,
  setsLost,
  gamesWon,
  gamesLost,
}) => {
  return (
    <DataTable.Row>
      <DataTable.Cell>{player}</DataTable.Cell>
      <DataTable.Cell numeric>{matchesPlayed}</DataTable.Cell>
      <DataTable.Cell numeric>{wins}</DataTable.Cell>
      <DataTable.Cell numeric>{wins * 2}</DataTable.Cell>
    </DataTable.Row>
  );
};

export default StandingsRow;
