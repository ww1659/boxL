import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { formatDateShort } from "../../utils/formatDate";
import ResultCard from "../../components/ResultCard/ResultCard";
import { useAuth } from "../../contexts/AuthContext";

const LeagueResultsScreen = ({ route }) => {
  const { results, loading } = route.params;
  const { user } = useAuth();

  const resultsByDate = results.reduce((acc, result) => {
    const date = formatDateShort(result.match_date);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(result);
    return acc;
  }, {});

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text variant="displaySmall" style={styles.header}>
          League Results
        </Text>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View>
            {Object.entries(resultsByDate).map(([date, results]) => (
              <View key={date}>
                <Text variant="titleLarge" style={styles.dateHeader}>
                  {date}
                </Text>
                {results.map((item) => (
                  <View key={item.result_id}>
                    <ResultCard
                      user={user}
                      winnerId={item.winner_id}
                      loserId={item.loser_id}
                      firstSet={item.first_set_score}
                      secondSet={item.second_set_score}
                      thirdSet={item.third_set_score}
                      isChampionshipTiebreak={item.championship_tiebreak}
                      championshipTiebreakScore={
                        item.championship_tiebreak_score
                      }
                      date={item.match_date}
                      leagueResult={true}
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>
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
    paddingVertical: 10,
  },
  dateHeader: { marginTop: 30 },
});

export default LeagueResultsScreen;
