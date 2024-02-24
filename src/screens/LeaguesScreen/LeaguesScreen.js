import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { startCase } from "lodash";
import { fetchLeaguesByUserId } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import LogoInverse from "../../../assets/images/logoInverse.png";
import LeagueCard from "../../components/LeagueCard/LeagueCard";

const LeaguesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [leagues, setLeagues] = useState([]);

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

  const navigateToIndividualLeague = (leagueId) => {
    navigation.navigate("IndividualNavigator", { leagueId });
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.root}>
          {/* <Image source={LogoInverse} style={[styles.logo]} resizeMode="contain" /> */}
          <Text style={styles.header}>Welcome, {firstName}</Text>
          <Text style={[styles.header, styles.leagueHeader]}>Your Leagues</Text>
          {leagues.map((league) => (
            <View style={styles.leagueCard} key={league.league_id}>
              <LeagueCard
                leagueId={league.league_id}
                leagueName={league.name}
                clubId={league.club_id}
                startDate={league.start_date}
                endDate={league.end_date}
                format={league.format}
                adminId={league.admin}
                userId={user.userId}
                onPress={() => navigateToIndividualLeague(league.league_id)}
              />
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
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
    paddingBottom: 10,
    textAlign: "left",
    color: "#2B2D42",
  },
  leagueHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  leagueCard: { paddingBottom: 10, marginVertical: 5 },
});
