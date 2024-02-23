import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { fetchResultsByUserId } from "../../utils/api";
import ResultCard from "../../components/ResultCard/ResultCard";
import { Ionicons } from "@expo/vector-icons";

const ResultsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [myResults, setMyResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(true);

  useEffect(() => {
    fetchResultsByUserId(user.userId)
      .then((results) => {
        setMyResults(results);
        setLoadingResults(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingResults(false);
      });
  }, []);

  const matchesWon = myResults.reduce((acc, result) => {
    if (result.winner_id === user.userId) {
      return acc + 1;
    } else return acc;
  }, 0);

  let winLossRatio;
  const matchesLost = myResults.length - matchesWon;
  if (matchesLost === 0) {
    winLossRatio = "infinite";
  } else {
    winLossRatio = (matchesWon / matchesLost).toFixed(2);
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.root}>
          <Text variant="displayMedium" style={styles.header}>
            My Results
          </Text>
          <View style={styles.row}>
            <Text variant="labelLarge" style={styles.column}>
              Matches Played
            </Text>
            <Text variant="labelLarge" style={styles.column}>
              Matches Won
            </Text>
            <Text variant="labelLarge" style={styles.column}>
              W/L Ratio
            </Text>
          </View>
          <View style={styles.row}>
            <Text variant="displayMedium" style={styles.column}>
              {myResults.length}
            </Text>
            <Text variant="displayMedium" style={styles.column}>
              {matchesWon}
            </Text>
            <Text variant="displayMedium" style={styles.column}>
              {winLossRatio === "infinite" ? (
                <Ionicons name="infinite-outline" size={50} color="#2B2D42" />
              ) : (
                winLossRatio
              )}
            </Text>
          </View>

          <Text variant="titleLarge" style={styles.matchesHeader}>
            Recent Matches
          </Text>
          {loadingResults ? (
            <Text>Loading these mothers....</Text>
          ) : (
            <>
              {myResults.map((result) => (
                <View key={result.result_id}>
                  <ResultCard
                    user={user}
                    winnerId={result.winner_id}
                    loserId={result.loser_id}
                    firstSet={result.first_set_score}
                    secondSet={result.second_set_score}
                    thirdSet={result.third_set_score}
                    isChampionshipTiebreak={result.championship_tiebreak}
                    championshipTiebreakScore={
                      result.championship_tiebreak_score
                    }
                    date={result.match_date}
                  />
                </View>
              ))}
            </>
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  header: {
    textAlign: "left",
    color: "#2B2D42",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  column: {
    textAlign: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  matchesHeader: {
    textAlign: "left",
    color: "#2B2D42",
    paddingTop: 10,
  },
});

export default ResultsScreen;
