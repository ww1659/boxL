import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { startCase } from "lodash";
import { useLeagueData } from "../../contexts/LeagueDataContext";
import { sortStandings } from "../../utils/sortStandings";
import LeagueButton from "../../components/LeagueButton/LeagueButton";
import StandingsRow from "../../components/StandingsRow";
import StandingsHeader from "../../components/StandingsHeader/StandingsHeader";

const changeFormat = (format) => {
  return startCase(format.split("_").join(" "));
};

const getFirstName = (name) => {
  return startCase(name.split(" ")[0]);
};

const IndividualLeagueScreen = ({ navigation }) => {
  const { standings, results, league, players, loading } = useLeagueData();

  const uniqueGroups = Array.from(
    new Set(standings.map((item) => item.group_name))
  );
  const sortedStandings = sortStandings(standings, results);

  const handlePlayersPress = () => {
    navigation.navigate("PlayersScreen", { players, loading });
  };

  const handleResultsPress = () => {
    navigation.navigate("LeagueResultsScreen", { results, loading });
  };

  const handlePostResultPress = () => {
    navigation.navigate("PostResultScreen");
  };

  return (
    <ScrollView>
      <SafeAreaView>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View style={styles.root}>
            <Text variant="displaySmall" style={styles.header}>
              {league.name}
            </Text>
            <Text variant="labelLarge">{changeFormat(league.format)}</Text>
            <View style={styles.buttons}>
              <View style={styles.buttonsRow}>
                <LeagueButton
                  text={"Players"}
                  icon={"account-group-outline"}
                  onPress={() => handlePlayersPress()}
                />
                <LeagueButton
                  text={"Results"}
                  icon={"format-list-numbered"}
                  onPress={() => handleResultsPress()}
                />
                <LeagueButton
                  text={"Post Result"}
                  icon={"plus"}
                  onPress={() => handlePostResultPress()}
                />
              </View>
              <View style={styles.buttonsRow}></View>
            </View>
            {uniqueGroups.map((groupName) => (
              <View key={groupName} style={styles.groupContainer}>
                <Text style={styles.groupTitle}>Group {groupName}</Text>
                <StandingsHeader />
                {sortedStandings
                  .filter((item) => item.group_name === groupName)
                  .map((item) => (
                    <StandingsRow
                      key={item.standing_id}
                      leagueId={item.league_id}
                      group={item.group_name}
                      player={getFirstName(item.player_name)}
                      matchesPlayed={item.matches_played}
                      wins={item.wins}
                    />
                  ))}
              </View>
            ))}
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 10,
    textAlign: "left",
    color: "#2B2D42",
  },
  buttons: { marginVertical: 10 },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  groupContainer: {
    marginTop: 5,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default IndividualLeagueScreen;
