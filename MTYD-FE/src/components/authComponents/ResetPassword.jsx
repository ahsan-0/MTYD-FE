import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link } from "react-router-dom";
import "./Signup.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const { currentUser, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    resetPassword(email)
      .then(() => {
        setLoading(false);
        setMessage("check your inbox for further instructions");
      })
      .catch((err) => {
        setError(err.message);
      });
    setLoading(false);
  }

  return (
    <main className="login-form-container">
      <h1>Reset your password</h1>
      <p>Provide your email to reset your password.</p>
      <form className="reset-form" onSubmit={handleSubmit}>
        {error && <p className="login_error">{error}</p>}
        <p>{message}</p>
        <p>{currentUser && currentUser.email}</p>

        <label htmlFor="emailreset">
          <b>Email</b>
        </label>
        <input
        className="login_input"
          type="text"
          placeholder="Enter email address"
          id="emailreset"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />

        <button className="sub-but" type="submit" disabled={loading}>
          Reset Password
        </button>
      </form>
      <div className="signup-bar">
        <p>Dont have account.. </p>
        <Link to="/signup">Sign Up</Link>
      </div>
    </main>
  );
};

export default ResetPassword;
