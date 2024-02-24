import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { getUserById } from "../../utils/api";
import { startCase } from "lodash";

const sentenceCase = (name) => {
  return startCase(name.split(" "));
};

const ResultCard = ({
  user,
  winnerId,
  loserId,
  firstSet,
  secondSet,
  thirdSet,
  isChampionshipTiebreak,
  championshipTiebreakScore,
  date,
  leagueResult,
}) => {
  const [loading, setLoading] = useState(true);
  const [winnerName, setWinnerName] = useState("");
  const [loserName, setLoserName] = useState("");

  useEffect(() => {
    const fetchWinnerAndLoserNames = async () => {
      try {
        const winner = await getUserById(winnerId);
        const loser = await getUserById(loserId);
        setWinnerName(winner[0].name);
        setLoserName(loser[0].name);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWinnerAndLoserNames();
  }, [winnerId, loserId]);

  const formattedDate = new Date(date).toISOString().split("T")[0];
  const winnerFirstSet = firstSet.split("-")[0];
  const loserFirstSet = firstSet.split("-")[1];
  const winnerSecondSet = secondSet.split("-")[0];
  const loserSecondSet = secondSet.split("-")[1];
  let userWin;
  if (winnerId === user.userId) {
    userWin = true;
  }

  //calculate third set score
  let winnerThirdSet;
  let loserThirdSet;
  let thirdSetRequired = true;
  if (thirdSet === "" && isChampionshipTiebreak === false) {
    thirdSetRequired = false;
  } else if (thirdSet) {
    winnerThirdSet = thirdSet.split("-")[0];
    loserThirdSet = thirdSet.split("-")[1];
  } else {
    winnerThirdSet = championshipTiebreakScore.split("-")[0];
    loserThirdSet = championshipTiebreakScore.split("-")[1];
  }

  //decide which set to show bold text on
  let firstSetWinnerBold = true;
  let firstSetLoserBold = false;
  let secondSetWinnerBold = true;
  let secondsetLoserBold = false;
  if (thirdSetRequired) {
    if (winnerFirstSet > loserFirstSet) {
      firstSetWinnerBold = true;
      firstSetLoserBold = false;
      secondSetWinnerBold = false;
      secondsetLoserBold = true;
    } else {
      firstSetWinnerBold = false;
      firstSetLoserBold = true;
      secondSetWinnerBold = true;
      secondsetLoserBold = false;
    }
  }

  const onPress = () => {
    console.log("BOOM");
  };

  if (loading) return <Text>Loading Result...</Text>;

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.container,
          userWin === undefined
            ? null
            : userWin
            ? styles.containerWin
            : styles.containerLoss,
        ]}
      >
        <View style={styles.row}>
          <Text variant="labelLarge" style={styles.name}>
            {formattedDate}
          </Text>
          <Text variant="labelLarge" style={styles.text}>
            Set 1
          </Text>
          <Text variant="labelLarge" style={styles.text}>
            Set 2
          </Text>
          <Text variant="labelLarge" style={styles.text}>
            Set 3
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            variant="bodyLarge"
            style={[styles.name, styles.win]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {sentenceCase(winnerName)}
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.text, firstSetWinnerBold ? styles.win : null]}
          >
            {winnerFirstSet}
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.text, secondSetWinnerBold ? styles.win : null]}
          >
            {winnerSecondSet}
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.text, thirdSetRequired ? styles.win : null]}
          >
            {thirdSetRequired ? winnerThirdSet : "-"}
          </Text>
        </View>
        <View style={styles.row}>
          <Text
            variant="bodyLarge"
            style={styles.name}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {sentenceCase(loserName)}
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.text, firstSetLoserBold ? styles.win : null]}
          >
            {loserFirstSet}
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.text, secondsetLoserBold ? styles.win : null]}
          >
            {loserSecondSet}
          </Text>
          <Text variant="bodyLarge" style={styles.text}>
            {thirdSetRequired ? loserThirdSet : "-"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    borderColor: "#2B2D42",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  containerWin: {
    borderColor: "green",
  },
  containerLoss: {
    borderColor: "red",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  name: { flex: 1.5, color: "#2B2D42" },
  text: { flex: 1, color: "#2B2D42", textAlign: "center" },
  win: {
    fontWeight: "bold",
  },
});

export default ResultCard;
