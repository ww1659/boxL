import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchResultsByLeagueId } from "../../utils/api";
import { ActivityIndicator } from "react-native-paper";

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

  return (
    <View>
      {loading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <FlatList
          data={results}
          renderItem={({ item }) => <Text>{item.first_set_score}</Text>}
          keyExtractor={(item) => item.result_id.toString()}
        ></FlatList>
      )}
    </View>
  );
};

export default LeagueResultsScreen;
