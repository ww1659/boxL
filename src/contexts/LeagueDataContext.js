import { createContext, useState, useContext, useEffect } from "react";
import {
  fetchLeagueByLeagueId,
  fetchResultsByLeagueId,
  fetchStandingsByLeagueId,
  fetchUsersByLeagueId,
} from "../utils/api";

export const LeagueDataContext = createContext();

export const LeagueDataProvider = ({ leagueId, children }) => {
  const [league, setLeague] = useState({});
  const [standings, setStandings] = useState([]);
  const [results, setResults] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(leagueId, "CONTEXT");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [league, standings, results, users] = await Promise.all([
          fetchLeagueByLeagueId(leagueId),
          fetchStandingsByLeagueId(leagueId),
          fetchResultsByLeagueId(leagueId),
          fetchUsersByLeagueId(leagueId),
        ]);
        setLeague(league[0]);
        setStandings(standings);
        setResults(results);
        setPlayers(users);
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

  return (
    <LeagueDataContext.Provider
      value={{
        league,
        standings,
        results,
        players,
        loading,
        setStandings,
        setResults,
      }}
    >
      {children}
    </LeagueDataContext.Provider>
  );
};

export const useLeagueData = () => useContext(LeagueDataContext);
