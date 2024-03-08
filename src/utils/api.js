import axios from "axios";
import * as SecureStore from "expo-secure-store";

const getToken = async (key) => {
  try {
    const result = await SecureStore.getItemAsync(key);
    if (result) {
      return result;
    }
  } catch (error) {
    console.error("error fetching token:", error);
  }
};

const checkTokenExpiration = async (exp) => {
  if (exp && exp < Date.now() / 1000) {
    return true;
    // return refreshAccessToken();
  }
  return false;
};

const myApi = axios.create({
  baseURL: "https://boxl-api.onrender.com/api",
});

myApi.interceptors.request.use(
  async (config) => {
    const accessToken = await getToken("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (userId) => {
  const res = await myApi.post("/users/login", userId);
  return res.data;
};

export const fetchLeaguesByUserId = async (userId, exp) => {
  try {
    const isTokenExpired = await checkTokenExpiration(exp);
    if (isTokenExpired) {
      throw new Error("token expired");
    } else {
      const res = await myApi.get(`/leagues/users/${userId}`);
      return res.data.leaguesByUserId;
    }
  } catch (error) {
    console.error("error fetching leagues:", error);
    throw error;
  }
};

export const fetchLeagueByLeagueId = async (leagueId, exp) => {
  try {
    const isTokenExpired = await checkTokenExpiration(exp);
    if (isTokenExpired) {
      throw new Error("token expired");
    } else {
      const res = await myApi.get(`/leagues/${leagueId}`);
      return res.data.league;
    }
  } catch (error) {
    console.error("error fetching leagues:", error);
    throw error;
  }
};

export const fetchUsersByLeagueId = async (leagueId, exp) => {
  try {
    const isTokenExpired = await checkTokenExpiration(exp);
    if (isTokenExpired) {
      throw new Error("token expired");
    } else {
      const res = await myApi.get(`/users/leagues/${leagueId}`);
      return res.data.users;
    }
  } catch (error) {
    console.error("error fetching leagues:", error);
    throw error;
  }
};

export const fetchResultsByLeagueId = async (leagueId, exp) => {
  try {
    const isTokenExpired = await checkTokenExpiration(exp);
    if (isTokenExpired) {
      throw new Error("token expired");
    } else {
      const res = await myApi.get(`/results/leagues/${leagueId}`);
      return res.data.resultsByLeagueId;
    }
  } catch (error) {
    console.error("error fetching leagues:", error);
    throw error;
  }
};

export const fetchStandingsByLeagueId = async (leagueId, exp) => {
  try {
    const isTokenExpired = await checkTokenExpiration(exp);
    if (isTokenExpired) {
      throw new Error("token expired");
    } else {
      const res = await myApi.get(`/leagues/${leagueId}/standings`);
      return res.data.standings;
    }
  } catch (error) {
    console.error("error fetching leagues:", error);
    throw error;
  }
};

export const postResult = async (result, exp) => {
  try {
    const isTokenExpired = await checkTokenExpiration(exp);
    if (isTokenExpired) {
      throw new Error("token expired");
    } else {
      const res = await myApi.post(`/results`, result);
      return res.data.result;
    }
  } catch (error) {
    console.error("error posting result:", error);
    throw error;
  }
};

export const patchStandings = async (result, exp) => {
  try {
    const isTokenExpired = await checkTokenExpiration(exp);
    if (isTokenExpired) {
      throw new Error("token expired");
    } else {
      const res = await myApi.patch(`/standings`, result);
      return res.data.updatedStandings;
    }
  } catch (error) {
    console.error("error patching standings:", error);
    throw error;
  }
};

export const fetchResultsByUserId = async (userId, exp) => {
  try {
    const isTokenExpired = await checkTokenExpiration(exp);
    if (isTokenExpired) {
      throw new Error("token expired");
    } else {
      const res = await myApi.get(`/results/users/${userId}`);
      return res.data.resultsByUserId;
    }
  } catch (error) {
    console.error("error patching standings:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  const res = await myApi.get(`/users/${userId}`);
  return res.data.user;
};

export const fetchClubsById = async (clubId) => {
  const res = await myApi.get(`/clubs/${clubId}`);
  return res.data.club;
};
