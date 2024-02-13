import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { startCase } from "lodash";
import { fetchLeaguesByUserId } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import LogoInverse from "../../../assets/images/logoInverse.png";
import LeagueCard from "../../components/LeagueCard/LeagueCard";

const LeaguesScreen = ({ navigation }) => {
  const [leagues, setLeagues] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchLeaguesByUserId(user.userId)
      .then((leagues) => {
        setLeagues(leagues);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const firstName = startCase(user.name.split(" ")[0]);
  console.log(leagues);

  const navigateToIndividualLeague = (leagueId) => {
    navigation.navigate("IndividualNavigator", { leagueId });
  };

  return (
    <SafeAreaView>
      <View style={styles.root}>
        {/* <Image source={LogoInverse} style={[styles.logo]} resizeMode="contain" /> */}
        <Text style={styles.header}>Welcome, {firstName}</Text>
        <Text style={[styles.header, styles.leagueHeader]}>Your Leagues</Text>
        <FlatList
          data={leagues}
          renderItem={({ item }) => (
            <LeagueCard
              leagueId={item.league_id}
              leagueName={item.name}
              clubId={item.club_id}
              startDate={item.start_date}
              endDate={item.end_date}
              format={item.format}
              onPress={() => navigateToIndividualLeague(item.league_id)}
            />
          )}
          keyExtractor={(item) => item.league_id.toString()}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default LeaguesScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  logo: {
    width: "100%",
    maxWidth: 500,
    maxHeight: 80,
  },
  header: {
    fontSize: 30,
    paddingVertical: 10,
    textAlign: "left",
    color: "#2B2D42",
  },
  leagueHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
