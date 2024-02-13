import React from "react";
import { View, Text } from "react-native";
import { useLeagueData } from "../../contexts/LeagueDataContext";

const PostResultScreen = () => {
  const { standings, results, setStandings, setResults, loading } =
    useLeagueData();

  console.log(standings, results);

  return (
    <View>
      <Text>PostResultScreen</Text>
    </View>
  );
};

export default PostResultScreen;
