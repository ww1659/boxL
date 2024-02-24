import React from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

const StandingsRow = ({
  player,
  matchesPlayed,
  wins,
  setsWon,
  setsLost,
  gamesWon,
  gamesLost,
  expanded,
}) => {
  let setsRatio;
  if (setsWon !== 0 && setsLost === 0) {
    setsRatio = "infinite";
  } else {
    setsRatio = (setsWon / setsLost).toFixed(2);
  }

  let gamesRatio;
  if (gamesWon !== 0 && gamesLost === 0) {
    gamesRatio = "infinite";
  } else {
    gamesRatio = (gamesWon / gamesLost).toFixed(2);
  }

  return (
    <DataTable.Row>
      <DataTable.Cell textStyle={expanded ? null : styles.large}>
        {player}
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={expanded ? null : styles.large}>
        {matchesPlayed}
      </DataTable.Cell>
      <DataTable.Cell numeric textStyle={expanded ? null : styles.large}>
        {wins}
      </DataTable.Cell>
      {expanded ? (
        <>
          <DataTable.Cell numeric>
            {setsRatio === "infinite" ? (
              <Ionicons name="infinite-outline" size={16} color="#2B2D42" />
            ) : (
              setsRatio
            )}
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {gamesRatio === "infinite" ? (
              <Ionicons name="infinite-outline" size={16} color="#2B2D42" />
            ) : (
              gamesRatio
            )}
          </DataTable.Cell>
          {/* <DataTable.Cell numeric>{gamesWon}</DataTable.Cell>
          <DataTable.Cell numeric>{gamesLost}</DataTable.Cell> */}
        </>
      ) : null}

      <DataTable.Cell
        numeric
        textStyle={[styles.bold, expanded ? null : styles.large]}
      >
        {wins * 2}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
  large: { fontSize: 16 },
});

export default StandingsRow;
