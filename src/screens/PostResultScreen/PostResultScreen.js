import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Checkbox } from "react-native-paper";

//context imports
import { useLeagueData } from "../../contexts/LeagueDataContext";
import { useAuth } from "../../contexts/AuthContext";

//utils
import { findPlayersInSameGroup } from "../../utils/findPlayersInSameGroup";
import { checkStraightSets } from "../../utils/checkStraightSetsWin";

//components
import PlayerDropDown from "../../components/PlayerDropDown";
import ScoreInput from "../../components/ScoreInput/ScoreInput";
import CustomButton from "../../components/CustomButton";
import DateInput from "../../components/DateInput/DateInput";
import CustomInput from "../../components/CustomInput";
import { patchStandings, postResult } from "../../utils/api";
import { startCase } from "lodash";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

const sentenceCase = (name) => {
  return startCase(name.split(" "));
};

const PostResultScreen = ({ route, navigation }) => {
  const { isUserAdmin } = route.params;

  //user inputs states
  const [winnerInput, setWinnerInput] = useState("");
  const [loserInput, setLoserInput] = useState("");
  const [firstSetInput, setFirstSetInput] = useState("");
  const [secondSetInput, setSecondSetInput] = useState("");
  const [thirdSetInput, setThirdSetInput] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [courtNumberInput, setCourtNumberInput] = useState("");
  const [courtSurfaceInput, setCourtSurfaceInput] = useState("");
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [matchNotesInput, setMatchNotesInput] = useState("");

  //error states
  const [firstSetScoreError, setFirstSetScoreError] = useState(false);
  const [secondSetScoreError, setSecondSetScoreError] = useState(false);
  const [thirdSetScoreError, setThirdSetScoreError] = useState(false);

  // logic states
  const [thirdSetRequired, setThirdSetRequired] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [showDate, setShowDate] = useState(false);

  //contexts
  const { standings, players, club, refreshStandings, refreshResults } =
    useLeagueData();
  const { user } = useAuth();

  //exported functions
  const availablePlayers = findPlayersInSameGroup(standings, players, user);

  // Function to update third set requirement
  const updateThirdSetRequirement = () => {
    const isStraightSets = checkStraightSets(firstSetInput, secondSetInput);
    setThirdSetRequired(!isStraightSets);
  };

  //function to generate array of player names
  let playerNames = [];
  if (isUserAdmin) {
    playerNames = players.map((player) => ({
      label: sentenceCase(player.name),
      value: player.name,
    }));
  } else {
    playerNames = availablePlayers.map((player) => ({
      label: sentenceCase(player.name),
      value: player.name,
    }));
  }

  //function to generate array of court numbers
  const courtNumbers = [];
  for (let i = 1; i <= club.number_of_courts; i++) {
    courtNumbers.push({ label: i, value: i });
  }

  useEffect(() => {
    if (
      firstSetInput.length === 3 &&
      secondSetInput.length === 3 &&
      !firstSetScoreError &&
      !secondSetScoreError
    ) {
      updateThirdSetRequirement();
    }
  }, [firstSetInput, secondSetInput]);

  //handling form functions
  const handleWinnerSelect = (player) => {
    setWinnerInput(player);
  };

  const handleLoserSelect = (player) => {
    setLoserInput(player);
  };

  const handleCourtSelect = (court) => {
    setCourtNumberInput(court);
    setCourtSurfaceInput(club.court_surface[court - 1]);
  };

  const handleDateInput = (date) => {
    setShowDate(false);
    setDateInput(date);
  };

  const isSubmitDisabled = () => {
    if (
      !winnerInput ||
      !loserInput ||
      !dateInput ||
      !courtNumberInput ||
      !courtSurfaceInput ||
      !firstSetInput ||
      firstSetScoreError ||
      !secondSetInput ||
      secondSetScoreError ||
      (thirdSetRequired && !thirdSetInput) ||
      thirdSetScoreError
    ) {
      return true;
    }
    return false;
  };

  //handling SUBMIT button
  const onSumbitPress = async (event) => {
    event.preventDefault();
    setIsSubmitLoading(true);

    if (
      !winnerInput ||
      !loserInput ||
      !dateInput ||
      !courtNumberInput ||
      !courtSurfaceInput ||
      !firstSetInput ||
      !secondSetInput ||
      (thirdSetRequired && !thirdSetInput)
    ) {
      setIsSubmitLoading(false);
      console.log("fill out required fields");
      return;
    }

    const winner = players.find((player) => player.name === winnerInput);
    const loser = players.find((player) => player.name === loserInput);
    const winnerId = winner.user_id;
    const loserId = loser.user_id;
    const leagueId = standings[0].league_id;

    const result = {
      league_id: leagueId,
      winner_id: winnerId,
      loser_id: loserId,
      group_name: "A",
      first_set_score: firstSetInput,
      first_set_tiebreak: "",
      second_set_score: secondSetInput,
      second_set_tiebreak: "",
      third_set_score: thirdSetRequired && !isChecked ? thirdSetInput : "",
      third_set_tiebreak: "",
      championship_tiebreak: isChecked,
      championship_tiebreak_score:
        thirdSetRequired && isChecked ? thirdSetInput : "",
      match_date: dateInput,
      club_id: club.club_id,
      court_number: courtNumberInput,
      court_surface: courtSurfaceInput,
      match_notes: matchNotesInput,
    };

    try {
      const newResult = await postResult(result);
      const updatedStandings = await patchStandings(result);
      refreshStandings();
      refreshResults();
      setIsSubmitLoading(false);
      navigation.navigate("IndividualLeague");
    } catch (err) {
      throw err;
    }
  };

  if (isSubmitLoading)
    return (
      <SafeAreaView style={styles.loading}>
        <View>
          <Text style={styles.loadingText}>Submitting Result...</Text>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Text variant="displaySmall" style={styles.header}>
          Add New Result
        </Text>
        <View style={styles.row}>
          <Text variant="bodyLarge" style={styles.scoreHeader}>
            WINNER
          </Text>
          <Text variant="bodyLarge" style={styles.scoreHeader}>
            LOSER
          </Text>
        </View>
        <View style={styles.row}>
          <PlayerDropDown
            items={playerNames}
            value={winnerInput}
            setValue={handleWinnerSelect}
            label={"Select a player"}
          />
          <PlayerDropDown
            items={playerNames}
            value={loserInput}
            setValue={handleLoserSelect}
            label={"Select a player"}
          />
        </View>
        <View style={styles.row}>
          <Text variant="bodyLarge" style={styles.scoreHeader}>
            Date
          </Text>
          <Text variant="bodyLarge" style={styles.scoreHeader}>
            Court
          </Text>
        </View>

        <View style={styles.row}>
          <CustomDatePicker
            dateInput={dateInput}
            setDateInput={handleDateInput}
            showDate={showDate}
            setShowDate={setShowDate}
          />

          <PlayerDropDown
            items={courtNumbers}
            value={courtNumberInput}
            setValue={handleCourtSelect}
            label={"Select a court"}
          />
        </View>
        <View style={styles.row}>
          <Text variant="bodyLarge" style={styles.scoreHeader}>
            First Set Score
          </Text>
          <Text variant="bodyLarge" style={styles.scoreHeader}>
            Second Set Score
          </Text>
        </View>
        <View style={styles.row}>
          <ScoreInput
            placeholder="e.g. 6-3"
            value={firstSetInput}
            setValue={setFirstSetInput}
            error={firstSetScoreError}
            setError={setFirstSetScoreError}
            maxChars={3}
          />
          <ScoreInput
            placeholder="e.g. 7-6"
            value={secondSetInput}
            setValue={setSecondSetInput}
            error={secondSetScoreError}
            setError={setSecondSetScoreError}
            maxChars={3}
          />
        </View>
        {thirdSetRequired ? (
          <>
            <View style={styles.row}>
              <Text variant="bodyLarge" style={styles.checkboxHeader}>
                Champs Tiebreak:
              </Text>
              <View style={styles.checkbox}>
                <Checkbox
                  status={isChecked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!isChecked);
                  }}
                />
              </View>
            </View>
            <View style={styles.row}>
              <Text variant="bodyLarge" style={styles.scoreHeader}>
                Third Set Score
              </Text>
              <ScoreInput
                placeholder={isChecked ? "e.g. 10-5" : "e.g. 7-5"}
                value={thirdSetInput}
                setValue={setThirdSetInput}
                error={thirdSetScoreError}
                setError={setThirdSetScoreError}
                thirdSet={thirdSetRequired}
                maxChars={isChecked ? 5 : 3}
                isTiebreak={isChecked ? true : false}
              />
            </View>
          </>
        ) : null}
        <View style={styles.matchReport}>
          <CustomInput
            placeholder="Optional: Write match report here..."
            value={matchNotesInput}
            setValue={setMatchNotesInput}
            formIcon="notes"
            secureTextEntry={false}
          />
        </View>

        <CustomButton
          text="Submit Result"
          onPress={onSumbitPress}
          disabled={isSubmitDisabled()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  header: {
    paddingBottom: 10,
    textAlign: "left",
    color: "#2B2D42",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  scoreHeader: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#2B2D42",
    marginTop: 10,
    fontWeight: "bold",
  },
  checkboxHeader: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  checkbox: {
    flex: 1,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  matchReport: {
    margin: 10,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginVertical: 5,
    fontSize: 24,
    color: "#2B2D42",
  },
});

export default PostResultScreen;
