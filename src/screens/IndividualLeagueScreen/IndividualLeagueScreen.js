import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchLeagueByLeagueId } from "../../utils/api";
import { startCase } from "lodash";
import LeagueButton from "../../components/LeagueButton/LeagueButton";

const changeFormat = (format) => {
  return startCase(format.split("_").join(" "));
};

const IndividualLeagueScreen = ({ route, navigation }) => {
  const { leagueId } = route.params;
  const [league, setLeague] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeagueByLeagueId(leagueId)
      .then((league) => {
        setLeague(league[0]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handlePlayersPress = () => {
    navigation.navigate("PlayersScreen", { leagueId });
  };

  const handleResultsPress = () => {
    navigation.navigate("LeagueResultsScreen", { leagueId });
  };

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <View style={styles.root}>
          <Text variant="displaySmall" style={styles.header}>
            {league.name}
          </Text>
          <Text variant="labelLarge">{changeFormat(league.format)}</Text>
          <View style={styles.statsContainer}>
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
          </View>
          <View style={styles.buttons}>
            <LeagueButton text={"Standings"} icon={"medal-outline"} />
            <LeagueButton
              text={"Players"}
              icon={"account-group-outline"}
              onPress={() => handlePlayersPress()}
            />
            <LeagueButton text={"Schedule"} icon={"timetable"} />
            <LeagueButton
              text={"Results"}
              icon={"format-list-numbered"}
              onPress={() => handleResultsPress()}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
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
  statsContainer: {
    paddingTop: 20,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  winText: {
    color: "#3DA35D",
  },
  lossText: {
    color: "#D90429",
  },
  buttons: {
    maxWidth: "50%",
  },
});

export default IndividualLeagueScreen;
