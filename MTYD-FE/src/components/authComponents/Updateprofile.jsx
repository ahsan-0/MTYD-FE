import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { postUser } from "../../api";
export default function UpdateProfile() {
  const [username, setUsername] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [fullName, setFullName] = useState("");
  const { currentUser, updateUserProfile } = useAuth();
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
        navigate("/");
      })
      .catch((err) => {
        console.log("update profile error",err)
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
    <>
      <div>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="update-name">User Name</label>
          <input
            required
            id="update-name"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <label htmlFor="update-photoUrl">PhotoUrl</label>
          <input
            required
            id="update-photoUrl"
            type="url"
            value={photoUrl}
            onChange={(e) => {
              setPhotoUrl(e.target.value);
            }}
          ></input>
          <label>Full Name</label>
          <input
            required
            type="text"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
