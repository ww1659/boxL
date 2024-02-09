import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUsersByLeagueId } from "../../utils/api";
import { ActivityIndicator } from "react-native-paper";

const PlayersScreen = ({ route }) => {
  const { leagueId } = route.params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsersByLeagueId(leagueId)
      .then((users) => {
        setUsers(users);
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
          data={users}
          renderItem={({ item }) => <Text>{item.username}</Text>}
          keyExtractor={(item) => item.user_id.toString()}
        ></FlatList>
      )}
    </View>
  );
};

export default PlayersScreen;
