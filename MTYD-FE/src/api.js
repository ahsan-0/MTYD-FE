import axios from "axios";

export const getPatterns = () => {
  return axios.get("https://automatrix-app.azurewebsites.net/api/patterns");
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