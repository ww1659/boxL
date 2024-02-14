import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HelperText, Text } from "react-native-paper";

import { useLeagueData } from "../../contexts/LeagueDataContext";
import { useAuth } from "../../contexts/AuthContext";
import { findPlayersInSameGroup } from "../../utils/findPlayersInSameGroup";
import CustomDropdown from "../../components/CustomDropDown/CustomDropdown";
import CourtDropdown from "../../components/CourtDropDown";
import ScoreInput from "../../components/ScoreInput/ScoreInput";
import CustomButton from "../../components/CustomButton";
import DateInput from "../../components/DateInput/DateInput";
import { checkStraightSets } from "../../utils/checkStraightSetsWin";
import { fetchClubsById } from "../../utils/api";

const PostResultScreen = () => {
  const [winnerInput, setWinnerInput] = useState("");
  const [loserInput, setLoserInput] = useState("");
  const [firstSetInput, setFirstSetInput] = useState("");
  const [secondSetInput, setSecondSetInput] = useState("");
  const [thirdSetInput, setThirdSetInput] = useState("");
  const [courtNumberInput, setCourtNumberInput] = useState("");
  const [courtSurfaceInput, setCourtSurfaceInput] = useState("");

  const [firstSetScoreError, setFirstSetScoreError] = useState(false);
  const [secondSetScoreError, setSecondSetScoreError] = useState(false);
  const [thirdSetScoreError, setThirdSetScoreError] = useState(false);

  const [straightSetsWin, setStraightSetsWin] = useState(false);
  const [thirdSetRequired, setThirdSetRequired] = useState(false);

  const [courtDropdownVisible, setCourtDropdownVisible] = useState(false);

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
  console.log(club);
  console.log(courtNumberInput);
  console.log(courtSurfaceInput);

  //exported functions
  const availablePlayers = findPlayersInSameGroup(standings, players, user);

  // Function to update third set requirement
  const updateThirdSetRequirement = () => {
    const isStraightSets = checkStraightSets(firstSetInput, secondSetInput);
    setStraightSetsWin(isStraightSets);
    setThirdSetRequired(!isStraightSets);
  };

  useEffect(() => {
    if (firstSetInput && secondSetInput) {
      updateThirdSetRequirement();
    }
  }, [firstSetInput, secondSetInput]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View style={styles.root}>
          <Text variant="displaySmall" style={styles.header}>
            Add New Result
          </Text>
          <View style={styles.row}>
            <Text variant="bodyLarge" style={styles.scoreHeader}>
              Winner
            </Text>
            <Text variant="bodyLarge" style={styles.scoreHeader}>
              Loser
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
            <DateInput />
            <CourtDropdown
              numberOfCourts={club.number_of_courts}
              onSelect={handleCourtSelect}
              label={"Court Number"}
              courtDropdownVisible={courtDropdownVisible}
              toggleDropdownVisibility={toggleDropdownVisibility}
            />
          </View>
          <View style={styles.row}>
            <Text variant="bodyLarge" style={styles.scoreHeader}>
              First Set
            </Text>
            <Text variant="bodyLarge" style={styles.scoreHeader}>
              Second Set
            </Text>
            <Text variant="bodyLarge" style={styles.scoreHeader}>
              Third Set
            </Text>
          </View>
          <View style={styles.row}>
            <ScoreInput
              placeholder="e.g. 6-3"
              value={firstSetInput}
              setValue={setFirstSetInput}
              error={firstSetScoreError}
              setError={setFirstSetScoreError}
            />
            <ScoreInput
              placeholder="e.g. 7-6"
              value={secondSetInput}
              setValue={setSecondSetInput}
              error={secondSetScoreError}
              setError={setSecondSetScoreError}
            />
            <ScoreInput
              placeholder=""
              value={thirdSetInput}
              setValue={setThirdSetInput}
              error={thirdSetScoreError}
              setError={setThirdSetScoreError}
              readOnly={!thirdSetRequired}
            />
          </View>

          <CustomButton
            text="Submit"
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
  scoreHeader: { color: "#2B2D42", paddingTop: 20 },
  dropdown1: {
    zIndex: 999,
  },
  dropdown2: {
    zIndex: 998,
  },
});

export default PostResultScreen;
