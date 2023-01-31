import axios from "axios";

export const getPatterns = () => {
  return axios.get("https://automatrix-app.azurewebsites.net/api/patterns");
};

export const getUsers = () => {
  return axios.get("https://automatrix-app.azurewebsites.net/api/users");
};

export const getPatternsByUser = username => {
  return axios.get(`https://automatrix-app.azurewebsites.net/api/users/${username}/patterns`)
};