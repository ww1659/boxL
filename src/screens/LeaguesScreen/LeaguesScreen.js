import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { startCase } from "lodash";
import { fetchLeaguesByUserId } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import LogoInverse from "../../../assets/images/logoInverse.png";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import { ActivityIndicator } from "react-native-paper";

const LeaguesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLeaguesByUserId(user.userId, user.exp)
      .then((leagues) => {
        setLeagues(leagues);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const firstName = startCase(user.name.split(" ")[0]);

  const navigateToIndividualLeague = (leagueId) => {
    navigation.navigate("IndividualNavigator", { leagueId });
  };

  const currentLeagues = leagues.filter((league) => {
    return new Date(league.end_date) > new Date();
  });

  const oldLeagues = leagues.filter((league) => {
    return new Date(league.end_date) < new Date();
  });

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.root}>
          <View style={styles.contentContainer}>
            {/* <Image source={LogoInverse} style={[styles.logo]} resizeMode="contain" /> */}
            <Text style={styles.header}>Welcome, {firstName}</Text>
            <View style={styles.search}>
              <Searchbar
                theme={{ colors: { elevation: "white" } }}
                placeholder="Search for a league"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </View>

            <Text style={[styles.header, styles.leagueHeader]}>
              Ongoing Leagues
            </Text>
            {loading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <>
                {currentLeagues.map((league) => (
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
                      exp={user.exp}
                      onPress={() =>
                        navigateToIndividualLeague(league.league_id)
                      }
                    />
                  </View>
                ))}
              </>
            )}
            <Text style={[styles.header, styles.leagueHeader]}>
              Expired Leagues
            </Text>
            {loading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <>
                {oldLeagues.map((league) => (
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
                      exp={user.exp}
                      onPress={() =>
                        navigateToIndividualLeague(league.league_id)
                      }
                    />
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default LeaguesScreen;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flex: 1,
  },
  contentContainer: {},
  search: {
    marginVertical: 10,
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
