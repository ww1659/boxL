import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { startCase } from "lodash";
import { fetchLeaguesByUserId } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import LogoInverse from "../../../assets/images/logoInverse.png";
import LeagueCard from "../../components/LeagueCard/LeagueCard";
import { ActivityIndicator, Text } from "react-native-paper";

const LeaguesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expiredDropdownPressed, setExpiredDropdownPressed] = useState(false);
  const [currentDropdownPressed, setCurrentDropdownPressed] = useState(true);

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

  const handleExpiredDropdown = () => {
    setExpiredDropdownPressed(!expiredDropdownPressed);
  };

  const handleCurrentDropdown = () => {
    setCurrentDropdownPressed(!currentDropdownPressed);
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.root}>
          <View style={styles.contentContainer}>
            {/* <Image source={LogoInverse} style={[styles.logo]} resizeMode="contain" /> */}
            <Text variant="labelLarge" style={styles.header}>
              u/{user.username}
            </Text>
            <View style={styles.search}>
              <Searchbar
                style={styles.searchBar}
                placeholder="Search for a league"
                onChangeText={setSearchQuery}
                value={searchQuery}
              />
            </View>
            <View style={styles.row}>
              <View style={styles.expiredLeagues}>
                <Text style={[styles.header, styles.leagueHeader]}>
                  Ongoing Leagues
                </Text>
              </View>
              {currentDropdownPressed ? (
                <IconButton
                  icon="arrow-down-drop-circle"
                  iconColor="#2B2D42"
                  size={20}
                  onPress={handleCurrentDropdown}
                />
              ) : (
                <IconButton
                  icon="arrow-up-drop-circle"
                  iconColor="#2B2D42"
                  size={20}
                  onPress={handleCurrentDropdown}
                />
              )}
            </View>

            {currentDropdownPressed ? (
              loading ? (
                <ActivityIndicator animating={true} />
              ) : currentLeagues.length === 0 ? (
                <View style={[styles.leagueCard, styles.centre]}>
                  <Text style={styles.noLeagueMessage}>
                    No current leagues...
                  </Text>
                </View>
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
              )
            ) : null}
            <View style={styles.row}>
              <View style={styles.expiredLeagues}>
                <Text style={[styles.header, styles.leagueHeader]}>
                  Expired Leagues
                </Text>
              </View>
              {expiredDropdownPressed ? (
                <IconButton
                  icon="arrow-down-drop-circle"
                  iconColor="#2B2D42"
                  size={20}
                  onPress={handleExpiredDropdown}
                />
              ) : (
                <IconButton
                  icon="arrow-up-drop-circle"
                  iconColor="#2B2D42"
                  size={20}
                  onPress={handleExpiredDropdown}
                />
              )}
            </View>
            {expiredDropdownPressed ? (
              loading ? (
                <ActivityIndicator animating={true} />
              ) : (
                <>
                  {oldLeagues.map((league) => (
                    <View
                      style={[styles.leagueCard, styles.faded]}
                      key={league.league_id}
                    >
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
              )
            ) : null}
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
    fontSize: 20,
    paddingBottom: 5,
    textAlign: "left",
    color: "#2B2D42",
  },
  leagueHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  leagueCard: { paddingBottom: 10, marginVertical: 5 },
  centre: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noLeagueMessage: {
    color: "#2B2D42",
    fontSize: 20,
  },
  faded: {
    opacity: 0.5,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#2B2D42",
  },
  row: {
    flexDirection: "row",
  },
  expiredLeagues: {
    justifyContent: "center",
  },
});
