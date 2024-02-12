import React, { useEffect, useState } from "react";
import { startCase } from "lodash";
import { View, StyleSheet, ScrollView, FlatList } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  fetchLeagueByLeagueId,
  fetchResultsByLeagueId,
  fetchStandingsByLeagueId,
} from "../../utils/api";
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

const IndividualLeagueScreen = ({ route, navigation }) => {
  const { leagueId } = route.params;
  const [league, setLeague] = useState({});
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    Promise.all([
      fetchLeagueByLeagueId(leagueId),
      fetchStandingsByLeagueId(leagueId),
      fetchResultsByLeagueId(leagueId),
    ])
      .then(([league, standings, results]) => {
        setLeague(league[0]);
        setStandings(standings);
        setResults(results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [leagueId]);

  const uniqueGroups = Array.from(
    new Set(standings.map((item) => item.group_name))
  );
  const sortedStandings = sortStandings(standings, results);

  const handlePlayersPress = () => {
    navigation.navigate("PlayersScreen", { leagueId });
  };

  const handleResultsPress = () => {
    navigation.navigate("LeagueResultsScreen", { leagueId });
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
            {/* <View style={styles.statsContainer}>
              <Text variant="headlineSmall">Your Results</Text>
              <View style={styles.stats}>
                <Text variant="headlineMedium">W</Text>
                <Text variant="headlineMedium">L</Text>
              </View>
              <View style={styles.stats}>
                <Text variant="headlineSmall" style={styles.winText}>
                  2
                </Text>
                <Text variant="headlineSmall" style={styles.lossText}>
                  1
                </Text>
              </View>
            </View> */}
            {uniqueGroups.map((groupName) => (
              <View key={groupName} style={styles.groupContainer}>
                <Text style={styles.groupTitle}>Group {groupName}</Text>
                <StandingsHeader />
                <FlatList
                  data={sortedStandings.filter(
                    (item) => item.group_name === groupName
                  )}
                  renderItem={({ item }) => (
                    <StandingsRow
                      leagueId={item.league_id}
                      group={item.group_name}
                      player={getFirstName(item.player_name)}
                      matchesPlayed={item.matches_played}
                      wins={item.wins}
                    />
                  )}
                  keyExtractor={(item) => item.standing_id.toString()}
                />
              </View>
            ))}
            <View style={styles.buttons}>
              <View style={styles.buttonsRow}>
                <LeagueButton text={"Standings"} icon={"medal-outline"} />
                <LeagueButton
                  text={"Players"}
                  icon={"account-group-outline"}
                  onPress={() => handlePlayersPress()}
                />
              </View>
              <View style={styles.buttonsRow}>
                <LeagueButton text={"Schedule"} icon={"timetable"} />
                <LeagueButton
                  text={"Results"}
                  icon={"format-list-numbered"}
                  onPress={() => handleResultsPress()}
                />
              </View>
            </View>
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
  // statsContainer: {
  //   paddingTop: 20,
  // },
  // stats: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  // },
  // winText: {
  //   color: "#3DA35D",
  // },
  // lossText: {
  //   color: "#D90429",
  // },
  groupContainer: {
    marginTop: 10,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttons: { paddingTop: 5 },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default IndividualLeagueScreen;
