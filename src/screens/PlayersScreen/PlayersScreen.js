import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native-paper";
import PlayerCard from "../../components/PlayerCard/PlayerCard";

const PlayersScreen = ({ route }) => {
  const { players, loading } = route.params;

  return (
    <ScrollView style={styles.root}>
      <SafeAreaView>
        {loading ? (
          <ActivityIndicator animating={true} />
        ) : (
          <View>
            {players.map((item, index) => (
              <PlayerCard
                key={item.user_id}
                username={item.username}
                name={item.name}
                avatar={item.avatar_url}
              />
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
});

export default PlayersScreen;
