import React, { useEffect, useState, View } from "react";
import {
  Avatar,
  Button,
  Card,
  ActivityIndicator,
  Text,
  IconButton,
  Icon,
} from "react-native-paper";
import { startCase } from "lodash";
import {
  fetchClubsById,
  fetchResultsByLeagueId,
  fetchStandingsByLeagueId,
} from "../../utils/api";
import { StyleSheet, TouchableOpacity } from "react-native";
import { formatDateLong, formatDateNoYear } from "../../utils/formatDate";
import { sortStandings } from "../../utils/sortStandings";
import LeagueCardSkeleton from "../LeagueCardSkeleton/LeagueCardSkeleton";

const changeFormat = (format) => {
  return startCase(format.split("_").join(" "));
};

const captialiseString = (string) => {
  return string.toUpperCase();
};

const LeagueCard = ({
  leagueId,
  leagueName,
  clubId,
  startDate,
  endDate,
  format,
  onPress,
  adminId,
  userId,
  exp,
}) => {
  const [clubName, setClubName] = useState("");
  const [standings, setStandings] = useState("");
  const [results, setResults] = useState("");
  const [clubImage, setClubImage] = useState("");
  const [userPosition, setUserPosition] = useState(0);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [numberOfMatches, setNumberOfMatches] = useState(0);
  const [loading, setLoading] = useState(true);

  let isAdmin = false;
  if (adminId === userId) isAdmin = true;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [standings, results, club] = await Promise.all([
          fetchStandingsByLeagueId(leagueId, exp),
          fetchResultsByLeagueId(leagueId, exp),
          fetchClubsById(clubId),
        ]);
        setStandings(standings);
        setResults(results);
        setClubName(club[0].name);
        setClubImage(club[0].image_url);
        setLoading(false);
      } catch (error) {
        console.error("error fetching league data:", error);
        setStandings([]);
        setResults([]);
        setClubName("");
        setClubImage("");
        setLoading(false);
      }
    };
    fetchData();
  }, [leagueId]);

  useEffect(() => {
    if (!loading) {
      const sortedStandings = sortStandings(standings, results);
      const position = sortedStandings.findIndex((element) => {
        return element.player_id === userId;
      });
      setNumberOfPlayers(sortedStandings.length);
      setNumberOfMatches(results.length);
      setUserPosition(position + 1);
    }
  }, [loading]);

  if (loading) return <LeagueCardSkeleton />;

  const iconColor = (userPosition) => {
    switch (userPosition) {
      case 1:
        return "#eeba0b";
        break;
      case 2:
        return "#8e9aaf";
        break;
      case 3:
        return "#aa6c2a";
        break;
      default:
        return "#2B2D42";
        break;
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Card mode="outlined">
        <Card.Title
          title={captialiseString(leagueName)}
          titleVariant="headlineSmall"
          titleStyle={styles.title}
          subtitle={clubName}
          subtitleVariant="labelLarge"
          left={() => (
            <Icon
              source={`numeric-${userPosition}-circle-outline`}
              color={iconColor(userPosition)}
              size={40}
            />
          )}
          leftStyle={styles.icon}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
        <Card.Content style={styles.content}>
          <Text style={styles.column}>
            <Text variant="headlineSmall">{formatDateNoYear(endDate)}</Text>
          </Text>
          <Text style={styles.column}>
            <Text variant="headlineSmall">{numberOfMatches}</Text>
          </Text>
          <Text style={styles.column}>
            <Text variant="headlineSmall">{numberOfPlayers}</Text>
          </Text>
        </Card.Content>
        <Card.Content style={styles.content}>
          <Text style={styles.column}>
            <Text style={styles.label} variant="labelSmall">
              League Ends
            </Text>
          </Text>
          <Text style={styles.column}>
            <Text style={styles.label} variant="labelSmall">
              Matches Played
            </Text>
          </Text>
          <Text style={styles.column}>
            <Text style={styles.label} variant="labelSmall">
              Players
            </Text>
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },

  icon: {
    flex: 0.2,
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  column: {
    flexGrow: 1,
    flex: 1,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
  },
});

export default LeagueCard;
