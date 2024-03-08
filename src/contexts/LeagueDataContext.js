import { createContext, useState, useContext, useEffect } from "react";
import {
  fetchClubsById,
  fetchLeagueByLeagueId,
  fetchResultsByLeagueId,
  fetchStandingsByLeagueId,
  fetchUsersByLeagueId,
} from "../utils/api";
import { useAuth } from "./AuthContext";

export const LeagueDataContext = createContext();

export const LeagueDataProvider = ({ leagueId, children }) => {
  const { user } = useAuth();
  const [league, setLeague] = useState({});
  const [standings, setStandings] = useState([]);
  const [results, setResults] = useState([]);
  const [players, setPlayers] = useState([]);
  const [club, setClub] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [league, standings, results, users] = await Promise.all([
          fetchLeagueByLeagueId(leagueId, user.exp),
          fetchStandingsByLeagueId(leagueId, user.exp),
          fetchResultsByLeagueId(leagueId, user.exp),
          fetchUsersByLeagueId(leagueId, user.exp),
        ]);
        setLeague(league[0]);
        setStandings(standings);
        setResults(results);
        setPlayers(users);
        const club = await fetchClubsById(league[0].club_id);
        setClub(club[0]);
        setLoading(false);
      } catch (error) {
        console.error("error fetching league data:", error);
        setLeague([]);
        setStandings([]);
        setResults([]);
      }
    };
    fetchData();
  }, [leagueId]);

  const refreshStandings = async () => {
    try {
      const updatedStandings = await fetchStandingsByLeagueId(
        leagueId,
        user.exp
      );
      setStandings(updatedStandings);
    } catch (error) {
      console.error("error refreshing standings:", error);
    }
  };

  const refreshResults = async () => {
    try {
      const updatedResults = await fetchResultsByLeagueId(leagueId, user.exp);
      setResults(updatedResults);
    } catch (error) {
      console.error("error refreshing results:", error);
    }
  };

  return (
    <LeagueDataContext.Provider
      value={{
        league,
        standings,
        results,
        players,
        club,
        loading,
        setStandings,
        setResults,
        refreshStandings,
        refreshResults,
      }}
    >
      {children}
    </LeagueDataContext.Provider>
  );
};

export const useLeagueData = () => useContext(LeagueDataContext);
