import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const { currentUser, updateUserPassword, updateUserEmail } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== passConfirm) {
      setError("Passwords do not match");
      return;
    }
    const promises = [];
    setLoading(true);
    setError("");

    if (email !== currentUser.email) {
      promises.push(updateUserEmail(email));
    }
    if (password) {
      promises.push(updateUserPassword(password));
    }
    Promise.all(promises)
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
          <label htmlFor="update-email">Email</label>
          <input
            id="update-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <label htmlFor="update-password">Password</label>
          <input
            id="update-password"
            type="passowrd"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <label htmlFor="update-passconfirm">Confirm Password</label>
          <input
            id="update-passconfirm"
            type="text"
            value={passConfirm}
            onChange={(e) => {
              setPassConfirm(e.target.value);
            }}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
