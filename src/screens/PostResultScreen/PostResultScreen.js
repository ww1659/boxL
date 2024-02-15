import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Checkbox } from "react-native-paper";

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

const PostResultScreen = () => {
  //user inputs states
  const [winnerInput, setWinnerInput] = useState("");
  const [loserInput, setLoserInput] = useState("");
  const [firstSetInput, setFirstSetInput] = useState("");
  const [secondSetInput, setSecondSetInput] = useState("");
  const [thirdSetInput, setThirdSetInput] = useState("");
  const [courtNumberInput, setCourtNumberInput] = useState("");
  const [courtSurfaceInput, setCourtSurfaceInput] = useState("");
  const [matchNotesInput, setMatchNotesInput] = useState("");

  //error states
  const [firstSetScoreError, setFirstSetScoreError] = useState(false);
  const [secondSetScoreError, setSecondSetScoreError] = useState(false);
  const [thirdSetScoreError, setThirdSetScoreError] = useState(false);

  // logic states
  const [thirdSetRequired, setThirdSetRequired] = useState(false);
  const [courtDropdownVisible, setCourtDropdownVisible] = useState(false);
  const [setsEntered, setSetsEntered] = useState(0);
  const [isChecked, setChecked] = useState(false);

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
      firstSetInput &&
      secondSetInput &&
      setsEntered >= 2 &&
      !firstSetScoreError &&
      !secondSetScoreError
    ) {
      updateThirdSetRequirement();
    }
  }, [firstSetInput, secondSetInput, setsEntered]);

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

  const onSumbitPress = async (event) => {
    event.preventDefault();
    console.log("SUBMIT PRESSED");
  };

  //LOGS

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
              Date:
            </Text>
            <Text variant="bodyLarge" style={styles.scoreHeader}>
              Court:
            </Text>
          </View>
          <View style={[styles.row, styles.dropdown2]}>
            <DateInput />
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
              setsEntered={setsEntered}
              setSetsEntered={setSetsEntered}
            />
            <ScoreInput
              placeholder="e.g. 7-6"
              value={secondSetInput}
              setValue={setSecondSetInput}
              error={secondSetScoreError}
              setError={setSecondSetScoreError}
              maxChars={3}
              setsEntered={setsEntered}
              setSetsEntered={setSetsEntered}
            />
          </View>
          {thirdSetRequired ? (
            <>
              <View style={styles.row}>
                <Text variant="bodyLarge" style={styles.scoreHeader}>
                  Champs Tiebreak:
                </Text>
                <Text variant="bodyLarge" style={styles.scoreHeader}>
                  Third Set Score
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.checkbox}>
                  <Checkbox
                    status={isChecked ? "checked" : "unchecked"}
                    onPress={() => {
                      setChecked(!isChecked);
                    }}
                  />
                </View>
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
  },
  checkbox: {
    flex: 1,
    padding: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  matchReport: {
    margin: 10,
  },
  dropdown1: {
    zIndex: 999,
  },
  dropdown2: {
    zIndex: 998,
  },
});

export default PostResultScreen;
