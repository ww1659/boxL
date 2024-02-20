import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator, Divider, Text } from "react-native-paper";
import { startCase } from "lodash";
import { formatDateShort } from "../../utils/formatDate";

const getFirstName = (name) => {
  return startCase(name.split(" ")[0]);
};

const LeagueResultsScreen = ({ route }) => {
  const { results, loading } = route.params;

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
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View>
            {Object.entries(resultsByDate).map(([date, results]) => (
              <View key={date}>
                <Text style={styles.dateHeader}>{date}</Text>
                <View style={styles.headerRow}>
                  <Text style={[styles.headerText, styles.winner]}>Winner</Text>
                  <Text style={[styles.headerText, styles.loser]}>Loser</Text>
                  <Text style={[styles.headerText, styles.score]}>Set 1</Text>
                  <Text style={[styles.headerText, styles.score]}>Set 2</Text>
                  <Text style={[styles.headerText, styles.score]}>Set 3</Text>
                </View>
                {results.map((item, index) => (
                  <View key={item.result_id}>
                    <View style={styles.matchCard}>
                      <View style={styles.matchInfo}>
                        <Text style={[styles.text, styles.winner]}>
                          {getFirstName(item.winner_name)}
                        </Text>
                        <Text style={[styles.text, styles.loser]}>
                          {getFirstName(item.loser_name)}
                        </Text>
                        <Text style={[styles.text, styles.score]}>
                          {item.first_set_score}
                        </Text>
                        <Text style={[styles.text, styles.score]}>
                          {item.second_set_score}
                        </Text>
                        <Text style={[styles.text, styles.score]}>
                          {item.third_set_score}
                        </Text>
                      </View>
                    </View>
                    <Divider />
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
  dateHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  matchCard: {
    marginVertical: 10,
    paddingVertical: 2,
    borderRadius: 5,
  },
  matchInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
  },
  winner: {
    width: "20%",
  },
  loser: {
    width: "20%",
  },
  score: {
    width: "20%",
  },
});

export default LeagueResultsScreen;
