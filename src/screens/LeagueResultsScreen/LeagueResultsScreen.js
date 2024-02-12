import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import { fetchResultsByLeagueId } from "../../utils/api";
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  Text,
} from "react-native-paper";
import { startCase } from "lodash";

const getFirstName = (name) => {
  return startCase(name.split(" ")[0]);
};

const LeagueResultsScreen = ({ route }) => {
  const { leagueId } = route.params;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResultsByLeagueId(leagueId)
      .then((results) => {
        setResults(results);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(results);

  return (
    <ScrollView>
      <View>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <FlatList
            data={results}
            renderItem={({ item, index }) => (
              <View style={styles.matchCard}>
                <View style={styles.matchInfo}>
                  <Text style={styles.text}>{item.group_name}</Text>
                  <Text style={styles.text}>
                    {getFirstName(item.winner_name)}
                  </Text>
                  <Text style={styles.text}>{item.first_set_score}</Text>
                  <Text style={styles.text}>{item.second_set_score}</Text>
                  <Text style={styles.text}>{item.third_set_score}</Text>
                  <Text style={styles.text}>
                    {getFirstName(item.loser_name)}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.result_id.toString()}
          ></FlatList>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  matchCard: {
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Distribute items evenly along the row
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  matchInfo: {
    flex: 1, // Take up all available space horizontally
    flexDirection: "row", // Align items horizontally
    justifyContent: "space-between", // Distribute items evenly along the row
  },
  text: {
    flex: 1, // Take up equal space within the container
    textAlign: "center", // Center the text horizontally
  },
});

export default LeagueResultsScreen;
