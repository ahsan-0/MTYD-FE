import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import './Signup.css'
export default function UpdateProfile() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { currentUser, updateUserProfile } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    updateUserProfile(name, photoUrl)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
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
          <label htmlFor="update-name">name</label>
          <input
            id="update-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
          <label htmlFor="update-photoUrl">photoUrl</label>
          <input
            id="update-photoUrl"
            type="url"
            value={photoUrl}
            onChange={(e) => {
              setPhotoUrl(e.target.value);
            }}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
