import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { startCase } from "lodash";
import { useLeagueData } from "../../contexts/LeagueDataContext";
import { useAuth } from "../../contexts/AuthContext";
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
  const { standings, results, league, players, club, loading } =
    useLeagueData();
  const { user } = useAuth();

  let isUserAdmin = false;
  if (user.userId === league.admin) isUserAdmin = true;

  const uniqueGroups = Array.from(
    new Set(standings.map((item) => item.group_name))
  );

  const initialState = {};
  uniqueGroups.forEach((group) => {
    initialState[`expandGroupTable${group}`] = false;
  });
  const [expandGroupTables, setExpandGroupTables] = useState(initialState);

  const sortedStandings = sortStandings(standings, results);

  const handlePlayersPress = () => {
    navigation.navigate("PlayersScreen", { players, loading });
  };

  const handleResultsPress = () => {
    navigation.navigate("LeagueResultsScreen", { results, loading });
  };

  const handlePostResultPress = () => {
    navigation.navigate("PostResultScreen", { isUserAdmin });
  };

  const handleExpandPress = (group) => {
    const key = `expandGroupTable${group}`;
    setExpandGroupTables((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
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
            <View style={styles.infoRow}>
              <Text variant="labelLarge">{changeFormat(league.format)}</Text>
              <Text style={styles.test} variant="labelLarge">
                {" "}
                .{" "}
              </Text>
              <Text variant="labelLarge">{changeFormat(club.name)}</Text>
            </View>
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
            </View>
            <View style={styles.buttonsRow}>
              <LeagueButton
                text={"Post Result"}
                icon={"plus"}
                onPress={() => handlePostResultPress()}
              />
            </View>
            {uniqueGroups.map((groupName) => (
              <View key={groupName} style={styles.groupContainer}>
                <Text style={styles.groupTitle}>Group {groupName}</Text>
                <StandingsHeader
                  expanded={expandGroupTables[`expandGroupTable${groupName}`]}
                />
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
                      setsWon={item.sets_won}
                      setsLost={item.sets_lost}
                      gamesWon={item.games_won}
                      gamesLost={item.games_lost}
                      expanded={
                        expandGroupTables[`expandGroupTable${groupName}`]
                      }
                    />
                  ))}
                <View style={styles.expandButtonRow}>
                  <Button
                    textColor="#2B2D42"
                    // mode="outlined"
                    icon={
                      expandGroupTables[`expandGroupTable${groupName}`]
                        ? "arrow-collapse"
                        : "arrow-expand"
                    }
                    onPress={() => handleExpandPress(groupName)}
                  >
                    {expandGroupTables[`expandGroupTable${groupName}`]
                      ? "Basic View"
                      : "Detailed View"}{" "}
                  </Button>
                </View>
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
    marginBottom: 5,
    textAlign: "left",
    color: "#2B2D42",
  },
  test: {
    fontWeight: "bold",
    fontSize: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 10,
  },
  expandButtonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    marginTop: 10,
  },
  groupContainer: {
    marginVertical: 20,
  },
  groupTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default IndividualLeagueScreen;
