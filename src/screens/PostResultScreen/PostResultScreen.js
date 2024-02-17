import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Checkbox, ProgressBar } from "react-native-paper";

//context imports
import { useLeagueData } from "../../contexts/LeagueDataContext";
import { useAuth } from "../../contexts/AuthContext";

//utils
import { findPlayersInSameGroup } from "../../utils/findPlayersInSameGroup";
import { checkStraightSets } from "../../utils/checkStraightSetsWin";

//components
import CustomDropdown from "../../components/CustomDropDown/CustomDropdown";
import CourtDropdown from "../../components/CourtDropDown";
import ScoreInput from "../../components/ScoreInput/ScoreInput";
import CustomButton from "../../components/CustomButton";
import DateInput from "../../components/DateInput/DateInput";
import CustomInput from "../../components/CustomInput";
import { patchStandings, postResult } from "../../utils/api";

const PostResultScreen = ({ navigation }) => {
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
  const [courtDropdownVisible, setCourtDropdownVisible] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  //contexts
  const {
    standings,
    results,
    players,
    club,
    setStandings,
    setResults,
    loading,
  } = useLeagueData();
  const { user } = useAuth();

  //exported functions
  const availablePlayers = findPlayersInSameGroup(standings, players, user);

  // Function to update third set requirement
  const updateThirdSetRequirement = () => {
    const isStraightSets = checkStraightSets(firstSetInput, secondSetInput);
    setThirdSetRequired(!isStraightSets);
  };

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

  //toggle visibility functions
  const toggleDropdownVisibility = () => {
    setCourtDropdownVisible(!courtDropdownVisible);
  };

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
      (thirdSetRequired && !third_set_score && !championship_tiebreak_score)
    ) {
      setIsSubmitLoading(false);
      console.log("Fill out required fields");
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
      setIsSubmitLoading(false);
      navigation.navigate("IndividualLeagueScreen");
    } catch (err) {
      throw err;
    }
  };

  if (isSubmitLoading)
    return (
      <SafeAreaView style={styles.loading}>
        <View>
          <Text style={styles.loadingText}>Please Wait...</Text>
          <ProgressBar progress={1} />
        </View>
      </SafeAreaView>
    );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
          <View style={[styles.row, styles.dropdown1]}>
            <CustomDropdown
              players={availablePlayers}
              onSelect={handleWinnerSelect}
              label="Winner"
              winnerInput={winnerInput}
              loserInput={loserInput}
            />
            <CustomDropdown
              players={availablePlayers}
              onSelect={handleLoserSelect}
              label="Loser"
              winnerInput={winnerInput}
              loserInput={loserInput}
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
          <View style={[styles.row, styles.dropdown2]}>
            <DateInput dateInput={dateInput} setDateInput={setDateInput} />
            <CourtDropdown
              numberOfCourts={club.number_of_courts}
              onSelect={handleCourtSelect}
              label={"Select Court"}
              courtDropdownVisible={courtDropdownVisible}
              toggleDropdownVisibility={toggleDropdownVisibility}
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
                  readOnly={!thirdSetRequired}
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
            disabled={false}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 10,
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
  checkboxSize: {},
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
  dropdown1: {
    zIndex: 999,
  },
  dropdown2: {
    zIndex: 998,
  },
});

export default PostResultScreen;
