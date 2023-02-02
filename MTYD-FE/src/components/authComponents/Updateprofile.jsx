import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { postUser } from "../../api";
export default function UpdateProfile() {
  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const { currentUser, updateUserProfile, setUserState } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    updateUserProfile(username, photoUrl)
      .then((res) => {
        return postUser(
          fullName,
          currentUser.displayName,
          currentUser.email,
          photoUrl,
          currentUser.uid,
          0
        );
      })
      .then(() => {
        setUserState(currentUser);
        navigate("/");
      })
      .catch((err) => {
        console.log("update profile error", err);
        setLoading(false);
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="update_profile">
      <h1>Update your profile</h1>
      <p>You can update your profile details below.</p>

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="update-form">
        <div className="input-group">
          <label htmlFor="update-name">Username</label>
          <input
            required
            id="update-name"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="update-photoUrl">Photo Url</label>
          <input
            required
            id="update-photoUrl"
            type="url"
            value={photoUrl}
            onChange={(e) => {
              setPhotoUrl(e.target.value);
            }}
          ></input>
        </div>
        <div className="input-group">
          <label>Full name</label>
          <input
            required
            type="text"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
