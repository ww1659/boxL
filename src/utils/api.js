import axios from "axios";

const myApi = axios.create({
  baseURL: "https://boxl-api.onrender.com/api",
});

export const fetchLeagues = () => {
  return myApi.get("/leagues").then((res) => {
    return res.data.leagues;
  });
};

export const loginUser = (userInput) => {
  return myApi.post("/users/login", userInput).then((res) => {
    return res.data;
  });
};
