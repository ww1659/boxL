import axios from "axios";

const myApi = axios.create({
  baseURL: "https://boxl-api.onrender.com/api",
});

export const fetchLeaguesByUserId = (userId) => {
  return myApi.get(`/leagues/users/${userId}`).then((res) => {
    return res.data.leaguesByUserId;
  });
};

export const fetchLeagueByLeagueId = (leagueId) => {
  return myApi.get(`/leagues/${leagueId}`).then((res) => {
    return res.data.league;
  });
};

export const fetchClubsById = (clubId) => {
  return myApi.get(`/clubs/${clubId}`).then((res) => {
    return res.data.club;
  });
};

export const loginUser = (userId) => {
  return myApi.post("/users/login", userId).then((res) => {
    return res.data;
  });
};

export const fetchUsersByLeagueId = (leagueId) => {
  return myApi.get(`/users/leagues/${leagueId}`).then((res) => {
    return res.data.users;
  });
};

export const fetchResultsByLeagueId = (leagueId) => {
  return myApi.get(`/results/leagues/${leagueId}`).then((res) => {
    return res.data.resultsByLeagueId;
  });
};

export const fetchStandingsByLeagueId = (leagueId) => {
  return myApi.get(`/leagues/${leagueId}/standings`).then((res) => {
    return res.data.standings;
  });
};

export const postResult = (result) => {
  return myApi.post(`/results`, result).then((res) => {
    return res.data.result;
  });
};

export const patchStandings = (result) => {
  return myApi.patch(`/standings`, result).then((res) => {
    return res.data.updatedStandings;
  });
};

export const fetchResultsByUserId = (userId) => {
  return myApi.get(`/results/users/${userId}`).then((res) => {
    return res.data.resultsByUserId;
  });
};

export const getUserById = (userId) => {
  return myApi.get(`/users/${userId}`).then((res) => {
    return res.data.user;
  });
};
