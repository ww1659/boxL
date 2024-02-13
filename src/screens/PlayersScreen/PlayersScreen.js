import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
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
          <FlatList
            data={players}
            renderItem={({ item, index }) => (
              <PlayerCard
                username={item.username}
                name={item.name}
                avatar={item.avatar_url}
              />
            )}
            keyExtractor={(item) => item.user_id.toString()}
          ></FlatList>
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
