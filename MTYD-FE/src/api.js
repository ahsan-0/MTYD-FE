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

export const postPattern = (username, pattern_name, pattern_body) => {
  return axios.post(`https://automatrix-app.azurewebsites.net/api/patterns`, {
    username,
    pattern_name,
    pattern_body
  })
};

export const deletePattern = id => {
  return axios.delete(`https://automatrix-app.azurewebsites.net/api/patterns/${id}`);
};
export const postUser = (user, username, email, avatar_url, firebase_uid, score) => {
  return axios.post("https://automatrix-app.azurewebsites.net/api/users", {
    account_owner: user,
    username: username,
    email: email,
    avatar_url: avatar_url,
    firebase_uid: firebase_uid,
    score: score
  });
}